import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  addMoviesBookmarks,
  hasMoviesBookmarks,
  removeMoviesBookmarks,
} from '../../services/bookmarks';
import PropTypes from 'prop-types';
import Loader from '../loader';

const FilmItem = ({
  match: {
    params: { id },
  },
  movies: { moviesCollection = [], isFetching },
}) => {
  const { title = false } = moviesCollection[id] || {};
  if (isFetching) {
    return <Loader />;
  }
  if (!title) {
    return <Redirect to="/" />;
  }
  return (
    <div className="film">
      <div className="film__poster__box">
        <div className="film-poster">
          <img src="/img/poster.png" alt="Poster" />
        </div>
      </div>
      <div className="film__info">
        <div className="film-title">{title}</div>
        <div className="film-poster-action">
          {hasMoviesBookmarks(id) ? (
            <button
              className="button"
              onClick={() => {
                removeMoviesBookmarks(id);
              }}
            >
              <span>Удалить из закладок</span>
            </button>
          ) : (
            <button
              className="button"
              onClick={() => {
                addMoviesBookmarks(
                  {
                    title,
                    url: `/film/${id}`,
                  },
                  id,
                );
              }}
            >
              <span>Добавить в закладки</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
FilmItem.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
  }).isRequired,
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
export default connect(mapStateToProps)(FilmItem);
