import React from "react";
import { Link } from "react-router-dom";

export default function NavigationBar(props) {
    return (
        <header className="navigation-header">
            <nav className="navBar">
                <h1 className="navBar-logo">
                    REACH
                </h1>
                <ul className="navBar-menu">
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
                            to="/FAQ" 
                            className="navBar-menu-item-link"
                        >
                            FAQ
                        </Link>
                    </li>
                </ul>
            </nav>
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
        </header>
    );
};