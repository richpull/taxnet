import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
const ButtonBack = ({ history }) => {
  return (
    <button onClick={history.goBack} className="button-back">
      <i className="icon-left-open" />
      <span>Назад</span>
    </button>
  );
};
ButtonBack.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
export default withRouter(ButtonBack);
