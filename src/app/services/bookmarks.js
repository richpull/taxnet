import { store } from '@store';
import { getMoviesBookmarksDataSuccess } from '@store/bookmarks/actions';
import { LocalStore } from './localStorage';
export const getMoviesBookmarks = () => {
  const { moviesBookmarks } = LocalStore.get();
  store.dispatch(getMoviesBookmarksDataSuccess(moviesBookmarks));
};
export const toggleMoviesBookmarks = (bookmark, id) => {
  const state = LocalStore.get();
  const { moviesBookmarks } = state;
  let update = moviesBookmarks.filter(item => item.id !== id);
  if (moviesBookmarks.length === update.length) {
    update = [...update, { ...bookmark, id }];
  }
  store.dispatch(
    getMoviesBookmarksDataSuccess(
      LocalStore.set({ ...state, moviesBookmarks: update }, 'moviesBookmarks'),
    ),
  );
};
export const removeMoviesBookmarks = id => {
  const state = LocalStore.get();
  const { moviesBookmarks } = state;
  let update = moviesBookmarks.filter(item => item.id != id);
  store.dispatch(
    getMoviesBookmarksDataSuccess(
      LocalStore.set({ ...state, moviesBookmarks: update }, 'moviesBookmarks'),
    ),
  );
};
export const addMoviesBookmarks = (bookmark, id) => {
  const state = LocalStore.get();
  const { moviesBookmarks } = state;
  store.dispatch(
    getMoviesBookmarksDataSuccess(
      LocalStore.set(
        { ...state, moviesBookmarks: [...moviesBookmarks, { ...bookmark, id }] },
        'moviesBookmarks',
      ),
    ),
  );
};
export const hasMoviesBookmarks = id => {
  const { moviesBookmarks } = LocalStore.get();
  return moviesBookmarks.some(item => item.id === id);
};
