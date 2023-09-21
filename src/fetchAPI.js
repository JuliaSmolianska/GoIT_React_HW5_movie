import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const API_KEY = '89edb74d1265dc897c6847b5fd279c44';

export async function fetchMovies(endpoint) {
  const params = new URLSearchParams({
    api_key: API_KEY,
  });

  const response = await axios.get(endpoint, {
    params,
  });
  return response.data;
}

export async function fetchSearchMovies(endpoint, query, controller) {
  const params = new URLSearchParams({
    query: query,
    api_key: API_KEY,
  });

  const response = await axios.get(
    endpoint,
    {
      params,
    },
    {
      signal: controller.current.signal,
    }
  );
  return response.data;
}
