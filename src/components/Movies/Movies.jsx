import React, { useState, useEffect, useRef } from 'react';
import { BiSearch } from 'react-icons/bi';
import toast, { Toaster } from 'react-hot-toast';
import { fetchSearchMovies } from 'fetchAPI';
import { Loader } from 'components/Loader';
import css from './Movies.module.css';
import { StyledLinkList } from '../linkStyled';

const Movies = () => {
  const [query, setQuery] = useState(''); // Стан для зберігання пошукового запиту
  const [searchResults, setSearchResults] = useState([]); // Стан для зберігання результатів пошуку
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [buttonClick, setButtonClick] = useState(0);
  const [isRequestCancelled, setIsRequestCancelled] = useState(false);
  const controller = useRef();

  const handleInputFocus = evt => {
    evt.target.value = '';
  };

  const handleInputChange = event => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    if (query !== '') {
      const fetchMovies = async () => {
        setIsRequestCancelled(false);

        if (controller.current) {
          controller.current.abort();
        }

        controller.current = new AbortController();

        try {
          setLoading(true);
          setError(false);
          const movies = await fetchSearchMovies(
            `/search/movie`,
            query,
            controller
          );
          if (isRequestCancelled) {
            return;
          }
          setSearchResults(movies.results);
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
      setSearchResults([]);
    }
  }, [query, buttonClick]);

  const handleSearchSubmit = evt => {
    evt.preventDefault();
    const queryValue = evt.target.elements.query.value.trim();
    if (queryValue !== '') {
      setQuery(queryValue);
      setSearchResults([]);
      setButtonClick(prevButtonClick => prevButtonClick + 1);
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
      <form onSubmit={handleSearchSubmit} className={css.search_form}>
        <input
          className={css.search_input}
          type="text"
          placeholder="Enter a movie title"
          name="query"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <button type="submit" className="search_button">
          <BiSearch size={25} />
        </button>
      </form>
      {loading ? (
        <Loader />
      ) : (
        <ul>
          {searchResults.map(movie => (
            <li key={movie.id}>
              {' '}
              <StyledLinkList to={`/movies/${movie.id}`}>
                {movie.title || movie.name}
              </StyledLinkList>
            </li>
          ))}
        </ul>
      )}
      <Toaster position="top-right" />
    </div>
  );
};

export default Movies;
