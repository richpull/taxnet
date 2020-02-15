import axios from 'axios';
import { store } from '../store';
import { getTagsDataSuccess } from '../store/tags/actions';
export const getTags = () => {
  store.dispatch(dispatch => {
    axios.get('http://localhost:8081/data/tags.json').then(({ data }) => {
      dispatch(getTagsDataSuccess(data));
    });
  });
};
