import React from "react";
import { Link } from "react-router-dom";

function NavBanner(props) {
    if(props.pageTitle === 'Home') {
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
    return (
        <header className="navigation-header">
            <nav className="navBar">
                <h1 className="navBar-logo">
                    <Link 
                        to='/'
                        className="navBar-logo-link"
                    >
                        REACH
                    </Link>
                </h1>
                <ul className="navBar-menu">
                    <li className="navBar-menu-item home-link">
                        <Link 
                            to='/'
                            className="navBar-menu-item-link"
                        >
                            Home
                        </Link>
                    </li>
                    <li className="navBar-menu-item resources-link">
                        <Link 
                            to="/resources" 
                            className="navBar-menu-item-link"
                        >
                            Resources
                        </Link>
                    </li>
                    <li className="navBar-menu-item discussionForum-link">
                        <Link 
                            to="/discussion-forum" 
                            className="navBar-menu-item-link"
                        >
                            Discussion
                        </Link>
                    </li>
                    <li className="navBar-menu-item FAQ-link">
                        <Link 
                            to="/how-to" 
                            className="navBar-menu-item-link"
                        >
                            How-to
                        </Link>
                    </li>
                </ul>
            </nav>
            <NavBanner pageTitle={props.pageTitle} />
        </header>
    );
};