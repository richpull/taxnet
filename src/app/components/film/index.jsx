import React from 'react';
import { Route } from 'react-router-dom';
import FilmItem from '../film-item';
import ButtonBack from '../button-back';

const Film = () => {
  return (
    <div className="app-detail">
      <div className="app-detail-header">
        <ButtonBack />
      </div>
      <div className="app-detail-body">
        <Route exact path="/film/:id" component={FilmItem} />
      </div>
    </div>
  );
};
export default Film;
