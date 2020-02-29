import React from 'react';
import { NavLink } from 'react-router-dom';
import { removeMoviesBookmarks } from '../../services/bookmarks';
import PropTypes from 'prop-types';

const BookmarksItems = ({ title, filmId, url }) => {
  return (
    <div className="bookmarks">
      <div className="bookmarks__head">
        <NavLink className="bookmarks-title" to={url}>
          {title}
        </NavLink>
      </div>
      <div className="bookmarks__control">
        <button title="Удалить фильм" className="button-bookmark" onClick={removeMoviesBookmarks.bind(null, filmId)}>
          <i className="icon-cancel" />
        </button>
      </div>
    </div>
  );
};
BookmarksItems.propTypes = {
  title: PropTypes.string.isRequired,
  filmId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  url: PropTypes.string.isRequired,
};
export default BookmarksItems;
