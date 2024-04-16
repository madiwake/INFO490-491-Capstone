import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import ONLINERESOURCES from './data/onlineResources.json';
import SEATTLERESOURCES from './data/seattleResources.json';
import UWRESOURCES from './data/uwResources.json';
import FAQQUESTIONS from './data/faqQuestions.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';
import './css/navigation.css';
import './css/footer.css';
import './css/resourcePageStyling.css';
import './css/faqPageStyling.css';
import './css/homePageStyling.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCyeszyxNKm7leFdFD9Q-3CqhEGbMyX88",
  authDomain: "reach-informatics-capstone.firebaseapp.com",
  projectId: "reach-informatics-capstone",
  storageBucket: "reach-informatics-capstone.appspot.com",
  messagingSenderId: "42815108660",
  appId: "1:42815108660:web:105b47c94b83fd9e207c61",
  measurementId: "G-SXW8XSNVV1"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App 
      onlineResources={ONLINERESOURCES} 
      seattleResources={SEATTLERESOURCES} 
      uwResources={UWRESOURCES} 
      faqQuestions={FAQQUESTIONS}
    />
  </BrowserRouter>
);

