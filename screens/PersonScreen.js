import { View, Image, Text, Dimensions, Platform, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'
import MovieList from '../components/movieList';
import Loading from '../components/loading';

var { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const verticalMargin = ios ? "" : "my-3";

export default function PersonScreen() {
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false);
  const [personMovies, setPersonMovies] = useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(false)

  return (
    <ScrollView className="flex-1 bg-neutral-900" contentContainerStyle={{ paddingBottom: 20 }}>
      {/* back button */}
      <SafeAreaView className={"z-20 w-full flex-row justify-between items-center px-3" + verticalMargin}>
        <Pressable onPress={() => navigation.goBack()} className="bg-[#ffc719] rounded-xl p-1">
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
        </Pressable>
        <Pressable onPress={() => toggleFavourite(!isFavourite)}>
          <HeartIcon size="35" color={isFavourite ? "red" : "white"} />
        </Pressable>
      </SafeAreaView>
      {/* Person details */}
      {/* Loading */}
      {
        loading ? (
          <Loading />
        ) : (
          <View>
            <View className="flex-row justify-center"
              style={{
                shadowColor: "grey",
                shadowRadius: 40,
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.9
              }}
            >
              <View className="rounded-full items-center overflow-hidden h-72 w-72
            border-[6px] border-neutral-400">
                <Image
                  source={require('../assets/images/brie-larson.png')}
                  style={{ height: height * 0.43, width: width * 0.74 }}
                />
              </View>
            </View>
            <View className="mt-6">
              <Text className="text-white text-3xl font-bold text-center">
                Brie Larson
                {/* {item?.name} */}
              </Text>
              <Text className="text-neutral-500 text-base text-center">
                Sacramento, CA | United States
                {/* {item?.name} */}
              </Text>
            </View>
            <View className="mx-3 mt-6 flex-row justify-evenly items-center
         bg-neutral-700 rounded-full p-4">
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-bold">Gender</Text>
                <Text className="text-neutral-300 text-sm">Male</Text>
              </View>
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-bold">Birthday</Text>
                <Text className="text-neutral-300 text-sm">1989-10-01</Text>
              </View>
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-bold">Know for</Text>
                <Text className="text-neutral-300 text-sm">Acting</Text>
              </View>
              <View className="px-2 items-center">
                <Text className="text-white font-bold">Popularity</Text>
                <Text className="text-neutral-300 text-sm">85.54</Text>
              </View>
            </View>
            <View className="my-6 mx-4 space-y-2">
              <Text className="text-white text-lg">Biography</Text>
              <Text className="text-neutral-400 tracking-wide text-justify">
                Brie Larson has built an impressive career as an acclaimed television actress, rising feature film star and emerging recording artist. A native of Sacramento, Brie started studying drama at the early age of 6, as the youngest student ever to attend the American Conservatory Theater in San Francisco. She starred in one of Disney Channel's most watched original movies, Right on Track (2003), as well as the WB's TV series Raising Dad (2001) and MGM's teen comedy Sleepover (2004) - all before graduating from middle school.
              </Text>
            </View>
            {/* Movie list */}
            <MovieList title="Movies" hideSeeAll={true} data={personMovies} />
          </View>
        )
      }

    </ScrollView>
  )
}