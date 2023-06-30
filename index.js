import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/firestore';

import App from './App';
import store from './components/Redux/Store';
import { Provider } from 'react-redux';


const firebaseConfig = {
  apiKey: "AIzaSyB0eY9GANKd6SNW0yrm-kR_L-sNfvMBBW4",
  authDomain: "mailbox-6f367.firebaseapp.com",
  databaseURL: "https://mailbox-6f367-default-rtdb.firebaseio.com",
  projectId: "mailbox-6f367",
  storageBucket: "mailbox-6f367.appspot.com",
  messagingSenderId: "12537443442",
  appId: "1:12537443442:web:b97333d0bcf22367a53eeb"
};

firebase.initializeApp(firebaseConfig);

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();


const rootElement = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  rootElement
);


export {db};