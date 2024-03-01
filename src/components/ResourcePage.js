import React from "react";
import Navigation from './NavigationBar';

export default function ResourcePage(props) {
    return (
        <div className="resourcePage">
            <Navigation pageTitle={'Resources'} />
            <div className="resourcePage-body">
                
                <div className="resourcePage-content-container">
                    <div className="filterBar">
                        <h2>Filter</h2>
                        <ul className="filterBar-options">
                            <li>
                                <button>
                                    Support Groups
                                    <img src="/img/plus-icon.png" alt="plus icon"/>
                                </button>
                            </li>
                            <li>
                                <button>
                                    Therapy
                                    <img src="/img/plus-icon.png" alt="plus icon"/>
                                </button>
                            </li>
                            <li>
                                <button>
                                    Housing
                                    <img src="/img/plus-icon.png" alt="plus icon"/>
                                </button>
                            </li>
                            <li>
                                <button>
                                    Employment
                                    <img src="/img/plus-icon.png" alt="plus icon"/>
                                </button>
                            </li>
                            <li>
                                <button className="last-button">
                                    Clubs
                                    <img src="/img/plus-icon.png" alt="plus icon"/>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="resources">
                        <h2>UW Resources</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}