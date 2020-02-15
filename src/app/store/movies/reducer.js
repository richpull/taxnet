import { MOVIES_DATA_GATHERING_START, MOVIES_DATA_GATHERING_SUCCESS } from '../const';
const initialState = {
  isFetching: false,
  moviesCollection: [],
};
export const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case MOVIES_DATA_GATHERING_START:
      return { ...state, isFetching: true };
    case MOVIES_DATA_GATHERING_SUCCESS:
      return { ...state, isFetching: false, moviesCollection: action.payload };
  }
  return state;
};
