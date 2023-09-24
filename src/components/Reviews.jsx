import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovies } from 'fetchAPI';
import { Loader } from 'components/Loader';
import toast, { Toaster } from 'react-hot-toast';
import css from '../pages/MovieDetails/MovieDetails.module.css';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovieReviewsData = async () => {
      try {
        const reviewsData = await fetchMovies(`/movie/${movieId}/reviews`);
        setReviews(reviewsData.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieReviewsData();
  }, [movieId]);

  if (reviews.length === 0) {
    return <div>No reviews available for this movie</div>;
  }

  return (
    <div className={css.review}>
      {error &&
        !loading &&
        toast.error('Something went wrong, please try reloading the page', {
          duration: 5000,
        })}
      {loading ? (
        <Loader />
      ) : (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <h3>Author: {review.author}</h3>
              <p>{review.content}</p>
              <hr />
            </li>
          ))}
        </ul>
      )}
      <Toaster position="top-right" />
    </div>
  );
};

export default Reviews;
