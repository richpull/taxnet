import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { moviesReducer } from '../movies/reducer';
import { bookmarksReducer } from '../bookmarks/reducer';
import { tagsReducer } from '../tags/reducer';

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    movies: moviesReducer,
    bookmarks: bookmarksReducer,
    tags: tagsReducer,
  });
export default createRootReducer;
