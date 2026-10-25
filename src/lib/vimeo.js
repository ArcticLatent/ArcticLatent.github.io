import { fetchWithRetry } from "./fetch.js";

/// Each reel with its Vimeo video id and title (`video: null` when Vimeo
/// didn't answer for it): a reel that's missing doesn't shift the others.
export const fetchReels = (reels) =>
  Promise.all(
    reels.map(async (reel) => {
      try {
        const response = await fetchWithRetry(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(reel.url)}`, {}, 5);
        const { video_id: id, title } = await response.json();
        return { ...reel, video: { id, title } };
      } catch (error) {
        console.error("Failed to load Vimeo reel", reel.url, error);
        return { ...reel, video: null };
      }
    })
  );
