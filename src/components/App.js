import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DiscussionForumPage from './DiscussionForumPage';
import HowToPage from './HowToPage';
import ResourcePage from './ResourcePage';
import HomePage from './HomePage';
import NavigationBar from './NavigationBar';

import { onAuthStateChanged, signOut } from "firebase/auth"; // Import signOut here

function App(props) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(props.auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, [props.auth]);

    const handleSignOut = () => {
        signOut(props.auth);
    };

    return (
        <div>
            <NavigationBar pageTitle={props.pageTitle} user={user} auth={props.auth} onSignOut={handleSignOut} />
            <Routes>
                <Route path='home' element={<HomePage />} />
                <Route path='resources' element={<ResourcePage onlineResources={props.onlineResources} uwResources={props.uwResources} seattleResources={props.seattleResources} />} />
                <Route path='discussion-forum' element={<DiscussionForumPage auth={props.auth} firestore={props.firestore} />} />
                <Route path='how-to' element={<HowToPage howToQuestions={props.howToQuestions} />} />
                <Route path='/' element={<Navigate to='home'/>} />
            </Routes>
        </div>
    );
}

export default App;