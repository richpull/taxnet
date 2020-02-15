import axios from 'axios';
import { store } from '../store';
import { getMovesDataStart, getMovesDataSuccess } from '../store/movies/actions';
export const getMovies = () => {
  store.dispatch(dispatch => {
    dispatch(getMovesDataStart());
    axios.get('http://localhost:8081/data/films.json').then(({ data }) => {
      // setTimeout (временный) для теста долгой загрузки данных
      setTimeout(() => {
        dispatch(getMovesDataSuccess(data));
      }, 2000);
    });
  });
};
