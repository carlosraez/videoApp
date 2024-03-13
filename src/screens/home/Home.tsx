import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  Button,
} from 'react-native'
import i18n from '../../i18n/i18n'

import { fetchVideos } from '../../services/VideosApi'
import { VideoItem } from '../../components/VideoItem'
import { styles } from './styles'
import { NasaVideoData } from '../../interfaces/interfaces'
import { typographyStyles } from '../../config/themes/typography'
import { PRIMARY_COLOR } from '../../config/themes/colors'

export const Home = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false)
  const [videos, setVideos] = useState<NasaVideoData[]>([])
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  /**
   * useEffect hook that loads videos when the component mounts.
   */
  useEffect(() => {
    loadVideos()
  }, [page])

  /**
   * Loads videos from the API based on the current query state. Sets loading status and catches errors.
   * @param {string} query - The current search query.
   */
  const loadVideos = async (query: string = '') => {
    if (!hasMore) return

    setLoading(true) // Comienza la carga
    try {
      const results = await fetchVideos(query, page)
      setVideos(results)
    } catch (error) {
      console.error('Error fetching videos:', error)
      setError(i18n.t('errorFetchingVideos'))
    } finally {
      setLoading(false)
    }
  }

  /**
   * Initiates a new search based on the current query.
   * This function resets the video list, restarts pagination, and assumes there are more pages to fetch.
   * It should be called whenever the user submits a new search query.
   */
  const searchVideos = () => {
    setVideos([])
    setPage(1)
    setHasMore(true)
  }

  /**
   * Renders the search input component.
   */
  const getSearch = () => {
    return (
      <TextInput
        style={styles.input}
        placeholder={i18n.t('placeholderInputIntro')}
        placeholderTextColor="#638287"
        onChangeText={text => setQuery(text)}
        value={query}
        onSubmitEditing={searchVideos}
      />
    )
  }

  /**
   * Increase page
   */
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage(prevPage => prevPage + 1)
    }
  }

  /**
   * Return Video Item component
   */
  const getVideoItem = (item: NasaVideoData) => {
    return (
      <VideoItem
        title={item?.data[0]?.title}
        description={item?.data[0]?.description}
        thumbnail={item?.links[0]?.href}
        videoId={item?.data[0]?.nasa_id}
        navigation={navigation}
      />
    )
  }

  /**
   * Renders the list of videos using a FlatList component.
   */
  const getListVideos = () => {
    return (
      <FlatList
        data={videos}
        renderItem={({ item }) => getVideoItem(item)}
        keyExtractor={(item, index) =>
          item?.data[0]?.nasa_id ?? `item-${index}`
        }
      />
    )
  }

  /**
   * Determines and renders the current content based on the loading and error states.
   */
  const renderContent = () => {
    if (loading) return <ActivityIndicator size="large" color={PRIMARY_COLOR} />
    if (error) return <Text>{error}</Text>
    return getListVideos()
  }

  // Main render function of the Home component.
  return (
    <View style={styles.container}>
      <View style={styles.intro}>
        <Text style={typographyStyles.h1}>{i18n.t('titleIntro')}</Text>
        {getSearch()}
      </View>
      {renderContent()}
      {hasMore && !loading && (
        <Button onPress={handleLoadMore} title={i18n.t('video.loadMore')} />
      )}
    </View>
  )
}
