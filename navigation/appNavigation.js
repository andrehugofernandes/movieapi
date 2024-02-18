import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreens from '../screens/HomeScreens';
import MovieScreen from '../screens/MovieScreen';
import PersonScreen from '../screens/PersonScreen';
import SearchScreen from '../screens/SearchScreen'; 

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreens} />
        <Stack.Screen options={{headerShown: false}} name="Movie" component={MovieScreen} />
        <Stack.Screen options={{headerShown: false}} name="Person" component={PersonScreen} />
        <Stack.Screen options={{headerShown: false}} name="Search" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}