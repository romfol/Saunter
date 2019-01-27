import * as firebase from 'firebase';

const FirebaseConfig = {
  apiKey: 'AIzaSyAiK4HzB4f73g2babMwXD3trd8NcCB3CKQ',
  authDomain: 'my-project-1513188578457.firebaseapp.com',
  databaseURL: 'https://my-project-1513188578457.firebaseio.com',
};

firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();
export const pathsRef = databaseRef.child('paths');

export const database = firebase.database();

export const favsRef = firebase
  .database()
  .ref()
  .child('favourite');
