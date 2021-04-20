import axios from 'axios';

const KEY = 'bc27de64f52151f1e6b6e734a9f73b60';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const params = {
  api_key: KEY,
};

const fetchPopularMovies = () =>
  axios
    .get('trending/movie/day', {
      params,
    })
    .then(({ data: { results } }) => results);

const fetchOneMovies = id =>
  axios
    .get(`movie/${id}`, {
      params,
    })
    .then(({ data }) => data);

const fetchMovieActors = id =>
  axios
    .get(`movie/${id}/credits`, {
      params,
    })
    .then(({ data }) => data);

const fetchMovieReviews = id =>
  axios
    .get(`movie/${id}/reviews`, {
      params,
    })
    .then(({ data }) => data);

const fetchMovieByQuery = query =>
  axios
    .get(`search/movie?query=${query}`, {
      params,
    })
    .then(({ data }) => data);

export {
  fetchPopularMovies,
  fetchOneMovies,
  fetchMovieActors,
  fetchMovieReviews,
  fetchMovieByQuery,
};
