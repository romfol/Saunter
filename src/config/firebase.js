import * as firebase from 'firebase';

import { FirebaseConfig } from './keys';

firebase.initializeApp(FirebaseConfig);
//export const database = firebase.database();
const databaseRef = firebase.database().ref();
export const pathsRef = databaseRef.child("paths");
