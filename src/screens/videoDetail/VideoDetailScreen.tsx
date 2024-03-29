import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { ResizeMode, Video } from 'expo-av'

import { fetchVideoDetails } from '../../services/VideosApi'
import i18n from '../../i18n/i18n'
import { RouteProp } from '@react-navigation/native'
import { VideoDetailRouteParams } from '../../interfaces/interfaces'
import { styles } from './styles'
import { PRIMARY_COLOR } from '../../config/themes/colors'

export const VideoDetailsScreen = ({
  route,
}: {
  route: RouteProp<{ params: VideoDetailRouteParams }, 'params'>
}) => {
  const [loading, setLoading] = useState(false)
  const [videoUri, setVideoUri] = useState('')
  const [videoLoading, setVideoLoading] = useState(true)
  const [error, setError] = useState('')

  const { videoId } = route.params

  /**
   * useEffect hook that loads videos when the component mounts.
   */
  useEffect(() => {
    loadVideo()
  }, [])

  /**
   * Loads videos from the API based on the current query state. Sets loading status and catches errors.
   */
  const loadVideo = async () => {
    setLoading(true)
    try {
      const results = await fetchVideoDetails(videoId)
      const { videoUrl } = results

      if (videoUrl) {
        setVideoUri(videoUrl)
      }
    } catch (error) {
      console.error('Error fetching videos:', error)
      setError(i18n.t('errorFetchingVideos'))
    } finally {
      setLoading(false)
    }
  }

  const getVideoLoading = () => {
    return (
      videoLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    )
  }

  /**
   * Returns a video component with loading indicator.
   * Displays an ActivityIndicator while video is loading.
   */
  const getVideo = () => {
    return (
      <View style={styles.container}>
        {getVideoLoading()}
        <Video
          source={{ uri: videoUri }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode={'cover' as ResizeMode}
          isLooping
          shouldPlay
          useNativeControls
          onLoadStart={() => setVideoLoading(true)}
          onLoad={() => setVideoLoading(false)}
          style={videoLoading ? styles.loadingContainer : styles.video}
        />
      </View>
    )
  }

  /**
   * Determines and renders the current content based on the loading and error states.
   */
  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={PRIMARY_COLOR} />
        </View>
      )
    }
    if (error) {
      return <Text>{error}</Text>
    }
    return getVideo()
  }

  return <View style={styles.container}>{renderContent()}</View>
}
