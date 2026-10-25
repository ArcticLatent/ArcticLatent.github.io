import { decodeXml, fetchWithRetry } from "./fetch.js";

const channelId = "UCVI8LZ3goTC4QSy_t2qLVwQ";
export const channelUrl = "https://www.youtube.com/@ArcticLatent";

const getTagValue = (source, tagName) => {
  const escapedTag = tagName.replace(":", "\\:");
  const match = source.match(new RegExp(`<${escapedTag}[^>]*>([\\s\\S]*?)</${escapedTag}>`));
  return match ? decodeXml(match[1].trim()) : "";
};

const getAlternateLink = (source) => {
  const match = source.match(/<link[^>]*rel="alternate"[^>]*href="([^"]+)"/);
  return match ? decodeXml(match[1]) : "";
};

const formatPublishedDate = (value) =>
  new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));

const thumbnail = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

/// The channel's latest videos: from its feed, or its page when the feed is down.
export const fetchLatestVideos = async (count = 4) => {
  try {
    const xml = await (await fetchWithRetry(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`)).text();
    return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].slice(0, count).map(([, entry]) => {
      const id = getTagValue(entry, "yt:videoId");
      return {
        id,
        title: getTagValue(entry, "title"),
        href: getAlternateLink(entry) || `https://www.youtube.com/watch?v=${id}`,
        publishedAt: formatPublishedDate(getTagValue(entry, "published")),
        thumbnail: thumbnail(id)
      };
    });
  } catch (error) {
    console.error("Arctic Latent's video feed failed; trying the channel page", error);
    return fetchChannelVideos(count);
  }
};

// The same latest videos from the channel's own page (its embedded data).
// It gives dates as "8mo ago", not exact ones.
const fetchChannelVideos = async (count) => {
  try {
    const response = await fetchWithRetry(
      `${channelUrl}/videos`,
      { headers: { "User-Agent": "Mozilla/5.0", "Accept-Language": "en" } },
      3
    );
    const html = await response.text();
    const data = JSON.parse(html.match(/var ytInitialData = (\{.*?\});<\/script>/s)[1]);
    const lockups = [];
    const walk = (node) => {
      if (Array.isArray(node)) {
        node.forEach(walk);
      } else if (node && typeof node === "object") {
        if (node.lockupViewModel?.contentType === "LOCKUP_CONTENT_TYPE_VIDEO") {
          lockups.push(node.lockupViewModel);
        }
        Object.values(node).forEach(walk);
      }
    };
    walk(data);
    return lockups.slice(0, count).map((video) => {
      const meta = video.metadata.lockupMetadataViewModel;
      const parts = meta.metadata?.contentMetadataViewModel?.metadataRows?.[0]?.metadataParts ?? [];
      const age = parts.map((part) => part.text?.content ?? "").find((text) => text.endsWith("ago")) ?? "";
      return {
        id: video.contentId,
        title: meta.title.content,
        href: `https://www.youtube.com/watch?v=${video.contentId}`,
        publishedAt: age.replace(/(\d+)mo\b/, "$1 months").replace(/(\d+)y\b/, "$1 years"),
        thumbnail: thumbnail(video.contentId)
      };
    });
  } catch (error) {
    console.error("Failed to load Arctic Latent videos", error);
    return [];
  }
};
