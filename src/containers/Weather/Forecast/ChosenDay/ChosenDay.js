import React from 'react';
import ReactSVG from 'react-svg';
import { getIcon, getMonth, getDay } from '../Utility/HelperFunctions';
import classes from './ChosenDay.css';

const chosenDay = (props) => {
    let [dayTxt, month, dayNum, year] = new Date(props.time * 1000).toString().split(' ', 4);
    let [maxTempTime] = new Date(props.temperatureMaxTime * 1000).toString().split(' ').slice(4);
    let [minTempTime] = new Date(props.temperatureMinTime * 1000).toString().split(' ').slice(4);
    // Convert 24 hour clock to 12 hour
    maxTempTime = (maxTempTime.toString().split(':').slice(0, 1)) % 12;
    minTempTime = (minTempTime.toString().split(':').slice(0, 1)) % 12;
    return (
        <div className={classes.ChosenDayMain}>
            <span style={{height: '30px'}}><h3>{getDay(dayTxt)}, {getMonth(month)} {dayNum} {year}</h3></span>
            <ReactSVG
                    src={getIcon(props.icon)}
                    beforeInjection={svg => {
                        svg.setAttribute('style', 'width: 80px')
                    }}
                    fallback={() => <span>Error!</span>}
                    loading={() => <span>Loading</span>} />
            <span><strong>{props.summary}</strong></span>
            <div style={{display: 'flex'}}>
                <div className={classes.ChosenDayMainLeft}>
                    
                    <span>High: <strong>{props.temperatureMax.toFixed(0)}</strong> at {maxTempTime} p.m.</span>
                    <span>Low: <strong>{props.temperatureMin.toFixed(0)}</strong> at {minTempTime} a.m.</span>
                </div>
                <div className={classes.ChosenDayMainRight}>
                    <span>Chance for rain: <strong>{(props.precipProbability * 100).toFixed(0)}%</strong></span>
                    <span>Humidity: <strong>{(props.humidity * 100).toFixed(0)}%</strong></span>
                </div>
            </div>
        </div>
    );
}

export default chosenDay;