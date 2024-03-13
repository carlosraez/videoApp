import { AssetItem, NasaVideoData } from '../interfaces/interfaces'

const BASE_URL = 'https://images-api.nasa.gov/search?media_type=video'
const ASSET_BASE_URL = 'https://images-api.nasa.gov/';

/**
 * Fetches a list of videos from the NASA API based on the search query and page number.
 * 
 * @param {string} query The search query.
 * @param {number} [page=1] The page number for pagination. Defaults to 1.
 * @returns {Promise<NasaVideoData[]>} A promise that resolves with an array of video data from NASA.
 * @throws {Error} Throws an error if there is an issue fetching the videos.
 */
export const fetchVideos = async (query: string, page: number = 1): Promise<NasaVideoData[]> => {
  try {
    const url = `${BASE_URL}&q=${encodeURIComponent(query)}&page=${page}`;
    const response = await fetch(url);
    const json = await response.json()
    
    const videos: NasaVideoData[] = json.collection.items
    return videos
  } catch (error) {
    console.error(error)
    throw new Error('Error fetching videos')
  }
}

/**
 * Fetches detailed information for a specific video by its ID from the NASA API.
 * 
 * @param {string} videoId The unique identifier for the video.
 * @returns {Promise<{videoUrl: string}>} A promise that resolves with the video's URL.
 * @throws {Error} Throws an error if there is an issue fetching the video details.
 */
export const fetchVideoDetails = async (videoId: string) => {
  try {
    const detailsUrl = `${ASSET_BASE_URL}/asset/${videoId}`;
    
    const response = await fetch(detailsUrl);
    const json = await response.json();
    
    const videoUrl = json.collection.items.find((item:AssetItem ) => item.href.endsWith('.mp4'))?.href;

    return {
      videoUrl,
    };
  } catch (error) {
    console.error('Error fetching video details:', error);
    throw new Error('Error fetching video details');
  }
};
