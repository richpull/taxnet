import { MOVIES_DATA_GATHERING_START, MOVIES_DATA_GATHERING_SUCCESS } from '../const';
export const getMovesDataStart = () => {
  return {
    type: MOVIES_DATA_GATHERING_START,
  };
};
export const getMovesDataSuccess = payload => {
  return {
    type: MOVIES_DATA_GATHERING_SUCCESS,
    payload,
  };
};
