import { combineReducers } from 'redux';
import { moviesReducer } from '../movies/reducer';
import { bookmarksReducer } from '../bookmarks/reducer';
import { tagsReducer } from '../tags/reducer';
const rootReducer = combineReducers({
  movies: moviesReducer,
  bookmarks: bookmarksReducer,
  tags: tagsReducer,
});

export default rootReducer;
