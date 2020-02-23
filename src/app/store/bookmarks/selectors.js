import { createSelector } from 'reselect';
const selectBookmarks = state => state.bookmarks;
export const selectBookmarksMoviesCollection = createSelector(
  selectBookmarks,
  bookmarks => bookmarks.movies,
);
export const selectBookmarksMoviesFindById = bookmarkId =>
  createSelector(selectBookmarksMoviesCollection, bookmarks =>
    bookmarks.some(bookmark => bookmark.id === bookmarkId),
  );
