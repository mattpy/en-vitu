import React, { Component } from 'react';
import classes from './NewsItems.css';

import NewsItem from './NewsItem/NewsItem';

class NewsItems extends Component {
    render() {
        let content = [];
        if (Object.keys(this.props).length > 0) {
            for (let key in this.props) {
                content.push(<NewsItem id={key} key={key} {...this.props[key]} />);
            }
        }
        return (
            <div className={classes.NewsItems}>
                {content}
            </div>
        );
    }
}

export default NewsItems;