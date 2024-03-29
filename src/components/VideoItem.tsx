import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

import { VideoItemProps } from './interfaces/VideoTypes'
import { styles } from './styles'
import { defaultThumbnail } from '../constants/constants'
import i18n from '../i18n/i18n'
import { typographyStyles } from '../config/themes/typography'

/**
 * VideoItem component displays video information including a thumbnail,
 * a title, and a description.
 *
 * Props:
 * - title: String representing the video title.
 * - description: String providing the video description.
 * - thumbnail: String URL to the video's thumbnail image.
 */
export const VideoItem: React.FC<VideoItemProps> = React.memo(
  ({ title, description, thumbnail, videoId, navigation }) => {
    const [imageUri, setImageUri] = useState(thumbnail)

    const handlePress = () => {
      navigation.navigate('VideoDetailScreen', { videoId });
    }

    const getImage = () => {
      return (
        <Image
          accessible
          accessibilityLabel={`${i18n.t('videoItem.thumbnailAltText')} ${title}`}
          source={{ uri: imageUri }}
          style={styles.thumbnail}
          resizeMode="cover"
          onError={() => setImageUri(defaultThumbnail)}
        />
      )
    }

    const getTitle = () => (
      <Text
        accessible
        accessibilityLabel={`${i18n.t('videoItem.titleUnavailable')}: ${title}`}
        style={typographyStyles.h3}
      >
        {title || i18n.t('videoItem.titleUnavailable')}
      </Text>
    )
    const getDescription = () => (
      <Text
        style={typographyStyles.p}
        accessible
        accessibilityLabel={`${i18n.t('videoItem.descriptionUnavailable')}: ${description}`}
      >
        {description || i18n.t('videoItem.descriptionUnavailable')}
      </Text>
    )

    return (
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.container}>
          {getImage()}
          <View style={styles.descriptionContainer}>
            {getTitle()}
            {getDescription()}
          </View>
        </View>
      </TouchableOpacity>
    )
  }
)
