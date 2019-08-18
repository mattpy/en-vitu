import React from 'react';
import Button from '../../../UI/Button/Button';
import classes from './RadarNavbar.css';

const radarNavbar = (props) => {
    return (
        <div className={classes.RadarNavbar}>
            <Button 
                isActive class='radar-button' 
                clicked={() => props.navbarClicked('precip')}>Precipitation</Button>
            <Button 
                isActive class='radar-button' 
                clicked={() => props.navbarClicked('temp')}>Temperature</Button>
            <Button 
                isActive class='radar-button' 
                clicked={() => props.navbarClicked('wind')}>Wind</Button>
        </div>
    );
}

export default radarNavbar;