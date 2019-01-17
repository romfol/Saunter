import * as firebase from 'firebase';

import { FirebaseConfig } from './keys';

firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();
export const pathsRef = databaseRef.child('paths');

export const database = firebase.database();

export const favsRef = firebase
  .database()
  .ref()
  .child('favourite');
