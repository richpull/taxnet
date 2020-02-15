import React from 'react';
import PropTypes from 'prop-types';
const Loader = ({ title = 'Идет загрузка данных...' }) => <div className="loader">{title}</div>;
Loader.propTypes = {
  title: PropTypes.string,
};
export default Loader;
