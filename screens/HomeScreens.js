import { View, Text, Platform, Pressable, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from "expo-status-bar"
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { styles } from '../theme'
import TrendingMovies from '../components/trendingMovies'
import { useState, useEffect } from 'react'
import MovieList from '../components/movieList'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/loading'
import {
  fecthTrendingMovies,
  fecthUpcomingMovies,
  fecthTopRatedMovies
} from '../api/moviedb'

const ios = Platform.OS == 'ios'

export default function HomeScreens() {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation();

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, [])

  const getTrendingMovies = async () => {
    const data = await fecthTrendingMovies();
    //console.log('got trending movies', data);
    if (data && data.results) setTrending(data.results);
    setLoading(false);
  }

  const getUpcomingMovies = async () => {
    const data = await fecthUpcomingMovies();
    //console.log('got upcoming movies', data);
    if (data && data.results) setUpcoming(data.results);

  }
  const getTopRatedMovies = async () => {
    const data = await fecthTopRatedMovies();
   // console.log('GOT_TOP_RATED_MOVIES', data);
    if (data && data.results) setTopRated(data.results);
    

  }

  return (
    <View className="flex-1 bg-neutral-800">
      {/* Search bar and logo */}
      <SafeAreaView className={ios ? "-mb-2 bg-neutral-700 z-20" : "mb-3 pb-6 mt-4 bg-neutral-700 z-20"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <Pressable>
            <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
          </Pressable>
          <Text
            className="text-white text-3xl font-bold">
            <Text style={styles.text}>M</Text>ovie<Text style={styles.text}>API</Text>
          </Text>
          <Pressable onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </Pressable>
        </View>
      </SafeAreaView>

      {/* Loading */}
      {
        loading ? (
          <Loading />
        ) : (

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10 }}
          >
            {/* Movie list */}
            {trending.length > 0 && <TrendingMovies data={trending} />}

            {/* Upcoming Movie Row */}
            {upcoming.length > 0 && <MovieList title="Upcoming" data={upcoming} />}

            {/* Top rated Movie Row */}
            { topRated.length > 0 && <MovieList title="Top Rated" data={topRated} /> }
          </ScrollView>
        )
      }
    </View>
  )
}