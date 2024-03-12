import { NasaVideoData } from '../interfaces/interfaces'

const BASE_URL = 'https://images-api.nasa.gov/search?media_type=video'

export const fetchVideos = async (query: string, page: number = 1): Promise<NasaVideoData[]> => {
  try {
    const url = `${BASE_URL}&q=${encodeURIComponent(query)}&page=${page}`;
    const response = await fetch(url);
    const json = await response.json()

    console.log(json.collection);
    
    const videos: NasaVideoData[] = json.collection.items
    return videos
  } catch (error) {
    console.error(error)
    throw new Error('Error fetching videos')
  }
}

export const fetchVideoDetails = async (videoId: string) => {
  try {
    const detailsUrl = `${BASE_URL}/asset/${videoId}`;
    const response = await fetch(detailsUrl);
    const json = await response.json();
    
    const videoUrl = json.collection.items.find((item) => item.href.endsWith('.mp4'))?.href;

    return {
      videoUrl,
    };
  } catch (error) {
    console.error('Error fetching video details:', error);
    throw new Error('Error fetching video details');
  }
};
