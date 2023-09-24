import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { fetchSearchMovies } from 'fetchAPI';
import { Loader } from 'components/Loader';
import MoviesList from './MoviesList';
import SearchBox from 'components/SearchBox/SearchBox';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const controller = useRef();
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (query !== '') {
      if (controller.current) {
        controller.current.abort();
      }
      controller.current = new AbortController();

      const fetchMovies = async () => {
        try {
          setLoading(true);
          setError(false);
          const movies = await fetchSearchMovies(
            `/search/movie`,
            query,
            controller
          );
          setMovies(movies.results);
          if (!movies.results.length) {
            toast.error(
              'not found any movies of your search, please change your request and try again',
              { duration: 5000 }
            );
            return;
          }
        } catch (error) {
          if (error.code !== 'ERR_CANCELED') {
            setError(true);
          }
        } finally {
          setLoading(false);
        }
      };
      fetchMovies();
    } else {
      setMovies([]);
    }
  }, [query, searchParams]);

  const handleSearchSubmit = value => {
    const movieSearch = value.trim();
    if (movieSearch !== '') {
      setSearchParams({ query: value });
    } else {
      toast('Please enter your query', {
        duration: 2000,
        position: 'top-center',
      });
    }
  };

  return (
    <div>
      {error &&
        !loading &&
        toast.error('Something went wrong, please try reloading the page', {
          duration: 5000,
        })}
      <SearchBox onSubmit={handleSearchSubmit} />
      {loading ? <Loader /> : <MoviesList movies={movies} />}
      <Toaster position="top-right" />
    </div>
  );
};

export default Movies;
