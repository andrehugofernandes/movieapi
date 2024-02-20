import axios from 'axios';
import { apiKey } from '../constants';

//endpoint for trending movies
const apiBaseURL = 'https://api.themoviedb.org/3';
const trendingMoviesEndpoint = `${apiBaseURL}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${apiBaseURL}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${apiBaseURL}/movie/top_rated?api_key=${apiKey}`;
const searchMoviesEndpoint = `${apiBaseURL}/search/movie?api_key=${apiKey}`;

// dynamic endpoints
const movieDetailsEndpoint = id => `${apiBaseURL}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndpoint = id => `${apiBaseURL}/movie/${id}/credits?api_key=${apiKey}`;
const movieSimilarEndpoint = id => `${apiBaseURL}/movie/${id}/similar?api_key=${apiKey}`;

// Person Details
const personDetailsEndpoint = id => `${apiBaseURL}/person/${id}?api_key=${apiKey}`;
const personMoviesEndpoint =  id => `${apiBaseURL}/person/${id}/movie_credits?api_key=${apiKey}`;


export const image500 = path => path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185${path}` : null;

export const fallbackMoviePoster = 'https://www.movienewz.com/img/films/poster-holder.jpg';
export const fallbackPersonPoster = 'https://www.movienewz.com/img/films/poster-holder.jpg';

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

export const fecthdMovieDetails = id => {
  return apiCall(movieDetailsEndpoint(id));
}

export const fecthdMovieCredits = id => {
  return apiCall(movieCreditsEndpoint(id));
}
export const fecthSimilarMovies = id => {
  return apiCall(movieSimilarEndpoint(id));
}
export const fecthPersonDetails = id => {
  return apiCall(personDetailsEndpoint(id));
}
export const fecthPersonMovies = id => {
  return apiCall(personMoviesEndpoint(id));
}
export const fecthSearchMovies = params => {
  return apiCall(searchMoviesEndpoint, params);
}