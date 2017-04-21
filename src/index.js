import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'
import App from './components/App'
import './index.css'

const firebaseConfig = {
  apiKey: "AIzaSyC46KF-9wJMSBBfs1IgPBIHEeDKUk18H5I",
  authDomain: "boilerplatetodo.firebaseapp.com",
  databaseURL: "https://boilerplatetodo.firebaseio.com",
  projectId: "boilerplatetodo",
  storageBucket: "boilerplatetodo.appspot.com",
  messagingSenderId: "1042577821865",
}

firebase.initializeApp(firebaseConfig)

ReactDOM.render(
  <App />
  ,
  document.getElementById('root')
);
