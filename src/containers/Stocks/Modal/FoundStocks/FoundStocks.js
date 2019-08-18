import React from 'react';
import classes from './FoundStocks.css';

const searchbarStocks = (props) => {
    return (
        <div 
            className={classes.SearchbarStocks}
            onClick={() => props.clicked(props.symbol)}>
            <span>{props.name}</span>
            <span><strong>{props.symbol}</strong></span>
        </div>
    );
}

export default searchbarStocks;