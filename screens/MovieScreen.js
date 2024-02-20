import { View, Text, ScrollView, Pressable, Dimensions, Platform, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { useState } from 'react';
import { theme } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/cast';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { fecthdMovieDetails, fecthdMovieCredits, fecthSimilarMovies } from '../api/moviedb';
import { image500 } from '../api/moviedb';

var { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const topMargin = ios ? "" : "mt-3";

export default function MovieScreen() {
  let movieName = "Capitan Marvel"
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false)
  const [movie, setMovie] = useState({});

  // Fetch movie details API
  useEffect(() => {
    //console.log('ITEM_ID', item.id);
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async id => {
    const data = await fecthdMovieDetails(id);
    if (data) setMovie(data);
    setLoading(false);
  }

  const getMovieCredits = async id => {
    const data = await fecthdMovieCredits(id);
    if (data && data.cast) setCast(data.cast);
   
  }

  const getSimilarMovies = async id => {
    const data = await fecthSimilarMovies(id);
    //console.log('SIMILAR_MOVIES', data);
    if (data && data.results) setSimilarMovies(data.results);
   
  }


  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {/* back button and movie poster */}
      <View className="w-full">
        <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-3" + topMargin}>
          <Pressable onPress={() => navigation.goBack()} className="bg-[#ffc719] rounded-xl p-1">
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
          </Pressable>
          <Pressable onPress={() => toggleFavourite(!isFavourite)}>
            <HeartIcon size="35" color={isFavourite ? "red" : "white"} />
          </Pressable>
        </SafeAreaView>

        {/* Loading */}
        {
          loading ? (
            <Loading />
          ) :
            (
              <View>
                <Image
                  //source={require('../assets/images/capitain-marvel.png')}
                  source={{ uri: image500(movie?.poster_path) }}
                  style={{ width, height: height * 0.55 }}
                />
                <LinearGradient
                  colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23, 1)']}
                  style={{ width, height: height * 0.40 }}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  className="absolute bottom-0"
                />
              </View>
            )
        }
        {/* Movie details */}
        <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
          {/* Movie title */}
          <Text className="text-[#ffc719] shadow-xl text-center text-3xl font-bold tracking-wider">
            {movie?.title}
          </Text>
          {/* Status, Release, Runtime */}
          {
            movie?.id ? (
              <Text className="text-neutral-400 font-semibold text-base text-center">
                {movie?.status} • {movie?.release_date?.split('-')[0]} • {movie?.runtime} min
              </Text>

            ) : null
          }
          {/* Genres */}
          <View className=" flex-row justify-center space-x-2">
            {
              movie?.genres?.map((genre, index) => {
                let showDot = index + 1 != movie.genres.length;
                return (
                  <Text key={index} className="text-neutral-400 text-sm">
                    {genre?.name} {showDot ? "•" : null}
                  </Text>
                )
              }
              )
            }
          </View>
        </View>
        {/* Movie description */}
        <Text className="text-neutral-400 mx-6 my-4 tracking-wide text-justify">          
          {movie?.overview}
        </Text>
        {/* Movie cast */}
        {cast.length > 0 && <Cast navigation={navigation} cast={cast} />}

        {/* Similar movies */}
        {similarMovies.length > 0 && <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />}

      </View>
    </ScrollView>
  )
}