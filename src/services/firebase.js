import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyDfof07N7eLQhcl0CoDZspLlDY0YXX-g6s",
  authDomain: "where-i-watch-you.firebaseapp.com",
  databaseURL: "https://where-i-watch-you.firebaseio.com/"
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();


