import React from 'react';
import { Link } from 'react-router-dom';

export default function NavigationBar(props) {
    return (
        <header>
            <nav className='navBar'>
                <div className='navBar-logo'>
                    <h1>LOGO</h1>
                </div>
                <ul className='navBar-menu'>
                    <li className='navBar-menu-item resources'><Link to='/resources' className='navBar-menu-item-link'>Resources</Link></li>
                    <li className='navBar-menu-item discussionForum'><Link to='/discussion-forum' className='navBar-menu-item-link'>Discussion</Link></li>
                    <li className='navBar-menu-item FAQ'><Link to='/FAQ' className='navBar-menu-item-link'>FAQ</Link></li>
                </ul>
            </nav>
            <div className='navBar-spacer'/>
        </header>
    )
}