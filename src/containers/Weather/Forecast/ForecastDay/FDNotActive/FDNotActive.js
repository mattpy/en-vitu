import React from 'react';
import ReactSVG from 'react-svg';
import { getIcon, getMonth, getDay } from '../../Utility/HelperFunctions';
import classes from './FDNotActive.css';

const chosenForecast = (props) => {
    let [dayTxt, month, dayNum] = new Date(props.data.time * 1000).toString().split(' ', 4);

    return (
        <div className={classes.ShowMobile}
            onClick={() => props.clicked(props.id)}>
            <div className={classes.bgDayTxt}>
                <p>{getDay(dayTxt)}, {getMonth(month)} {dayNum}</p>
                <div className={classes.bgSVG}>
                    <ReactSVG
                        src={getIcon(props.data.icon)}
                        beforeInjection={svg => {
                            svg.setAttribute('style', 'width: 50px')
                        }}
                        fallback={() => <span>Error!</span>}
                        loading={() => <span>Loading</span>} />
                </div>
            </div>
        </div>
    );
};

export default chosenForecast;