import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createRootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();
const configureStore = () => {
  if (process.env.NODE_ENV === 'development') {
    return createStore(
      createRootReducer(history),
      composeWithDevTools(applyMiddleware(thunkMiddleware)),
    );
  }
  return createStore(createRootReducer(history), applyMiddleware(thunkMiddleware));
};
export const store = configureStore();
