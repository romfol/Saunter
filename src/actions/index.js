import { pathsRef } from '../config/firebase';
import { FETCH_PATHS, TRANSFER, ADD_FAV } from './types';

export const transferSelectedData = (id, title, distance, description, from, to, waypoints) => ({
  type: TRANSFER,
  payload: { id, title, distance, description, from, to, waypoints, transfered: true },
});

export const addPath = newPath => async dispatch => {
  pathsRef.push().set(newPath);
};

export const addToFavourites = id => ({ type: ADD_FAV, payload: id });

// const dd = database.ref(`paths/${id}`);    works
// dd.update({
//   favourite: true,
// });
// return { type: ADD_FAV, payload: id };

export const deletePath = id => async dispatch => {
  pathsRef.child(id).remove();
};

export const fetchPaths = () => async dispatch => {
  pathsRef.on('value', snapshot => {
    dispatch({
      type: FETCH_PATHS,
      payload: snapshot.val(),
    });
  });
};
