// import * as firebase from 'firebase';
import firebase from 'firebase/app';
import firebaseDataBase from 'firebase/database';
import firestore from 'firebase/firestore';

var config = {
    apiKey: "AIzaSyCve4OXYlskx1mBrvnTHrxk5JvYOILdeAA",
    authDomain: "shopping-list-67250.firebaseapp.com",
    databaseURL: "https://shopping-list-67250.firebaseio.com",
    projectId: "shopping-list-67250",
    storageBucket: "shopping-list-67250.appspot.com",
    messagingSenderId: "570595722871"
};

var firebaseApp = firebase.initializeApp(config);
const fireApp = firebase.firestore();
fireApp.settings({ timestampsInSnapshots: true });
export default firebaseApp;
