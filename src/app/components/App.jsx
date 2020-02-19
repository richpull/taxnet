import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getMovies, go } from '../services/movies';
import { getMoviesBookmarks } from '../services/bookmarks';
import { getTags } from '../services/tags';

import Base from './base';
import Film from './film';

const App = () => {
  useEffect(() => {
    getMovies();
    getMoviesBookmarks();
    getTags();
  });
  return (
    <>
      <Switch>
        <Route path="/film" component={Film} />
        <Route path="/" component={Base} />
      </Switch>
    </>
  );
};

export default App;
