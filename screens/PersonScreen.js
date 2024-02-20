import { View, Image, Text, Dimensions, Platform, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { fallbackMoviePoster, fecthPersonDetails, fecthPersonMovies, fallbackPersonPoster } from '../api/moviedb';
import { image342 } from '../api/moviedb';

var { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const verticalMargin = ios ? "" : "my-3";

export default function PersonScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false);
  const [personMovies, setPersonMovies] = useState([]);
  const [person, setPerson] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true);
    // console.log('PERSON', item);
    getPersonDetails(item.id);
    getPersonMovies(item.id);
  }, [item]);

  const getPersonDetails = async id => {
    const data = await fecthPersonDetails(id);
    //console.log('PERSON_DETAILS', data);
    if (data) setPerson(data);
    setLoading(false);
  }

  const getPersonMovies = async id => {
    const data = await fecthPersonMovies(id);
    // console.log('PERSON_MOVIES', data);
    if (data && data.cast) setPersonMovies(data.cast);
    setLoading(false);
  }

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
                  //source={require('../assets/images/brie-larson.png')}
                  source={{ uri: image342(person?.profile_path) || fallbackPersonPoster }}
                  style={{ height: height * 0.43, width: width * 0.74 }}
                />
              </View>
            </View>
            <View className="mt-6">
              <Text className="text-white text-3xl font-bold text-center">
                 {person?.name} 
              </Text>
              <Text className="text-neutral-500 text-base text-center">
                {person?.place_of_birth} 
              </Text>
            </View>
            <View className="mx-3 mt-6 flex-row justify-evenly items-center
         bg-neutral-700 rounded-full p-4">
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-bold">Gender</Text>
                <Text className="text-neutral-300 text-sm">
                  {
                    person?.gender==1 ? "Female" : "Male"
                  }
                </Text>
              </View>
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-bold">Birthday</Text>
                <Text className="text-neutral-300 text-sm">{person?.birthday}</Text>
              </View>
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-bold">Know for</Text>
                <Text className="text-neutral-300 text-sm">{person?.known_for_department}</Text>
              </View>
              <View className="px-2 items-center">
                <Text className="text-white font-bold">Popularity</Text>
                <Text className="text-neutral-300 text-sm">{person?.popularity?.toFixed(2)} %</Text>
              </View>
            </View>
            <View className="my-6 mx-4 space-y-2">
              <Text className="text-white text-lg">Biography</Text>
              <Text className="text-neutral-400 tracking-wide text-justify">
                  {person?.biography || "No biography available"}
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