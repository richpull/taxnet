import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MovesItem from '../moves-item';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import Loader from '../loader';
import Alert from '../alert';

const diff = (left, right) => {
  return left.every(val => right.includes(val));
};
const SearchResult = ({ location, movies: { moviesCollection = [], isFetching } }) => {
  const { title = '', tags = [] } = queryString.parse(location.search, { arrayFormat: 'bracket' });
  let results = 0;
  return (
    <>
      <h1 className="all-center">Результаты поиска</h1>
      {moviesCollection.length > 0 && (
        <div className="movie-die-list">
          {moviesCollection.map((item, index) => {
            if (
              (title === '' || item.title.toLowerCase().includes(title.toLowerCase())) &&
              (!tags.length || diff(tags, item.tags))
            ) {
              results++;
              return <MovesItem key={index} payload={item} id={index} />;
            }
          })}
        </div>
      )}
      {isFetching ? (
        <Loader />
      ) : !results ? (
        <Alert title="По вашему запросу ничего не найдено :(" />
      ) : null}
    </>
  );
};
SearchResult.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
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
export default connect(mapStateToProps)(withRouter(SearchResult));
