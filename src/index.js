import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import "antd/dist/antd.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWv4BWNbEHkBUpDl9MeiVb79ITe1eKHqg",
  authDomain: "rhapsody-6d20c.firebaseapp.com",
  projectId: "rhapsody-6d20c",
  storageBucket: "rhapsody-6d20c.appspot.com",
  messagingSenderId: "683139077973",
  appId: "1:683139077973:web:ce55e0832b8451de7b41dc",
  measurementId: "G-KKEGEL22C7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
