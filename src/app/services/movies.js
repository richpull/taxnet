//import axios from 'axios';
import { store } from '../store';
import { getMovesDataStart, getMovesDataSuccess } from '../store/movies/actions';
import firebase from '../../firebase';

export const getMovies = () => {
  store.dispatch(async dispatch => {
    try {
      dispatch(getMovesDataStart());
      const movies =
        (
          await firebase
            .database()
            .ref('/movies')
            .once('value')
        ).val() || [];
      dispatch(getMovesDataSuccess(Object.keys(movies).map(key => ({ ...movies[key], id: key }))));
    } catch (e) {}

    // firebase.database().ref('/movies').once('value').then( data => {
    //   const movies = data.val() || [];
    //   dispatch(getMovesDataSuccess(Object.keys(movies).map( key => ({ ...movies[key], id:key }) )));
    // })

    // local load data
    // axios.get(`${process.env.API_DATA_URL}/films.json`).then(({ data }) => {
    //   dispatch(getMovesDataSuccess(data));
    // });
  });
};
