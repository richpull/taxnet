export const LocalStore = {
  store: window.localStorage,
  key: 'taxNet',
  def: {
    moviesBookmarks: [],
    activeNavUrl: '',
  },
  install() {
    this.store.setItem(this.key, JSON.stringify(this.def));
    return this.get();
  },
  get() {
    return JSON.parse(this.store.getItem(this.key)) || this.install();
  },
  set(value, doneKey) {
    this.store.setItem(this.key, JSON.stringify(value));
    return doneKey ? this.get()[doneKey] : this.get();
  },
};
