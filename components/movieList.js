import {
  View,
  Text,
  Pressable,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  Dimensions
}
  from 'react-native'
import React from 'react';
import { useNavigation } from '@react-navigation/native'


var { width, height } = Dimensions.get('window')

export default function MovieList({ title, data, hideSeeAll }) {
  let movieName = "Ant-Man and the Wasp: Quantumania"
  const navigation = useNavigation();
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>
        {
          !hideSeeAll && (
        <Pressable>
          <Text className="text-lg text-[#ffc719]">See All</Text>
        </Pressable>
          )
        }
      </View>
      {/* Movie Row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 15 }}
      >
        {
          data.map((item, index) => {
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.push('Movie', item)}
              >
                <View className="space-y-1 mr-4">
                  <Image
                    source={require('../assets/images/ant-man.png')}
                    className="rounded-3xl"
                    style={{ width: width * 0.33, height: height * 0.22 }}
                  />
                  <Text className="text-neutral-300 ml-1">
                    {
                      movieName.length > 14 ? movieName.slice(0, 14) + '...' : movieName
                    }
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )
          })
        }

      </ScrollView>
    </View>
  )
}