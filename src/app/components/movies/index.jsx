import React, { useState } from 'react';
import { connect } from 'react-redux';
import MovesItem from '../moves-item';
import PropTypes from 'prop-types';
import Loader from '../loader';

const Movies = ({ movies: { moviesCollection = [], isFetching } }) => {
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
          {moviesCollection.map((item, index) => {
            if (index < moviesCollectionLimit) {
              return <MovesItem key={index} payload={item} id={index} />;
            }
          })}
        </div>
      )}
      {!(moviesCollectionTotal <= moviesCollectionLimit) && (
        <button
          className="button"
          onClick={() => {
            setMoviesCollection(moviesCollectionLimit + 10);
          }}
        >
          <span>Показать еще</span>
        </button>
      )}
    </>
  );
};
Movies.propTypes = {
  movies: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    moviesCollection: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string),
      }),
    ),
  }).isRequired,
};
const mapStateToProps = state => ({
  movies: state.movies,
  bookmarks: state.bookmarks.movies,
});

export default connect(mapStateToProps)(Movies);
