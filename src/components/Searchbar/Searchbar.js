import React from 'react';
import classes from './Searchbar.css';

const searchbar = (props) => {
    return (
        <div className={classes.Searchbar}>
            <input 
                className={classes[props.class]}
                value={props.value}
                type='text'
                size={props.size}
                placeholder={props.placeholder}
                onChange={props.change}
                onKeyDown={(e) => props.keypress(e)}
                 />
        </div>
    );
}

export default searchbar;