import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { signInWithRedirect, signOut, GoogleAuthProvider } from "firebase/auth";

function NavBanner(props) {
    if (props.pageTitle === 'Home') {
        return (
            <div className="navBanner">
                <img
                    className="navBanner-img"
                    src="/img/page-banner.jpeg"
                    alt="light purple banner snapping the entirety of the window. banner includes a simple graphic cityscape of seattle in the center"
                />
            </div>
        )
    } else {
        return (
            <div className="navBanner">
                <img
                    className="navBanner-img"
                    src="/img/page-banner.jpeg"
                    alt="light purple banner snapping the entirety of the window. banner includes a simple graphic cityscape of seattle in the center"
                />
                <div className="navBanner-overlay-title-container">
                    <h1 className="navBanner-overlay-title">
                        {props.pageTitle}
                    </h1>
                </div>
            </div>
        )
    }
}

export default function NavigationBar(props) {
    const [noticeShowing, setNoticeShowing] = useState(true);
    const handleNoticeClose = () => setNoticeShowing(false);

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(props.auth, provider);
    };

    const handleSignOut = () => {
        signOut(props.auth);
    };

    return (
        <header className="navigation-header">
            <Offcanvas className="websiteNotice" show={noticeShowing} onHide={handleNoticeClose} placement="top">
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>Notice</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    This application will be moving to open-source effective May 1st. 
                    Please be aware of this when creating an account and posting and replying to the discussion. Thank you!
                </Offcanvas.Body>
            </Offcanvas>
            <nav className="navBar">
                <h1 className="navBar-logo">
                    <NavLink 
                        to='/'
                        className="navBar-logo-link"
                        activeclassname="active"
                    >
                        REACH
                    </NavLink>
                </h1>
                <div className="navBar-menu-container">
                    <ul className="navBar-menu">
                        <li className="navBar-menu-item home-link">
                            <NavLink 
                                to='/'
                                className="navBar-menu-item-link"
                                activeclassname="active"
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="navBar-menu-item resources-link">
                            <NavLink 
                                to="/resources" 
                                className="navBar-menu-item-link"
                                activeclassname="active"
                            >
                                Resources
                            </NavLink>
                        </li>
                        <li className="navBar-menu-item discussionForum-link">
                            <NavLink 
                                to="/discussion-forum" 
                                className="navBar-menu-item-link"
                                activeclassname="active"
                            >
                                Discussion
                            </NavLink>
                        </li>
                        <li className="navBar-menu-item FAQ-link">
                            <NavLink 
                                to="/how-to" 
                                className="navBar-menu-item-link"
                                activeclassname="active"
                            >
                                How-to
                            </NavLink>
                        </li>
                    </ul>
                    {/* Conditional rendering for sign-in/sign-out button */}
                    {props.user ? (
                        <button className={"sign-in-button"} onClick={handleSignOut} alt="sign out" type="button">
                            Sign Out
                        </button>
                    ) : (
                        <button className={"sign-in-button"} onClick={googleSignIn} alt="sign in with google" type="button">
                            Sign In with Google
                        </button>
                    )}
                </div>
            </nav>
            <NavBanner pageTitle={props.pageTitle} />
        </header>
    );
};
