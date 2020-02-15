import axios from 'axios';
import { store } from '../store';
import { getTagsDataSuccess } from '../store/tags/actions';
export const getTags = () => {
  store.dispatch(dispatch => {
    axios.get('/data/tags.json').then(({ data }) => {
      dispatch(getTagsDataSuccess(data));
    });
  });
};
