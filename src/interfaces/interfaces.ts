export interface NasaVideoItem {
    album: string[];
    center: string;
    date_created: string;
    description: string;
    keywords: string[];
    media_type: string;
    nasa_id: string;
    title: string;
  }
  
  export interface NasaVideoLink {
    href: string;
    rel: string;
    render: string;
  }
  
  export interface NasaVideoData {
    data: NasaVideoItem[];
    href: string;
    links: NasaVideoLink[];
  }
  
  export  interface RootStackParamList {
    Home: undefined;
    VideoDetailScreen: { videoId: string }; 
  };