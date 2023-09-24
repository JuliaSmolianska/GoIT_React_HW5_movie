import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { StyledLink } from '../../components/linkStyled';
import css from './MovieDetails.module.css';
import { defaultImg } from 'components/defaultImg';
import 'bootstrap/dist/css/bootstrap.min.css';

const MovieDetailsData = ({ movie }) => {
  return (
    <div>
      <div className={css.details}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : defaultImg
          }
          alt={movie.original_title}
          width={250}
        />
        <div>
          <h2>
            {movie.title} ({movie.release_date.slice(0, 4)})
          </h2>
          <p>User score: {(movie.vote_average * 10).toFixed(0)}% </p>
          <b>Overview:</b>
          <p>{movie.overview}</p>
          <b>Genres:</b>
          <p>
            {movie.genres.map(({ id, name }) => (
              <span key={id}>{name} </span>
            ))}
          </p>
        </div>
      </div>
      <h4 className="ps-3 mt-3 fw-bold">Additional information:</h4>
      <div>
        <StyledLink to="cast">Cast</StyledLink>
      </div>
      <div>
        <StyledLink to="reviews">Reviews</StyledLink>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsData;
