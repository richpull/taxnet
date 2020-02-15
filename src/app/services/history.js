import { LocalStore } from './localStorage';
export const activeNavToggle = url => {
  const state = LocalStore.get();
  const { activeNavUrl } = state;
  if (activeNavUrl !== url) {
    LocalStore.set({ ...state, activeNavUrl: url });
  }
};
export const getActiveNavToggle = currentUrl => {
  const state = LocalStore.get();
  const { activeNavUrl, redirect = true } = state;
  if (!redirect && activeNavUrl !== currentUrl) {
    LocalStore.set({ ...state, redirect: true });
    return activeNavUrl;
  }
  return false;
};
