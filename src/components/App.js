import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DiscussionForumPage from './DiscussionForumPage';
import HowToPage from './HowToPage';
import ResourcePage from './ResourcePage';
import HomePage from './HomePage';
import CreateDiscussionPostPage from './CreateDiscussionPostPage';
import Offcanvas from 'react-bootstrap/Offcanvas';

const App = (props) => {
  const [posts, setPosts] = useState([]);
  const [noticeShowing, setNoticeShowing] = useState(true);
  const handleNoticeClose = () => setNoticeShowing(false);
  return (
    <div>
      <Offcanvas className="websiteNotice" show={noticeShowing} onHide={handleNoticeClose} placement="top">
          <Offcanvas.Header closeButton>
          <Offcanvas.Title>Notice</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
              This application will be moving to open-source effective May 1st. 
              Please be aware of this when creating an account and posting and replying to the discussion. Thank you!
          </Offcanvas.Body>
      </Offcanvas>
      <Routes>
        <Route 
          path='home' 
          element={<HomePage auth={props.auth}/>} 
        />
        <Route 
          path='resources' 
          element={
            <ResourcePage 
              auth={props.auth} 
              onlineResources={props.onlineResources} 
              uwResources={props.uwResources} 
              seattleResources={props.seattleResources} 
            />
          } 
        />
        <Route 
          path='discussion-forum' 
          element={
            <DiscussionForumPage 
              auth={props.auth} 
              firestore={props.firestore}
              posts={posts}
              setPosts={setPosts} 
            />
          }
        /> 
        <Route 
          path="create-discussion-post" 
          element={
            <CreateDiscussionPostPage 
              auth={props.auth} 
              firestore={props.firestore}
              posts={posts}
              setPosts={setPosts}
            />
          } 
        />
        <Route 
          path='how-to' 
          element={
            <HowToPage 
              auth={props.auth} 
              howToQuestions={props.howToQuestions} 
            />
          } 
        />
        <Route 
          path='/' 
          element={<Navigate to='home'/>} 
        />
      </Routes>
    </div>
  );
};

export default App;



// import React, { useState, useEffect } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import DiscussionForumPage from './DiscussionForumPage';
// import HowToPage from './HowToPage';
// import ResourcePage from './ResourcePage';
// import HomePage from './HomePage';
// import NavigationBar from './NavigationBar';

// import { onAuthStateChanged, signOut } from "firebase/auth"; // Import signOut here

// function App(props) {
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(props.auth, (user) => {
//             setUser(user);
//         });

//         return () => unsubscribe();
//     }, [props.auth]);

//     const handleSignOut = () => {
//         signOut(props.auth);
//     };

//     return (
//         <div>
//             <NavigationBar pageTitle={props.pageTitle} user={user} auth={props.auth} onSignOut={handleSignOut} />
//             <Routes>
//                 <Route path='home' element={<HomePage />} />
//                 <Route path='resources' element={<ResourcePage onlineResources={props.onlineResources} uwResources={props.uwResources} seattleResources={props.seattleResources} />} />
//                 <Route path='discussion-forum' element={<DiscussionForumPage auth={props.auth} firestore={props.firestore} />} />
//                 <Route path='how-to' element={<HowToPage howToQuestions={props.howToQuestions} />} />
//                 <Route path='/' element={<Navigate to='home'/>} />
//             </Routes>
//         </div>
//     );
// }

// export default App;