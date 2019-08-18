import React from 'react';
import classes from './Results.css';
import Button from '@material-ui/core/Button';
import './Results.css';

import Charts from '../Charts/Charts';

const results = (props) => {
    let arrow = (props.data['1. open'] < props.data['4. close']) ? 'arrowUp' :
        'arrowDown';
    if (props.data['1. open'] === props.data['4. close']) { arrow = 'arrowNull' }
    let percentage = (props.data['1. open'] < props.data['4. close']) ? 'percentageGreen' :
        'percentageRed';
    if (props.data['1. open'] === props.data['4. close']) { percentage = 'percentageNull' }
    let percentChange = (props.data['4. close'] - props.data['1. open']);

    let content = <div className={classes.ResultsContainer}>
        <div>
            <div className={classes.close} onClick={props.clicked}>
            </div>
        </div>
        <div className={classes.ResultsSymbol}>
            <h3>{props.symbol}</h3>
            <p><em>Daily stock values</em></p>
            <div>
                <div id={classes[arrow]}></div>
                <span id={classes[percentage]}>{percentChange.toFixed(2)}%</span>
            </div>
        </div>
        <div className={classes.ResultsData}>
            <div className={classes.ResultsTop}>
                <span><strong>Open:</strong> {props.data['1. open']}</span>
                <span style={{marginTop: '5px'}}><strong>Close:</strong> {props.data['4. close']}</span>  
            </div>
            <div className={classes.ResultsMiddle}>
            <span><strong>High:</strong> {props.data['2. high']}</span>
                <span style={{marginTop: '5px'}}><strong>Low:</strong> {props.data['3. low']}</span>
            </div>
            <div className={classes.ResultsBottom}>
                <span><strong>Volume:</strong> {props.data['5. volume']}</span>
            </div>
            <div className={classes.arrowUp}></div>
        </div>
        <div style={{marginTop: '10px'}}><Button onClick={props.toggled}>Graphs</Button></div>
    </div>

    if (props.isToggled) {
        content = <Charts {...props} />
    }

    return (
        <div>
            {content}
        </div>
    );
}

export default results;