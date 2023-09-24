import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovies } from 'fetchAPI';
import toast, { Toaster } from 'react-hot-toast';
import { Loader } from 'components/Loader';
import { defaultImg } from 'components/defaultImg';
import css from '../pages/MovieDetails/MovieDetails.module.css';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovieCastData = async () => {
      try {
        const castData = await fetchMovies(`/movie/${movieId}/credits`);
        setCast(castData.cast);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieCastData();
  }, [movieId]);

  if (cast.length === 0) {
    return <div>Cast information not available</div>;
  }

  return (
    <div className={css.cast}>
      {error &&
        !loading &&
        toast.error('Something went wrong, please try reloading the page', {
          duration: 5000,
        })}
      {loading ? (
        <Loader />
      ) : (
        <ul>
          {cast.map(actor => (
            <li key={actor.id}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : defaultImg
                }
                alt={actor.name}
              />
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
              <hr />
            </li>
          ))}
        </ul>
      )}
      <Toaster position="top-right" />
    </div>
  );
};

export default Cast;
