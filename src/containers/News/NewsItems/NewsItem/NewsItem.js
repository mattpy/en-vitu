import React from 'react';
import classes from './NewsItem.css';

const newsItem = (props) => {
    const getNews = (url) => {
        window.open(url);
    }

    let description = props.description ? (props.description.substring(0, 100) + '...') : null;

    return (
        <div className={classes.newsItemContainer} onClick={() => getNews(props.url)} >
            <div className={classes.newsItem}>
                <div className={classes.newsTitle}>
                    <strong>{props.title}</strong>
                </div>
                <div className={classes.newsDescription}>
                    {description}
                </div>
                <div className={classes.SourceandTime}>
                    <div style={{ fontSize: '0.8em' }}>
                        {props.source.name} &nbsp;| 
                    </div>
                    <div style={{ fontSize: '0.8em' }}>
                        &nbsp; {props.publishedAt.split('T', 1)}
                    </div>
                </div>
            </div>
            <div className={classes.newsImg}>
                <img height='auto' width='170' src={props.urlToImage} alt='Img' />
            </div>
        </div>
    );
}

export default newsItem;