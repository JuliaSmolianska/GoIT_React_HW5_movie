import React, { useState, useEffect, useRef } from 'react';
import { fetchMovies } from 'fetchAPI';
import { Loader } from 'components/Loader';
import { Link, useParams, useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieDetailsData from './MovieDetailsData';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const location = useLocation();
  const backLink = useRef(location.state?.from ?? '/movies');

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
        toast.error('Something went wrong, please try reloading the page', {
          duration: 5000,
        })}
      {loading && <Loader />}
      <Link to={backLink.current}>
        <Button
          variant="secondary"
          className="ms-3 ps-3 pe-3 mt-2 bg-transparent border border-white"
        >
          &#171; Go Back
        </Button>
      </Link>
      <MovieDetailsData movie={movie} />
      <Toaster position="top-right" />
    </div>
  );
};

export default MovieDetails;
