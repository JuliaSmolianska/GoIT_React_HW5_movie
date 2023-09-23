import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovies } from 'fetchAPI';
import { Loader } from 'components/Loader';
import css from '../pages/MovieDetails/MovieDetails.module.css';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieReviewsData = async () => {
      try {
        const reviewsData = await fetchMovies(`/movie/${movieId}/reviews`);
        setReviews(reviewsData.results);
      } catch (error) {
        console.error('Error fetching movie reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieReviewsData();
  }, [movieId]);

  if (loading) {
    return <Loader />;
  }

  if (reviews.length === 0) {
    return <div>No reviews available for this movie</div>;
  }

  return (
    <div className={css.review}>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <h3>Author: {review.author}</h3>
            <p>{review.content}</p>
            <a
              href={`https://www.themoviedb.org/review/${review.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read more
            </a>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
