import { pathsRef, database, favsRef } from '../config/firebase';
import { FETCH_PATHS, TRANSFER, FETCH_FAVS } from './types';

export const transferSelectedData = (id, title, distance, description, from, to, waypoints) => ({
  type: TRANSFER,
  payload: { id, title, distance, description, from, to, waypoints, transfered: true },
});

export const addPath = newPath => async dispatch => {
  pathsRef.push().set(newPath);
};

export const addToFavourites = id => async dispatch => {
  const fav = database.ref(`favourite/${id}`);
  fav.update({
    id,
  });
};

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

export const fetchFavs = () => async dispatch => {
  favsRef.on('value', snapshot => {
    dispatch({
      type: FETCH_FAVS,
      payload: snapshot.val(),
    });
  });
};
