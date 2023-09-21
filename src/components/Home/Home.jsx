import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../../fetchAPI';
import { Loader } from 'components/Loader';
import { StyledLinkList } from '../linkStyled';

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
    <div>
      {loading && <Loader />}
      {error &&
        !loading &&
        error('Something went wrong, please try reloading the page', {
          duration: 5000,
        })}
      <h1>Trending Movies</h1>
      <ul>
        {trendingMovies
          .filter(movie => movie.title !== '' || movie.name !== '')
          .map(movie => (
            <li key={movie.id}>
              <StyledLinkList to={`/movies/${movie.id}`}>
                {movie.title || movie.name}
              </StyledLinkList>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Home;
