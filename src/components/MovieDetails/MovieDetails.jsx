import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovies } from 'fetchAPI';
import { Loader } from 'components/Loader';
import { Link, Outlet } from 'react-router-dom';
import css from './MovieDetails.module.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData = await fetchMovies(`/movie/${movieId}`);
        setMovie(movieData);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (loading) {
    return <Loader />;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div>
      {error &&
        !loading &&
        error('Something went wrong, please try reloading the page', {
          duration: 5000,
        })}
      <div className={css.details}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.original_title}
          width={250}
        />
        <div>
          <h2>
            {movie.title} ({movie.release_date.slice(0, 4)})
          </h2>
          <p>User score: {(movie.vote_average * 10).toFixed(0)}% </p>
          <b>Overview</b>
          <p>{movie.overview}</p>
          <b> Genres</b>
          <p>
            {movie.genres.map(({ id, name }) => (
              <span key={id}>{name} </span>
            ))}
          </p>
        </div>
      </div>
      <h3>Additional information:</h3>
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default MovieDetails;
