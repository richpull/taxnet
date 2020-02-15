import axios from 'axios';
import { store } from '../store';
import { getMovesDataStart, getMovesDataSuccess } from '../store/movies/actions';
export const getMovies = () => {
  store.dispatch(dispatch => {
    dispatch(getMovesDataStart());
    axios.get('/data/films.json').then(({ data }) => {
      dispatch(getMovesDataSuccess(data));
    });
  });
};
