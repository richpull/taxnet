import React, { useState } from 'react';
import { connect } from 'react-redux';
import MoviesItem from '../movies-item';
import Loader from '../loader';
import Alert from '../alert';
import {
  selectMoviesCollectionSearchFilter,
  selectMoviesFetching,
} from '@store/movies/selectors';
import PropTypes from 'prop-types';

const SearchResult = ({ searchResultCollection, isFetching }) => {
  const [searchCollectionLimit, setSearchCollectionLimit] = useState(10);
  const searchResultCollectionSize = searchResultCollection.length;

  return (
    <>
      <h1 className="all-center">Результаты поиска</h1>
      {searchResultCollectionSize > 0 && (
        <div className="movie-die-list">
          {searchResultCollection.slice(0, searchCollectionLimit).map(film => (
            <MoviesItem key={film.id} title={film.title} tags={film.tags} filmId={film.id} />
          ))}
        </div>
      )}
      {isFetching ? (
        <Loader />
      ) : !searchResultCollectionSize ? (
        <Alert title="По вашему запросу ничего не найдено :(" />
      ) : null}
      {searchResultCollectionSize > searchCollectionLimit && (
        <button
          className="button"
          onClick={setSearchCollectionLimit.bind(null, searchCollectionLimit + 10)}
        >
          <span>Показать еще</span>
        </button>
      )}
    </>
  );
};
SearchResult.propTypes = {
  searchResultCollection: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
  isFetching: PropTypes.bool.isRequired,
};
const mapStateToProps = state => ({
  searchResultCollection: selectMoviesCollectionSearchFilter(state),
  isFetching: selectMoviesFetching(state),
});
export default connect(mapStateToProps)(SearchResult);
