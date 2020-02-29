import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { activeNavToggle } from '../../services/history';
import PropTypes from 'prop-types';
import style from '@styles/scss/nav.module.scss';

const Nav = ({ location: { pathname } }) => {
  if (/^\/search/i.test(pathname)) {
    return null;
  }
  const saveActiveLink = match => {
    if (match) {
      activeNavToggle(match.url);
      return true;
    }
  };
  return (
    <nav className={style.Nav}>
      <NavLink
        exact
        className={style.Nav__link}
        isActive={saveActiveLink}
        activeClassName={style['Nav__link-isActive']}
        to="/"
      >
        <span>Все фильмы</span>
      </NavLink>
      <NavLink
        exact
        className={style.Nav__link}
        isActive={saveActiveLink}
        activeClassName={style['Nav__link-isActive']}
        to="/bookmarks"
      >
        <span>Закладки</span>
      </NavLink>
    </nav>
  );
};
Nav.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
export default withRouter(Nav);
