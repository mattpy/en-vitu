import React from 'react';
import classes from './CurrentConditions.css';

import rain from '../../../assets/rain.gif';
import clouds from '../../../assets/clouds.gif';
import clear from '../../../assets/clear.gif';
import night from '../../../assets/night.gif';
import snowy from '../../../assets/snowy.gif';

const getWeatherIcon = (weather) => {
    switch (weather) {
        case 'partly-cloudy-day':
            return clouds;
        case 'rain':
            return rain;
        case 'snow':
            return snowy;
        default:
            if ((new Date().getHours()) > 20 || (new Date().getHours()) < 6) {
                return night;
            }
            return clear;
    }
}

const currentConditions = (props) => {
    let icon = props.icon;
    if (props.precipType) {
        icon = props.precipType;
    }
    let sliderLeft = { left: props.lowTmp * 2 },
        sliderRight = { left: props.highTmp * 2 },
        sliderBar = { left: props.lowTmp * 2, width: (props.highTmp - props.lowTmp) * 3 }
    let currentConditions = null;
    if (props.dateTime) {
        currentConditions = (
            <div className={classes.card}>
                <div id={classes.nameWrapper}>
                    <h3>{props.providedLoc}</h3>
                    <p>{props.summary}</p>
                </div>
                <div className={classes.CurrentConditionsWrapper}>
                    <div id={classes.imgDiv}>
                        <img id={classes.imgId} src={getWeatherIcon(icon)} alt='rain' />
                    </div>
                    <div id={classes.WeatherStatsWrapper}>
                        <div>
                            <p>Current temp: {props.temperature.toFixed(0)}F</p>
                            <p>Humidity: {(props.humidity * 100).toFixed(0)}%</p>
                            <p>Chance of rain: {(props.precipProb * 100).toFixed(0)}%</p>
                        </div>
                        <div className={classes.SliderContainer}>
                            <span style={{ marginLeft: '10px' }}>temps</span>
                            <div
                                style={sliderLeft}
                                className={classes.SliderLeft}>
                                <span
                                    id={classes.SliderLeftSpan}>
                                    {props.lowTmp.toFixed(0)}
                                </span>
                            </div>
                            <div
                                style={sliderBar}
                                className={classes.SliderBar}></div>
                            <div
                                style={sliderRight}
                                className={classes.SliderRight}>
                                <span
                                    id={classes.SliderRightSpan}>
                                    {props.highTmp.toFixed(0)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return currentConditions;
}

export default currentConditions;