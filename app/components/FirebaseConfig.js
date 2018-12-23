import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database';

var config = {
    apiKey: "AIzaSyAFwodbQlUP9v-FBf4t-XROaxw5SxzHSmY",
    authDomain: "fir-database-demo-80c9a.firebaseapp.com",
    databaseURL: "https://fir-database-demo-80c9a.firebaseio.com",
    projectId: "fir-database-demo-80c9a",
    storageBucket: "fir-database-demo-80c9a.appspot.com",
    messagingSenderId: "518682418033"
  };
  export const firebaseApp = firebase.initializeApp(config);