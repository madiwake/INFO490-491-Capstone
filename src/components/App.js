import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DiscussionForumPage from './DiscussionForumPage';
import HowToPage from './HowToPage';
import ResourcePage from './ResourcePage';
import HomePage from './HomePage';

function App(props) {
  return (
    <Routes>
      <Route path='home' element={<HomePage />} />
      <Route path='resources' element={<ResourcePage onlineResources={props.onlineResources} uwResources={props.uwResources} seattleResources={props.seattleResources} />} />
      <Route path='discussion-forum' element={<DiscussionForumPage />} />
      <Route path='how-to' element={<HowToPage howToQuestions={props.howToQuestions} />} />
      <Route path='/' element={<Navigate to='home'/>} />
    </Routes>
  );
}

export default App;