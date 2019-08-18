import React from 'react';
import ForecastDay from './ForecastDay/ForecastDay';
import ChosenDay from './ChosenDay/ChosenDay';
import classes from './Forecast.css';

const forecast = (props) => {
    let forecastDays = [];
    for (let days in props.forecast.daily) {
        forecastDays.push(<ForecastDay
                id={props.forecast.daily[days].id}
                clicked={props.clicked}
                key={props.forecast.daily[days].id + 'key'}
                data={props.forecast.daily[days]}
                toggled={props.forecast.daily[days].isToggled}
                />
        )
    }
    let chosenDay = null;
    if (props.isToggled) {
        chosenDay = <ChosenDay {...props.focusData} />;
    }
    return (
        <div className={classes.ForecastMain}>
            <h3>Forecast</h3>
            <span><em>Click buttons to toggle</em></span>
            <div className={classes.ForecastGroup}>
                {forecastDays}
            </div>
            <div className={classes.ChosenDayWrapper}>
            {chosenDay}
            </div>
        </div>
    );
};

export default forecast;