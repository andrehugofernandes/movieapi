import axios from 'axios';
import { apiKey } from '../constants';

//endpoint for trending movies
const apiBaseURL = 'https://api.themoviedb.org/3';
const trendingMoviesEndpoint = `${apiBaseURL}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${apiBaseURL}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${apiBaseURL}/movie/top_rated?api_key=${apiKey}`;

const apiCall = async (endpoint, params) => {
  const options ={
    method: 'GET',
    url: endpoint,
    params: params ? params : {}
  }
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log('error', error);
  }
}

export const fecthTrendingMovies = () => {
  return apiCall(trendingMoviesEndpoint);
}

export const fecthUpcomingMovies = () => {
  return apiCall(upcomingMoviesEndpoint);
}

export const fecthTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndpoint);
}
