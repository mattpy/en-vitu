import React from 'react';
import classes from './NavigationItems.css';

import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    return (
        <div className={classes.NavigationItemsMain}>
                {/* <NavigationItem link='/' exact>Home</NavigationItem> */}
                <NavigationItem link='/news'>News</NavigationItem>
                <NavigationItem link='/weather'>Weather</NavigationItem>
                <NavigationItem link='/stocks'>Stocks</NavigationItem>
        </div>
    );
}

export default navigationItems;