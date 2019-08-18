import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './Layout.css';
import logo from '../../assets/vitu1.png';

import NavigationItems from '../../components/Navigation/NavigationItems';

class Layout extends Component {

    render() {
        return (
            <div className={classes.MainContainer}>
                <Link to="/"><img src={logo} alt="Google Logo" /></Link>
                <NavigationItems />
            </div>
        );
    }
}

export default Layout;