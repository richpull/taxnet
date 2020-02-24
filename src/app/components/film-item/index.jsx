import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addMoviesBookmarks, removeMoviesBookmarks } from '../../services/bookmarks';
import { selectMoviesFetching, selectMoviesFilmById } from '../../store/movies/selectors';
import { selectBookmarksMoviesFindById } from '../../store/bookmarks/selectors';
import poster from '@img/js/poster.png';

import PropTypes from 'prop-types';
import Loader from '../loader';

const FilmItem = ({
  match: {
    params: { id: queryFilmId },
  },
}) => {
  const isFetching = useSelector(selectMoviesFetching);
  const [film = false] = useSelector(selectMoviesFilmById(queryFilmId));
  const isBookmarks = useSelector(selectBookmarksMoviesFindById(queryFilmId));
  if (isFetching) {
    return <Loader />;
  }
  if (!film) {
    return <Redirect to="/" />;
  }
  const { title } = film;
  return (
    <div className="film">
      <div className="film__poster__box">
        <div className="film-poster">
          <img src={poster} alt="Poster" />
        </div>
      </div>
      <div className="film__info">
        <div className="film-title">{title}</div>
        <div className="film-poster-action">
          {isBookmarks ? (
            <button
              className="button button_light"
              onClick={removeMoviesBookmarks.bind(null, queryFilmId)}
            >
              <span>Удалить из закладок</span>
            </button>
          ) : (
            <button
              className="button"
              onClick={addMoviesBookmarks.bind(
                null,
                {
                  title,
                  url: `/film/${queryFilmId}`,
                },
                queryFilmId,
              )}
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
  // movies: PropTypes.shape({
  //   isFetching: PropTypes.bool.isRequired,
  //   moviesCollection: PropTypes.arrayOf(
  //     PropTypes.shape({
  //       title: PropTypes.string.isRequired,
  //       tags: PropTypes.arrayOf(PropTypes.string),
  //     }),
  //   ),
  // }).isRequired,
  // bookmarks: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  //   }),
  // ).isRequired,
};
// const mapStateToProps = state => ({
//   movies: state.movies,
//   bookmarks: state.bookmarks.movies,
// });
// export default connect(mapStateToProps)(FilmItem);
export default FilmItem;
