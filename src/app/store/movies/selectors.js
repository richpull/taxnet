import { createSelector } from 'reselect';
import { selectorSearchGetParams } from '../search/selectors';
const selectMovies = state => state.movies;

export const selectMoviesCollection = createSelector(
  selectMovies,
  movies => movies.moviesCollection,
);
export const selectMoviesFetching = createSelector(selectMovies, movies => movies.isFetching);
export const selectMoviesFilmById = (filmId = '') =>
  createSelector(selectMoviesCollection, movies => movies.filter(film => film.id === filmId));

export const selectMoviesCollectionSearchFilter = createSelector(
  [selectMoviesCollection, selectorSearchGetParams],
  (movies, { title = '', tags = [] }) =>
    movies.filter(
      film =>
        film.title.includes(title) && tags.every(val => film.tags.find(tag => tag.includes(val))),
    ),
);
