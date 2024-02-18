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

var { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const topMargin = ios ? "" : "mt-3";

export default function MovieScreen() {
  let movieName = "Capitan Marvel"
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false);
  const [cast, setCast] = useState([1, 2, 3, 4, 5]);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Fetch movie details API
  }, [item])
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
                  source={require('../assets/images/capitain-marvel.png')}
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
            {movieName} {/*item?.title*/}
          </Text>
          {/* Status, Release, Runtime */}
          <Text
            className="text-neutral-400 font-semibold text-base text-center"
          >
            Released • 2020 • 170 min
            {/*{item?.status} • {item?.release_date} • {item?.runtime} min*/}
          </Text>
          {/* Genres */}
          <View className=" flex-row justify-center space-x-2">
            <Text className="text-neutral-400 text-sm">Action</Text>
            <Text className="text-neutral-400 text-sm">•</Text>
            <Text className="text-neutral-400 text-sm">Adventure</Text>
            <Text className="text-neutral-400 text-sm">•</Text>
            <Text className="text-neutral-400 text-sm">Fantasy</Text>
          </View>
        </View>
        {/* Movie description */}
        <Text className="text-neutral-400 mx-6 my-4 tracking-wide text-justify">
          Captain Marvel” is a 2019 American superhero film based on the Marvel
          Comics character Carol Danvers, also known as Captain Marvel. The film
          is set in the 1990s and follows the journey of Carol Danvers as she
          becomes one of the universe’s most powerful heroes1. The film is part of
          the Marvel Cinematic Universe (MCU) and was directed by Anna Boden and
          Ryan Fleck. The screenplay was co-written by Anna Boden, Ryan Fleck,
          and Geneva Robertson-Dworet1. The story unfolds as Earth is caught in
          the center of a galactic conflict between two alien civilizations.
          After crashing an experimental aircraft, Air Force pilot Carol Danvers
          is discovered by the Kree and trained as a member of the elite Starforce
          Military under the command of her mentor Yon-Rogg2.
          {/*{item?.overview}*/}
        </Text>
        {/* Movie cast */}
        <Cast navigation={navigation} cast={cast} />

        {/* Similar movies */}
        <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />

      </View>
    </ScrollView>
  )
}