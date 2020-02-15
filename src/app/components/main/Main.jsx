import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Movies from '../movies';
import Bookmarks from '../bookmarks';
import SearchResult from '../search-result';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Movies} />
      <Route path="/bookmarks" component={Bookmarks} />
      <Route path="/search" component={SearchResult} />
    </Switch>
  </main>
);

export default Main;
