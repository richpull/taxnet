import { TAGS_DATA_GATHERING_SUCCESS } from '../const';
export const getTagsDataSuccess = payload => {
  return {
    type: TAGS_DATA_GATHERING_SUCCESS,
    payload,
  };
};
