import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { queryParser } from '../../util/queryParser';

const Tag = ({ toSearch, title, location: { search } }) => {
  const handleClick = (event, title) => {
    const { tags = [] } = queryParser(search);
    if (tags.includes(title)) {
      event.preventDefault();
    }
  };
  return (
    <NavLink
      activeClassName=""
      onClick={event => handleClick(event, title)}
      className="tag"
      to={{
        pathname: '/search',
        search: `${search}${toSearch}`,
      }}
    >
      <span>#{title}</span>
    </NavLink>
  );
};
Tag.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
  toSearch: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
export default withRouter(Tag);
