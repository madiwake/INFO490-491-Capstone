import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import ONLINERESOURCES from './data/onlineResources.json';
import SEATTLERESOURCES from './data/seattleResources.json';
import UWRESOURCES from './data/uwResources.json';
import HOWTOQUESTIONS from './data/howToQuestions.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';
import './css/navigation.css';
import './css/footer.css';
import './css/resourcePageStyling.css';
import './css/howToPageStyling.css';
import './css/homePageStyling.css';
import './css/forumPageStyling.css';
import './css/createDiscussionPostPageStyling.css'


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxTPout1zSSOF-A5t-MlRSjF3WyqXYO60",
  authDomain: "informatics-capstone-reach.firebaseapp.com",
  projectId: "informatics-capstone-reach",
  storageBucket: "informatics-capstone-reach.appspot.com",
  messagingSenderId: "487666988247",
  appId: "1:487666988247:web:46ff2515bac846f1bfac92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(app);

// Initialize Firebase Auth
const auth = getAuth();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App 
      onlineResources={ONLINERESOURCES} 
      seattleResources={SEATTLERESOURCES} 
      uwResources={UWRESOURCES} 
      howToQuestions={HOWTOQUESTIONS}
      auth={auth}
      firestore={firestore} // Pass the firestore object to the App component
    />
  </BrowserRouter>
);

