import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native'
import i18n from '../../i18n/i18n'

import { fetchVideos } from '../../services/VideosApi'
import { VideoItem } from '../../components/VideoItem'
import { styles } from './sytles'
import { NasaVideoData } from '../../interfaces/interfaces'

export const Home = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false)
  const [videos, setVideos] = useState<NasaVideoData[]>([])
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')

  /**
   * useEffect hook that loads videos when the component mounts.
   */
  useEffect(() => {
    loadVideos()
  }, [])

  /**
   * Loads videos from the API based on the current query state. Sets loading status and catches errors.
   * @param {string} query - The current search query.
   */
  const loadVideos = async (query: string = '') => {
    setLoading(true) // Comienza la carga
    try {
      const results = await fetchVideos(query)
      setVideos(results)
    } catch (error) {
      console.error('Error fetching videos:', error)
      setError(i18n.t('errorFetchingVideos'));
    } finally {
      setLoading(false)
    }
  }

  /**
   * Triggers a video search based on the current query.
   */
  const searchVideos = () => {
    loadVideos()
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
   * Renders the list of videos using a FlatList component.
   */
  const getListVideos = () => {
    return (
      <FlatList
        data={videos}
        renderItem={({ item, index }) => (
          <VideoItem
            title={item?.data[0]?.title}
            description={item?.data[0]?.description}
            thumbnail={item?.links[0]?.href}
          />
        )}
        keyExtractor={(item, index) => item?.data[0]?.nasa_id ?? `item-${index}`}
      />
    )
  }


  /**
   * Determines and renders the current content based on the loading and error states.
   */
  const renderContent = () => {
    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
    if (error) return <Text>{error}</Text>;  
    return getListVideos(); 
  };

  // Main render function of the Home component.
  return (
    <View style={styles.container}>
      <View style={styles.intro}>
        <Text style={styles.title}>{i18n.t('titleIntro')}</Text>
        {getSearch()}
      </View>
      {renderContent()}
    </View>
  )
}
