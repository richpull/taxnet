import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ButtonBack from '../button-back';
import { queryGenerate } from '../../util/queryParser';
import { selectorSearchGetParams } from '../../store/search/selectors';
import '@/styles/scss/search.scss';

const searchValidate = (value, tags) => value === '' && !tags.length;
const Search = () => {
  const history = useHistory();
  const fieldSearch = useRef(null);
  const query = useSelector(selectorSearchGetParams);
  const { title = '', tags = [] } = query;
  const [search, setSearch] = useState({
    value: title,
    error: searchValidate(title, tags),
  });
  const disabled = search.error;
  const handleSubmit = event => {
    event.preventDefault();
    history.push({
      pathname: '/search',
      search: queryGenerate(query, { title: search.value }),
    });
  };
  const handleChangeFiled = value => {
    setSearch({ ...search, value: value, error: searchValidate(value, tags) });
  };
  const handleRemoveTag = removeTag => {
    history.push({
      pathname: '/search',
      search: queryGenerate(query, { tags: tags.filter(tag => tag !== removeTag) }),
    });
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
              ref={fieldSearch}
              className="search__control"
              placeholder="Поиск..."
              type="text"
              defaultValue={search.value}
              onChange={e => handleChangeFiled(e.target.value)}
            />
            <button className="search__submit" disabled={disabled} type="submit">
              <i className="icon-search" />
            </button>
          </div>
          {tags.length > 0 && (
            <div className="tag-group m-1">
              {tags.map((tag, index) => (
                <div className="tag" key={index}>
                  <span>#{tag}</span>
                  <span onClick={handleRemoveTag.bind(null, tag)} className="tag__remove">
                    <i className="icon-cancel" />
                  </span>
                </div>
              ))}
            </div>
          )}
        </form>
      </div>
    </>
  );
};
export default Search;
