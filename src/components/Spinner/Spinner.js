import React, { Fragment } from 'react';
import classes from './Spinner.css';

const spinner = () => (
    <Fragment>
    <h3>Loading...</h3>
    <div className={classes.spinner}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </Fragment>
);

export default spinner;