import React from 'react';
import classes from './LoadingModal.css';
import Spinner from '../../../components/Spinner/Spinner';

const loadingModal = (props) => {
    return (
        <div className={classes.LoadingModalContainer}>
            <Spinner />
        </div>
    );
}

export default loadingModal;