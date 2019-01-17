import { pathsRef } from '../config/firebase';
import { FETCH_PATHS, TRANSFER } from './types';

export const transferSelectedData = (title, distance, description, from, to, waypoints) => ({
  type: TRANSFER,
  payload: { title, distance, description, from, to, waypoints, transfered: true },
});

export const addPath = newPath => async dispatch => {
  pathsRef.push().set(newPath);
};

export const deletePath = deletePathId => async dispatch => {
  pathsRef.child(deletePathId).remove();
};

export const fetchPaths = () => async dispatch => {
  pathsRef.on('value', snapshot => {
    dispatch({
      type: FETCH_PATHS,
      payload: snapshot.val(),
    });
  });
};
