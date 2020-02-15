import { MOVIES_BOOKMARKS_DATA_GATHERING_SUCCESS } from '../const';
const initialState = {
  movies: [],
};
export const bookmarksReducer = (state = initialState, action) => {
  switch (action.type) {
    case MOVIES_BOOKMARKS_DATA_GATHERING_SUCCESS:
      return { ...state, movies: action.payload };
  }
  return state;
};
