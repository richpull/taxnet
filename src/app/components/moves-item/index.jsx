import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { hasMoviesBookmarks, toggleMoviesBookmarks } from '../../services/bookmarks';
import Tag from '../tag';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
const MovesItem = ({ location, payload, id, bookmarks = [] }) => {
  const { title, tags } = payload;
  let { search } = location;
  const moviesLink = `/film/${id}`;
  return (
    <div className="movie-die">
      <div className="movie-die__body">
        <div className="movie-die__body__item">
          <NavLink className="movie-die-title" to={moviesLink}>
            {title}
          </NavLink>
        </div>
        <div className="movie-die__body__item">
          <div className="tag-group">
            {tags.map((tag, index) => {
              return (
                <Tag
                  key={index}
                  to={{
                    pathname: `/search`,
                    search: `${search}&tags[]=${tag}`,
                  }}
                  title={tag}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="movie-die__control">
        <button
          className="button-bookmark"
          onClick={() => {
            toggleMoviesBookmarks(
              {
                title,
                url: moviesLink,
              },
              id,
            );
          }}
        >
          { bookmarks.find( item => item.id == id ) ? (
            <i className="icon-bookmark" />
          ) : (
            <i className="icon-bookmark-empty" />
          )}
        </button>
      </div>
    </div>
  );
};
MovesItem.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
  payload: PropTypes.shape({
    title: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  bookmarks : PropTypes.arrayOf(
    PropTypes.shape({
      id : PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    })
  ).isRequired
};
const mapStateToProps = state => ({
  bookmarks: state.bookmarks.movies,
});
export default connect(mapStateToProps)(withRouter(MovesItem));
