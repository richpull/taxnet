import React from 'react';
import { NavLink } from 'react-router-dom';
import { toggleMoviesBookmarks } from '../../services/bookmarks';
import Tag from '../tag';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectBookmarksMoviesFindById } from '@store/bookmarks/selectors';

const MovesItem = ({ tags = [], title = '', filmId }) => {
  const isBookmarks = useSelector(selectBookmarksMoviesFindById(filmId));
  const filmUrl = `/film/${filmId}`;
  return (
    <div className="movie-die">
      <div className="movie-die__body">
        <div className="movie-die__body__item">
          <NavLink className="movie-die-title" to={filmUrl}>
            {title}
          </NavLink>
        </div>
        {tags.length && (
          <div className="movie-die__body__item">
            <div className="tag-group">
              {tags.map((tag, index) => (
                <Tag key={index} toSearch={`&tags[]=${tag}`} title={tag} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="movie-die__control">
        <button
          className="button-bookmark"
          onClick={toggleMoviesBookmarks.bind(
            null,
            {
              title,
              url: filmUrl,
            },
            filmId,
          )}
        >
          {isBookmarks ? <i className="icon-bookmark" /> : <i className="icon-bookmark-empty" />}
        </button>
      </div>
    </div>
  );
};
MovesItem.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default MovesItem;
