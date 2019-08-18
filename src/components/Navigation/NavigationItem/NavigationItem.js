import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css';

const navigationItem = (props) => {
    return (
        <NavLink 
            exact={props.exact}
            activeClassName={classes.active}
            className={classes.NavigationItem}
            to={props.link}>
            {props.children}
        </NavLink>
    );
}

export default navigationItem;