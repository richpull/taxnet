import axios from 'axios';
import { store } from '@store';
import { getTagsDataSuccess } from '@store/tags/actions';
import firebase from '@/firebase';

export const getTags = () => {
  store.dispatch(async dispatch => {
    try {
      const tags =
        (
          await firebase
            .database()
            .ref('/tags')
            .once('value')
        ).val() || [];
      dispatch(getTagsDataSuccess(Object.keys(tags).map(key => ({ ...tag[key], id: key }))));
    } catch (e) {}

    // get Local json file
    // axios.get(`${process.env.API_DATA_URL}/tags.json`).then(({ data }) => {
    //   dispatch(getTagsDataSuccess(data));
    // });
  });
};
