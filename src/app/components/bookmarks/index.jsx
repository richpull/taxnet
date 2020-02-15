import React from 'react';
import BookmarksItems from '../bookmarks-item';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const Bookmarks = ({ bookmarks }) => {
  return (
    <>
      {bookmarks.length ? (
        <div className="bookmarks-list">
          {bookmarks.map((item, index) => {
            return <BookmarksItems key={index} title={item.title} id={item.id} url={item.url} />;
          })}
        </div>
      ) : (
        <div className="alert">У вас пока нет закладок:(</div>
      )}
    </>
  );
};
Bookmarks.propTypes = {
  bookmarks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
const mapStateToProps = state => ({
  bookmarks: state.bookmarks.movies,
});
export default connect(mapStateToProps)(Bookmarks);
