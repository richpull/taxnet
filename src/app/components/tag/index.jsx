import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string';
const Tag = ({ to, title }) => {
  const handleClick = (event, title) => {
    const { tags = [] } = queryString.parse(location.search, { arrayFormat: 'bracket' });
    if (tags.some(v => v === title)) {
      event.preventDefault();
    }
  };
  return (
    <NavLink onClick={event => handleClick(event, title)} className="tag" to={to}>
      <span>#{title}</span>
    </NavLink>
  );
};
Tag.propTypes = {
  to: PropTypes.shape({
    search: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
};
export default Tag;
