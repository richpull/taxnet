import { TAGS_DATA_GATHERING_SUCCESS } from '../const';
export const getTagsDataSuccess = payload => ({
  type: TAGS_DATA_GATHERING_SUCCESS,
  payload,
});
