import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import ButtonBack from '../button-back';
import { queryGenerate } from '../../util/queryParser';
import { selectorSearchGetParams } from '@store/search/selectors';

import style from '@styles/scss/search.module';

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
        <ul className="app-nav-history__offset">
          <li>
            <ButtonBack />
          </li>
          <li>
            <Link className='button-back' to='/'>
              <span>На главную</span>
              <i className="icon-right-open" />
            </Link>
          </li>
        </ul>
      </div>
      <div className={style.SearchForm}>
        <form onSubmit={handleSubmit}>
          <div className={style.Search}>
            <input
              ref={fieldSearch}
              className={style.Search__control}
              placeholder="Поиск..."
              type="text"
              defaultValue={search.value}
              onChange={e => handleChangeFiled(e.target.value)}
              aria-labelledby="Поиск фильмов ..."
            />
            <button aria-label="Найти" className={style.Search__submit} disabled={disabled} type="submit">
              <i className="icon-search" />
            </button>
          </div>
          {tags.length > 0 && (
            <div className="tag-group m-1">
              {tags.map((tag, index) => (
                <div className="tag" key={index}>
                  <span>#{tag}</span>
                  <i title="Удалить" onClick={handleRemoveTag.bind(null, tag)} className="icon-cancel close" />
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
