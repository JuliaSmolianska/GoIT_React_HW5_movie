import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { StyledLink } from './linkStyled';
import css from './App.module.css'

const Home = lazy(() => import('./Home/Home'));
const Movies = lazy(() => import('./Movies/Movies'));
const MovieDetails = lazy(() => import('./MovieDetails/MovieDetails'));
const Cast = lazy(() => import('./MovieDetails/Cast'));
const Reviews = lazy(() => import('./MovieDetails/Reviews'));

export function App() {
  return (
    <div className={css.box}>
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/movies">Movies</StyledLink>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<Home />} />{' '}
          {/* Перенаправити на домашню сторінку для неіснуючих маршрутів */}
        </Routes>
      </Suspense>
    </div>
  );
}
