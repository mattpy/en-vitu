import React, { Component, Fragment } from 'react';
import ReactSVG from 'react-svg';
import { getIcon, getMonth, getDay } from '../Utility/HelperFunctions';

import FDActive from './FDActive/FDActive';
import FDNotActive from './FDNotActive/FDNotActive';
import classes from './ForecastDay.css';

class ForecastDay extends Component {
    render() {
        let [dayTxt, month, dayNum] = new Date(this.props.data.time * 1000).toString().split(' ', 4);
        let mobile = (
            <FDNotActive
                {...this.props} />
            );
        if (this.props.toggled) {
            mobile = <FDActive {...this.props} />
        }
        
        return (
            <Fragment>
                {mobile}
                <div 
                    className={classes.ShowDesktop}
                    onClick={() => this.props.clicked(this.props.id)}>
                    <div className={classes.smDayTxt}>
                        <p>{getDay(dayTxt)}</p>
                        <p>{getMonth(month)} {dayNum}</p>
                        <div>
                        <ReactSVG 
                            src={getIcon(this.props.data.icon)}
                            beforeInjection={svg => {
                                svg.setAttribute('style', 'width: 50px')
                            }}
                            fallback={() => <span>Error!</span>}
                            loading={() => <span>Loading</span>} />
                        </div>                        
                    </div>                    
                </div>
            </Fragment>
        );
    }
};

export default ForecastDay;