import React from 'react';
import classes from './Modal.css';
import FoundStocks from './FoundStocks/FoundStocks';

let stocksData = require('../stocks.json');

const modal = (props) => {
    let filteredStocks = stocksData.filter(stock => {
        return (
            stock.Symbol.toLowerCase().indexOf(props.name) !== -1 ||
            stock.Name.toLowerCase().indexOf(props.name) !== -1
            );
        })
        .splice(0, 4)
        .map(stock => {
            return <FoundStocks 
                name={stock.Name}
                symbol={stock.Symbol}
                key={stock.Name + Math.random()}
                clicked={(symbol) => props.clicked(symbol)} />
    });

    return (
        <div className={classes.ModalContainer}>
            {filteredStocks}
        </div>
    );
}

export default modal;