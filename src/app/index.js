import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App.jsx';
import { Provider } from 'react-redux';
import { store } from './store';

render(
  <Provider store={store}>
    <Router basename={process.env.APP_ROUTER_BASENAME}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
