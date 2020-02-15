import React from 'react';
import Search from '../search';
import Nav from '../nav';
import Main from '../main/Main';
const Base = () => (
  <div className="app">
    <Search />
    <Nav />
    <Main />
  </div>
);
export default Base;
