import React from 'react';
import classes from './Button.css';

const button = (props) => (
    <button 
        disabled={!props.isActive}
        className={classes[props.class]} 
        onClick={props.clicked}>{props.children}
    </button>
);

export default button;