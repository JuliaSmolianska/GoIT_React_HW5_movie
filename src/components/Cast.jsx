import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovies } from 'fetchAPI';
import { Loader } from 'components/Loader';
import css from '../pages/MovieDetails/MovieDetails.module.css';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieCastData = async () => {
      try {
        const castData = await fetchMovies(`/movie/${movieId}/credits`);
        setCast(castData.cast);
      } catch (error) {
        console.error('Error fetching movie cast:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieCastData();
  }, [movieId]);

  if (loading) {
    return <Loader />;
  }

  if (cast.length === 0) {
    return <div>Cast information not available</div>;
  }

  return (
    <div className={css.cast}>
      <ul>
        {cast.map(actor => (
          <li key={actor.id}>
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
            />
            <p>{actor.name}</p>
            <p>Character: {actor.character}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cast;
