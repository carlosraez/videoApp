import { NasaVideoData } from '../interfaces/interfaces'

const BASE_URL = 'https://images-api.nasa.gov/search?media_type=video'

export const fetchVideos = async (query: string): Promise<NasaVideoData[]> => {
  try {
    const response = await fetch(`${BASE_URL}&q=${query}`)
    const json = await response.json()

    const videos: NasaVideoData[] = json.collection.items
    return videos
  } catch (error) {
    console.error(error)
    throw new Error('Error fetching videos')
  }
}
