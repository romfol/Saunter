import { pathsRef } from '../config/firebase';
import { FETCH_PATHS } from './types';

export const addPath = newToDo => async dispatch => {
  pathsRef.push().set(newToDo);
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
