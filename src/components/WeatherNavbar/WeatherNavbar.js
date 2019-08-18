import React from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './WeatherNavbar.css'

const weatherNavbar = (props) => {
    return (
        <div className={classes.WeatherNavbar}>
            <Button isActive={props.isActive} class='button' clicked={props.forecastClicked}>Forecast</Button>
            <Button isActive={props.isActive} class='button' clicked={props.radarClicked}>Radar</Button>
        </div>
    );
}

export default weatherNavbar;