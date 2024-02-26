import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// import use state eventually?
import DiscussionForumPage from './DiscussionForumPage';
import FAQPage from './FAQAskedPage';
import ResourcePage from './ResourcePage';
// import all pages (components)

// return routes - with base being whatever page will be landing
function App(props) {
  return (
    <Routes>
      <Route path='resources' element={<ResourcePage />} />
      <Route path='discussion-forum' element={<DiscussionForumPage />} />
      <Route path='FAQ' element={<FAQPage />} />
      <Route path='/' element={<Navigate to='/resources'/>}/>
    </Routes>
  );
}

export default App;