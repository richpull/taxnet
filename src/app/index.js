import React from 'react';
import { render } from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import App from './components/App.jsx';
import { Provider } from 'react-redux';
import { store, history } from './store';

render(
  <Provider store={store}>
    <ConnectedRouter history={history} basename={process.env.APP_ROUTER_BASENAME}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
