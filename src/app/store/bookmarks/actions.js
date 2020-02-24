import { MOVIES_BOOKMARKS_DATA_GATHERING_SUCCESS } from '../const';
export const getMoviesBookmarksDataSuccess = payload => ({
  type: MOVIES_BOOKMARKS_DATA_GATHERING_SUCCESS,
  payload,
});
