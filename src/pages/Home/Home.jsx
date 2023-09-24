import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../../fetchAPI';
import { Loader } from 'components/Loader';
import toast, { Toaster } from 'react-hot-toast';
import MoviesList from '../Movies/MoviesList';
import css from './Home.module.css';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchMovies(`/trending/all/day`);
        setTrendingMovies(response.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={css.title}>
      {error &&
        !loading &&
        toast.error('Something went wrong, please try reloading the page', {
          duration: 5000,
        })}
      <h2>Trending Movies</h2>
      {loading ? <Loader /> : <MoviesList movies={trendingMovies} />}
      <Toaster position="top-right" />
    </div>
  );
};

export default Home;
