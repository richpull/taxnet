import { LocalStore } from './localStorage';
export const activeNavToggle = url => {
  const state = LocalStore.get();
  const { activeNavUrl } = state;
  if (activeNavUrl !== url) {
    LocalStore.set({ ...state, activeNavUrl: url });
  }
};
