import React, { useState } from 'react';
import { connect } from 'react-redux';
import MoviesItem from '../movies-item';
import PropTypes from 'prop-types';
import Loader from '../loader';
import { selectMoviesCollection, selectMoviesFetching } from '@store/movies/selectors';

const Movies = ({ moviesCollection = [], isFetching }) => {
  const [moviesCollectionLimit, setMoviesCollection] = useState(10);
  const moviesCollectionTotal = moviesCollection.length;
  if (isFetching) {
    return <Loader title="Идет загрузка фильмов ..." />;
  }
  return (
    <>
      {!moviesCollection.length && <div className="alert">У вас пока нет фильмов :(</div>}
      {moviesCollection.length && (
        <div className="movie-die-list">
          {moviesCollection.slice(0, moviesCollectionLimit).map(film => (
            <MoviesItem key={film.id} title={film.title} tags={film.tags} filmId={film.id} />
          ))}
        </div>
      )}
      {!(moviesCollectionTotal <= moviesCollectionLimit) && (
        <button
          className="button"
          onClick={setMoviesCollection.bind(null, moviesCollectionLimit * 2)}
        >
          <span>Показать еще</span>
        </button>
      )}
    </>
  );
};
Movies.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  moviesCollection: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
};
const mapStateToProps = state => ({
  moviesCollection: selectMoviesCollection(state),
  isFetching: selectMoviesFetching(state),
});

export default connect(mapStateToProps)(Movies);
