import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { activeNavToggle } from '../../services/history';
import PropTypes from 'prop-types';
import '@/styles/scss/nav.scss';

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
    <div className="nav">
      <NavLink
        exact
        className="nav__link"
        isActive={saveActiveLink}
        activeClassName="nav__link-isActive"
        to="/"
      >
        <span>Все фильмы</span>
      </NavLink>
      <NavLink
        exact
        className="nav__link"
        isActive={saveActiveLink}
        activeClassName="nav__link-isActive"
        to="/bookmarks"
      >
        <span>Закладки</span>
      </NavLink>
    </div>
  );
};
Nav.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
export default withRouter(Nav);
