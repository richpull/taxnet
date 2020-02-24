import { MOVIES_DATA_GATHERING_START, MOVIES_DATA_GATHERING_SUCCESS } from '../const';
export const getMovesDataStart = () => ({
  type: MOVIES_DATA_GATHERING_START,
});
export const getMovesDataSuccess = payload => ({
  type: MOVIES_DATA_GATHERING_SUCCESS,
  payload,
});
