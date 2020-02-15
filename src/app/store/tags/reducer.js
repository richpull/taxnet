import { TAGS_DATA_GATHERING_SUCCESS } from '../const';
const initialState = {
  tagsCollection: [],
};
export const tagsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TAGS_DATA_GATHERING_SUCCESS:
      return { ...state, tagsCollection: action.payload };
  }
  return state;
};
