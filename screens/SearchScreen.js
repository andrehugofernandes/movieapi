import {
  View,
  Text,
  Pressable,
  TextInput,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  Image
} from 'react-native'
import React, { useCallback, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { XMarkIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loading from '../components/loading'
import { fecthSearchMovies, image185, fallbackMoviePoster } from '../api/moviedb';
import { debounce } from 'lodash';

var { width, height } = Dimensions.get('window');

export default function SearchScreen() {
  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false)
  //let movieName = "Ant-Man and the Wasp: Quantumania"

  const handleSearch = value => {
    if (value && value.length > 2) {
      setLoading(true);
      fecthSearchMovies({
        query: value,
        include_adult: 'false',
        language: 'en-US',
        page: 1
      }).then(data => {
        setLoading(false);
        //console.log('SEARCH_RESULTS', data);
        if(data && data.results) setResults(data.results);
      })
    } else {
      setLoading(false);
      setResults([]);

    }
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View
        className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full"
      >
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder='Search Movie'
          placeholderTextColor='lightgray'
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
        />
        <Pressable
          onPress={() => navigation.navigate('Home')}
          className="p-3 rounded-full m-1 bg-neutral-500"
        >
          <XMarkIcon size="25" color="white" />
        </Pressable>
      </View>
      {/* Search results */}

      {
        loading ? (
          <Loading />
        ) : (
          results.length > 0 ? (
            <ScrollView
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 15 }}
              className="space-y-3"
            >
              <Text className="text-white font-semibold ml-1">
                Results ({results.length})
              </Text>
              <View className="flex-row justify-between flex-wrap">
                {
                  results.map((item, index) => {
                    return (
                      <TouchableWithoutFeedback
                        key={index}
                        onPress={() => navigation.push('Movie', item)}
                      >
                        <View className="space-y-2 mb-4">
                          <Image
                            className="rounded-3xl"
                            //source={require('../assets/images/ant-man.png')}
                            source={{ uri: image185(item?.poster_path)}}
                            style={{ width: width * 0.44, height: height * 0.3 }}
                          />
                          <Text className="text-neutral-300">
                            {
                              // item?.title.length > 22 ? item?.title.slice(0, 22) + '...' : item?.title
                              (item?.title?.length ?? 0) > 22 ? item?.title?.slice(0, 22) + '...' : item?.title

                            }
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    )
                  })
                }
              </View>
            </ScrollView>
          ) : (
            <View className="flex-row justify-center">
              <Image source={require('../assets/images/search.png')}
                className="h-96 w-96 "
              />
            </View>
          )
        )
      }
    </SafeAreaView>
  )
}