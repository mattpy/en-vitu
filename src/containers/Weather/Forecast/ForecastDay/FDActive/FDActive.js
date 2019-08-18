import React from 'react';
import classes from './FDActive.css';
import ReactSVG from 'react-svg';
import { getIcon, getMonth, getDay } from '../../Utility/HelperFunctions';

const fdActive = (props) => {
    let [dayTxt, month, dayNum, year] = new Date(props.data.time * 1000).toString().split(' ', 4);
    let maxTempTime = new Date(props.data.temperatureMaxTime * 1000).toString().split(' ').slice(4);
    let minTempTime = new Date(props.data.temperatureMinTime * 1000).toString().split(' ').slice(4);
    // Convert 24 hour clock to 12 hour
    maxTempTime = (maxTempTime.toString().split(':').slice(0, 1)) % 12;
    minTempTime = (minTempTime.toString().split(':').slice(0, 1)) % 12;
    if (minTempTime === 0) {
        minTempTime = 12;
    }

    return (
        <div className={classes.ShowMobileActive}
            onClick={() => props.clicked(props.id)}>
            <span style={{height: '30px'}}><h3>{getDay(dayTxt)}, {getMonth(month)} {dayNum} {year}</h3></span>
            <ReactSVG
                    src={getIcon(props.icon)}
                    beforeInjection={svg => {
                        svg.setAttribute('style', 'width: 80px')
                    }}
                    fallback={() => <span>Error!</span>}
                    loading={() => <span>Loading</span>} />
            <span><strong>{props.data.summary}</strong></span>
            <div style={{display: 'flex'}}>
                <div className={classes.ShowMobileActiveLeft}>
                    
                    <span>High: <strong>{props.data.temperatureMax.toFixed(0)}</strong> at {maxTempTime} p.m.</span>
                    <span>Low: <strong>{props.data.temperatureMin.toFixed(0)}</strong> at {minTempTime} a.m.</span>
                </div>
                <div className={classes.ShowMobileActiveRight}>
                    <span>Chance for rain: <strong>{(props.data.precipProbability * 100).toFixed(0)}%</strong></span>
                    <span>Humidity: <strong>{(props.data.humidity * 100).toFixed(0)}%</strong></span>
                </div>
            </div>
        </div>
    );
}

export default fdActive;