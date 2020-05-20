import React, { useState } from 'react';
import { Link } from "react-router-dom";

import MainHeader from './MainHeader.js';
import NavLinks from './NavLinks.js';
import './MainNavigation.css';
import SideDrawer from './SideDrawer.js';
import Backdrop from '../UIElements/Backdrop.js';

function MainNavigation(props) {
    const [isDrawerOpen, setisDrawerOpen] = useState(false);

    function openDrawerHandler() {
        setisDrawerOpen(true); 
    }

    function closeDrawerHandler() {
        setisDrawerOpen(false);
    }

    return (
        <React.Fragment>
            {isDrawerOpen ? <Backdrop onClick={closeDrawerHandler}/> : null}
            
            <SideDrawer show={isDrawerOpen} onClick={closeDrawerHandler}>
                <nav className="main-navigation__drawer-nav">
                    <NavLinks />
                </nav>
            </SideDrawer>

            <MainHeader>
                <button
                    className="main-navigation__menu-btn"
                    onClick={openDrawerHandler}
                >
                    {/*hamburger icon*/}
                    <span />
                    <span />
                    <span />
                </button>

                <h1 className="main-navigation__title">
                    <Link to="/">Your Places</Link>
                </h1>

                <nav className="main-navigation__header-nav">
                    <NavLinks />
                </nav>
            </MainHeader>
        </React.Fragment>
    );
}

export default MainNavigation;