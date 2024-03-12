import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../interfaces/interfaces';

// components/interfaces/VideoTypes.ts
export interface VideoItemProps {
    title: string;
    description: string;
    thumbnail: string;
    videoId: string; 
    navigation: NavigationProp<RootStackParamList, 'Details'>;
  }
  
  export interface VideoPlayerProps {
    sourceUri: string;
  }
  