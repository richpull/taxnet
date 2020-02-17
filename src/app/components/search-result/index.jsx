import React, {useState} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MoviesItem from '../movies-item';
import queryString from 'query-string';
import reactStringReplace from 'react-string-replace';
import PropTypes from 'prop-types';
import Loader from '../loader';
import Alert from '../alert';
const diff = (left, right) => {
  return left.every(val => right.find(item => item.search(new RegExp(val, 'i')) !== -1));
};
const SearchResult = ({ location : {search : search}, movies: { moviesCollection = [], isFetching } }) => {
  if(search === '') {
    return null;
  }
  const [searchCollectionLimit, setSearchCollectionLimit] = useState(10);
  let searchResultTotal = -1;
  const { title = '', tags = [] } = queryString.parse(location.search, { arrayFormat: 'bracket' });
  return (
    <>
      <h1 className="all-center">Результаты поиска</h1>
      {moviesCollection.length > 0 && (
        <div className="movie-die-list">
          {moviesCollection.map((item, index) => {
            if (
              item.title.search(new RegExp(title, 'i')) !== -1 &&
              (!tags.length || diff(tags, item.tags)) &&
              (searchResultTotal < searchCollectionLimit)
            ) {
              if(++searchResultTotal < searchCollectionLimit){
                const titleReplace = title === '' ? item.title : reactStringReplace(item.title, title, (match, i) => <b key={i}>{match}</b>);
                return <MoviesItem key={index} title={titleReplace} tags={item.tags} id={index} />;
              }
            }
          })}
        </div>
      )}
      {isFetching ? (
        <Loader />
      ) : (searchResultTotal < 0) ? (
        <Alert title="По вашему запросу ничего не найдено :(" />
      ) : null}
      {(searchResultTotal === searchCollectionLimit) && (
        <button
          className="button"
          onClick={() => {
            setSearchCollectionLimit(searchCollectionLimit + 10);
          }}
        >
          <span>Показать еще</span>
        </button>
      )}
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
