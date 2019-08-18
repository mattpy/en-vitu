import React from 'react';
import classes from './Charts.css';
import {
    BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import Button from '@material-ui/core/Button';

const charts = (props) => {
    const data = [...props.historicalData]

    return (
        <div className={classes.ChartsContainer}>
            <div>
                <h4>{props.symbol}</h4>
                <BarChart
                    width={400}
                    height={300}
                    data={data}
                    margin={{
                        top: 5, right: 25, left: -15, bottom: 5,
                    }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="4. close" />
                    <YAxis />
                    <Tooltip />
                    <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '30px' }} />
                    <ReferenceLine y={0} stroke="#000" />
                    <Brush dataKey="name" height={30} stroke="#8884d8" />
                    <Bar name={'Open'} dataKey="1. open" fill="#8884d8" />
                    <Bar name={'Close'} dataKey="4. close" fill="#82ca9d" />
                </BarChart>
            </div>
            <div className={classes.Switch}>
            <Button onClick={props.toggled} label="Data">Data</Button>
            </div>
        </div>
    );
}

export default charts;