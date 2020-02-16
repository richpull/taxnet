import React, { useState, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import ButtonBack from '../button-back';
import PropTypes from 'prop-types';
import '@/styles/scss/search.scss';

const Search = ({ history, location }) => {
  const query = queryString.parse(location.search, { arrayFormat: 'bracket' });
  const { title = '', tags = [] } = query;
  const [search, setSearch] = useState(title);
  let SearchField = useRef(null);
  const handleSubmit = event => {
    event.preventDefault();
    if (search !== '' || tags.length) {
      history.push({
        pathname: '/search',
        search: queryString.stringify(
          { ...query, title: search },
          { sort: false, arrayFormat: 'bracket' },
        ),
      });
    }
  };
  return (
    <>
      <div className="app-nav-history">
        <div className="app-nav-history__offset">
          <ButtonBack />
        </div>
      </div>
      <div className="search-form">
        <form onSubmit={handleSubmit}>
          <div className="search">
            <input
              ref={SearchField}
              className="search__control"
              placeholder="Поиск..."
              type="text"
              name="search"
              defaultValue={title}
              onChange={e => setSearch(e.target.value)}
            />
            <button className="search__submit" type="submit">
              <i className="icon-search" />
            </button>
          </div>
          {tags.length > 0 && (
            <div className="tag-group m-1">
              {tags.map((item, index) => {
                return (
                  <div className="tag" key={index}>
                    #{item}
                  </div>
                );
              })}
            </div>
          )}
        </form>
      </div>
    </>
  );
};
Search.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default withRouter(Search);
