import React from 'react'
import { render } from 'react-dom'
import firebase from 'firebase'

import App from './App'

firebase.initializeApp({
  apiKey: "AIzaSyB9iXjEc2Fs29NgKkICBthf-eZq7v-oGiY",
  authDomain: "react-game-936bc.firebaseapp.com",
  databaseURL: "https://react-game-936bc.firebaseio.com",
  projectId: "react-game-936bc",
  storageBucket: "react-game-936bc.appspot.com",
  messagingSenderId: "104091928006"
});

render(
  <App />,
  document.getElementById('app')
)
