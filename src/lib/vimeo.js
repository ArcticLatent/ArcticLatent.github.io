import { fetchWithRetry } from "./fetch.js";

/// Each reel with its Vimeo video id, title, year and a still (`video: null`
/// when Vimeo didn't answer for it): a reel that's missing doesn't shift the
/// others.
export const fetchReels = (reels) =>
  Promise.all(
    reels.map(async (reel) => {
      try {
        const response = await fetchWithRetry(
          `https://vimeo.com/api/oembed.json?width=1280&url=${encodeURIComponent(reel.url)}`,
          {},
          5
        );
        const { video_id: id, title, upload_date: uploaded, thumbnail_url: still, duration } = await response.json();
        const length = duration ? `${Math.floor(duration / 60)}:${String(duration % 60).padStart(2, "0")}` : "";
        return { ...reel, video: { id, title, length, year: uploaded ? uploaded.slice(0, 4) : "", still: still ?? "" } };
      } catch (error) {
        console.error("Failed to load Vimeo reel", reel.url, error);
        return { ...reel, video: null };
      }
    })
  );
