import * as firebase from 'firebase';

import { FirebaseConfig } from './keys';

firebase.initializeApp(FirebaseConfig);

export const pathsRef = firebase.database().ref('paths/');
//export const pathsRef = databaseRef.child('paths');
