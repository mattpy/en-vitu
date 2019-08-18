import React, { Component } from 'react';
import axios from 'axios';
import classes from './Stocks.css';

import LoadingModal from './LoadingModal/LoadingModal';
import Modal from './Modal/Modal';
import Results from './Results/Results';
import Searchbar from '../../components/Searchbar/Searchbar';

const API_KEY = 'EHM9B1MA82CNG5WO';

class Stocks extends Component {
    state = {
        value: '',
        storedSearches: [],
        storedResults: [],
        historicalPrices: [],
        loading: false
    }

    changeHandler = (event) => {
        this.setState({ value: event.target.value })
    }

    searchbarKPHandler = (event) => {
        return;
    }

    resultsClickHandler = (post) => {
        let copiedPosts = [...this.state.storedResults];
        let copiedHistory = [...this.state.historicalPrices];
        copiedPosts.splice(post, 1);
        copiedHistory.splice(post, 1);
        this.setState({ storedResults: copiedPosts, historicalPrices: copiedHistory });
    }

    clickHandler = (symbol) => {
        let spreadRes = [...this.state.storedSearches];
        spreadRes.push(symbol);
        this.setState({ value: '', storedSearches: spreadRes, loading: true });
        this.getStocks(symbol);
    }

    toggleHandler = (index) => {
        this.setState(prevState => ({
            ...prevState,
            storedResults: [
                ...prevState.storedResults.map(ele => {
                    if (prevState.storedResults.indexOf(ele) === index) {
                        ele.toggled = !ele.toggled;
                    }
                    return {...ele, ...ele.intraday, toggled: ele.toggled}
                })
            ]
        }));
    }

    getStocks(symbol) {
        if (!window.localStorage.getItem('weather1')) {
            window.localStorage.setItem('weather1', this.state.value);
        }
        let stocks = {};
        let copiedState = [...this.state.storedResults];
        let copiedHistory = [...this.state.historicalPrices];
        axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`)
            .then(resp => {
                let historyPrices = [];
                for (let stock in resp.data['Time Series (Daily)']) {
                    historyPrices.push(resp.data['Time Series (Daily)'][stock]);
                }
                stocks.intraday = resp;
                stocks.toggled = false;
                copiedState.unshift(stocks);
                if (resp.data.Note) {
                    alert('Maximum searches exceeded, please wait one minute') 
                    copiedState.shift();
                }
                copiedHistory.unshift(historyPrices);
                this.setState({ storedResults: copiedState, historicalPrices: copiedHistory, loading: false });
            })
            .catch(err => { console.log(err) });
    }

    render() {
        let searchModal = null;
        if (this.state.value.length) {
            searchModal = <Modal
                name={this.state.value}
                clicked={(stSymbol) => this.clickHandler(stSymbol)} />
        }
        let resultsArray = this.state.storedResults.filter(result => {
            return !result.intraday.data.Note;
        })
            .map((result, index) => {
            let lastItem = result.intraday.data['Time Series (Daily)'][Object.keys(result.intraday.data['Time Series (Daily)'])['0']];
            return <Results
                symbol={result.intraday.data["Meta Data"]['2. Symbol']}
                data={lastItem}
                historicalData={this.state.historicalPrices[index]}
                key={Math.random()}
                isToggled={result.toggled}
                toggled={() => this.toggleHandler(index)}
                clicked={() => this.resultsClickHandler(index)} />
        });

        let loading = this.state.loading ? <LoadingModal /> : null;

        return (
            <div className={classes.StocksContainer}>
                <Searchbar
                    class='Input-text'
                    size='40'
                    value={this.state.value}
                    placeholder='Enter a ticker symbol or company'
                    change={this.changeHandler}
                    keypress={this.searchbarKPHandler} />
                {searchModal}
                {loading}
                {resultsArray}
            </div>
        );
    }
}

export default Stocks;