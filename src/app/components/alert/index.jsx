import React from 'react';
import PropTypes from 'prop-types';
const Alert = ({ title = 'Сообщение...' }) => <div className="alert">{title}</div>;
Alert.propTypes = {
  title: PropTypes.string,
};
export default Alert;
