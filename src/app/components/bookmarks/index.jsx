import React from 'react';
import BookmarksItems from '../bookmarks-item';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { selectBookmarksMoviesCollection } from '../../store/bookmarks/selectors';

const Bookmarks = ({ bookmarksMoviesCollection }) => {
  return (
    <>
      {bookmarksMoviesCollection.length ? (
        <div className="bookmarks-list">
          {bookmarksMoviesCollection.map(film => (
            <BookmarksItems key={film.id} title={film.title} filmId={film.id} url={film.url} />
          ))}
        </div>
      ) : (
        <div className="alert">У вас пока нет закладок:(</div>
      )}
    </>
  );
};
Bookmarks.propTypes = {
  bookmarksMoviesCollection: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
const mapStateToProps = state => ({
  bookmarksMoviesCollection: selectBookmarksMoviesCollection(state),
});
export default connect(mapStateToProps)(Bookmarks);
