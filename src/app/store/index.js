import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const configureStore = () => {
  if (process.env.NODE_ENV === 'development') {
    return createStore(
      rootReducer,
      composeWithDevTools(applyMiddleware(thunkMiddleware)),
    );
  }
  return createStore(rootReducer, applyMiddleware(thunkMiddleware));
}
export const store = configureStore();
