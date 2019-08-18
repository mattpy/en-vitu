import React, { Component } from 'react';
import classes from './News.css';
import axios from 'axios';

import Searchbar from '../../components/Searchbar/Searchbar';
import NewsItems from './NewsItems/NewsItems';

import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { newsSources } from './NewsAssets/NewsAssets';

import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

const API_KEY = '53f245afb071442997f459c01e4a9cab';

class News extends Component {
    state = {
        searchGroups: [
            {
                value: '',
                buttonTitle: 'Search',
                returnedArticles: [],
                buttonToggle: true,
                slideToggle: false,
                alreadySearched: false
            }
        ]
    }
    componentDidMount() {
        if (window.localStorage.getItem('news1')) {
            this.state.searchGroups.unshift({
                value: '',
                buttonTitle: window.localStorage.getItem('news1'),
                returnedArticles: [],
                buttonToggle: false,
                slideToggle: true,
                alreadySearched: true
            })
            this.getNews(0);
        }
    }

    updateButtonTitle = (title, index) => {
        let copiedState = { ...this.state };
        copiedState.searchGroups[index].buttonTitle = title;
        this.setState({ state: copiedState })
    }

    getNews = (index) => {
        if (!window.localStorage.getItem('news1') && this.state.searchGroups[index].buttonTitle !== 'Search') {
            window.localStorage.setItem('news1', this.state.searchGroups[index].buttonTitle);
        }
        let correctedString = this.state.searchGroups[index].value.split(' ').join('%20');
        if (!this.state.searchGroups[index].value.length && (this.state.searchGroups[index].buttonTitle === 'Search' || this.state.searchGroups[index].buttonTitle === 'Top Headlines')) {
            axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)
                .then(resp => {
                    let artForState = resp.data.articles.map(art => {
                        return art;
                    })
                    this.setState(prevState => ({
                        ...prevState,
                        searchGroups: [
                            ...prevState.searchGroups.map(grp => {
                                if (prevState.searchGroups.indexOf(grp) === index) {
                                    grp.returnedArticles = artForState;
                                }
                                return { ...grp };
                            })
                        ]
                    }));
                    if (!this.state.searchGroups[index].alreadySearched) {
                        let copiedState = [...this.state.searchGroups];
                        copiedState[index].alreadySearched = true;
                        copiedState.push({
                            value: '',
                            buttonTitle: 'Search',
                            returnedArticles: [],
                            buttonToggle: true,
                            slideToggle: false,
                            alreadySearched: false
                        })
                        this.setState({ searchGroups: copiedState });
                    }
                })
                .catch(err => console.log(err));
        }
        if (!this.state.searchGroups[index].value.length && (this.state.searchGroups[index].buttonTitle !== 'Search' && this.state.searchGroups[index].buttonTitle !== 'Top Headlines')) {
            axios.get(`https://newsapi.org/v2/top-headlines?sources=${newsSources[this.state.searchGroups[index].buttonTitle]}&apiKey=${API_KEY}`)
                .then(resp => {
                    let artForState = resp.data.articles.map(art => {
                        return art;
                    })
                    this.setState(prevState => ({
                        ...prevState,
                        searchGroups: [
                            ...prevState.searchGroups.map(grp => {
                                if (prevState.searchGroups.indexOf(grp) === index) {
                                    grp.returnedArticles = artForState;
                                }
                                return { ...grp };
                            })
                        ]
                    }));
                    if (!this.state.searchGroups[index].alreadySearched) {
                        let copiedState = [...this.state.searchGroups];
                        copiedState[index].alreadySearched = true;
                        copiedState.push({
                            value: '',
                            buttonTitle: 'Search',
                            returnedArticles: [],
                            buttonToggle: true,
                            slideToggle: false,
                            alreadySearched: false
                        })
                        this.setState({ searchGroups: copiedState });
                    }
                })
                .catch(err => console.log(err))
        }
        if (this.state.searchGroups[index].value.length && this.state.searchGroups[index].buttonTitle === 'Search') {
            axios.get(`https://newsapi.org/v2/everything?q=${correctedString}&sortBy=popularity&apiKey=${API_KEY}`)
                .then(resp => {
                    if (resp.data.articles.length === 0) {
                        alert('No articles found, please try again')
                    }
                    let artForState = resp.data.articles.map(art => {
                        return art;
                    })
                    this.setState(prevState => ({
                        ...prevState,
                        searchGroups: [
                            ...prevState.searchGroups.map(grp => {
                                if (prevState.searchGroups.indexOf(grp) === index) {
                                    grp.returnedArticles = artForState;
                                }
                                return { ...grp };
                            })
                        ]
                    }));
                    if (!this.state.searchGroups[index].alreadySearched) {
                        let copiedState = [...this.state.searchGroups];
                        copiedState[index].alreadySearched = true;
                        copiedState.push({
                            value: '',
                            buttonTitle: 'Search',
                            returnedArticles: [],
                            buttonToggle: true,
                            slideToggle: false,
                            alreadySearched: false
                        })
                        this.setState({ searchGroups: copiedState });
                    }
                })
                .catch(err => console.log(err));
        }
        if (this.state.searchGroups[index].value.length && this.state.searchGroups[index].buttonTitle === 'Top Headlines') {
            axios.get(`https://newsapi.org/v2/top-headlines?country=us&q=${correctedString}&apiKey=${API_KEY}`)
                .then(resp => {
                    if (resp.data.articles.length === 0) {
                        alert('No articles found, please try again')
                    }
                    let artForState = resp.data.articles.map(art => {
                        return art;
                    })
                    this.setState(prevState => ({
                        ...prevState,
                        searchGroups: [
                            ...prevState.searchGroups.map(grp => {
                                if (prevState.searchGroups.indexOf(grp) === index) {
                                    grp.returnedArticles = artForState;
                                }
                                return { ...grp };
                            })
                        ]
                    }));
                    if (!this.state.searchGroups[index].alreadySearched) {
                        let copiedState = [...this.state.searchGroups];
                        copiedState[index].alreadySearched = true;
                        copiedState.push({
                            value: '',
                            buttonTitle: 'Search',
                            returnedArticles: [],
                            buttonToggle: true,
                            slideToggle: false,
                            alreadySearched: false
                        })
                        this.setState({ searchGroups: copiedState });
                    }
                })
                .catch(err => console.log(err));
        }
        if (this.state.searchGroups[index].value.length && (this.state.searchGroups[index].buttonTitle !== 'Search' && this.state.searchGroups[index].buttonTitle !== 'Top Headlines')) {
            axios.get(`https://newsapi.org/v2/everything?sources=${newsSources[this.state.searchGroups[index].buttonTitle]}&q=${correctedString}&sortBy=popularity&apiKey=${API_KEY}`)
                .then(resp => {
                    if (resp.data.articles.length === 0) {
                        alert('No articles found, please try again')
                    }
                    let artForState = resp.data.articles.map(art => {
                        return art;
                    })
                    this.setState(prevState => ({
                        ...prevState,
                        searchGroups: [
                            ...prevState.searchGroups.map(grp => {
                                if (prevState.searchGroups.indexOf(grp) === index) {
                                    grp.returnedArticles = artForState;
                                }
                                return { ...grp };
                            })
                        ]
                    }));
                    if (!this.state.searchGroups[index].alreadySearched) {
                        let copiedState = [...this.state.searchGroups];
                        copiedState[index].alreadySearched = true;
                        copiedState.push({
                            value: '',
                            buttonTitle: 'Search',
                            returnedArticles: [],
                            buttonToggle: true,
                            slideToggle: false,
                            alreadySearched: false
                        })
                        this.setState({ searchGroups: copiedState });
                    }
                })
                .catch(err => console.log(err));
        }
        this.setState({ value: '' });
    }

    searchbarChangeHandler = (event, index) => {
        event.persist();
        this.setState(prevState => ({
            ...prevState,
            searchGroups: [
                ...prevState.searchGroups.map(grp => {
                    if (prevState.searchGroups.indexOf(grp) === index) {
                        grp.value = event.target.value;
                    }
                    return { ...grp };
                })
            ]
        }))
    }

    kpHandler = (event, index) => {
        if (event.key === 'Enter') {
            this.getNews(index)
        }
    }

    getState = () => {
        console.log(this.state);
        console.log(window.localStorage.getItem('window1'))
    }

    slideToggle = (index) => {
        this.setState(prevState => ({
            ...prevState,
            searchGroups: [
                ...prevState.searchGroups.map(grp => {
                    if (prevState.searchGroups.indexOf(grp) === index) {
                        grp.slideToggle = !grp.slideToggle;
                    }
                    return { ...grp };
                })
            ]
        }))
    }

    deleteContainer = (index) => {
        if (this.state.searchGroups.length > 1) {
            let copiedList = [...this.state.searchGroups];
            copiedList.splice(index, 1);
            this.setState(prevState => ({
                ...prevState,
                searchGroups: copiedList
            }))
        }
    }

    changeButtonColor = (index) => {
        this.setState(prevState => ({
            ...prevState,
            searchGroups: [
                ...prevState.searchGroups.map(grp => {
                    if (prevState.searchGroups.indexOf(grp) === index) {
                        grp.buttonToggle = !grp.buttonToggle;
                    }
                    return { ...grp };
                })
            ]
        })
        )
    }

    render() {
        let newsContent = this.state.searchGroups.map((srchGrp, index) => {
            let whatClick = srchGrp.returnedArticles.length ? () => this.changeButtonColor(index) : () => {
                this.slideToggle(index)
                this.changeButtonColor(index)
            }
            let iconArray = [];
            for (let key in newsSources) {
                iconArray.push(
                    <Dropdown.Item
                        as='button'
                        onClick={() => this.updateButtonTitle(key)}
                        >
                        {key}
                    </Dropdown.Item>
                );
            }
            return (
                <div className={classes.NewsContainer} key={index}>
                    <div className={classes.ButtonSearchContainer}>
                        {
                            srchGrp.buttonToggle ?
                                <Fab
                                    onClick={whatClick}
                                    color="primary"
                                    size='medium'
                                    aria-label="Add"
                                    style={{
                                        backgroundColor: '#0066ff',
                                        outline: 'none',
                                        marginTop: '10px'
                                    }}
                                    className={classes.foo} >
                                    <AddIcon className={classes.foo} />
                                </Fab> :
                                <IconButton
                                    aria-label="Delete"
                                    className={classes.margin}
                                    style={{ outline: 'none' }} 
                                    onClick={() => this.deleteContainer(index)}>
                                    <DeleteIcon />
                                </IconButton>
                        }
                        {
                            srchGrp.slideToggle ? (
                                <React.Fragment>
                                    <Searchbar
                                        class='Input-text'
                                        className='test'
                                        size='40'
                                        change={(e) => this.searchbarChangeHandler(e, index)}
                                        placeholder='Enter news query'
                                        keypress={(e) => this.kpHandler(e, index)} />
                                    <Dropdown as={ButtonGroup} drop='down'>
                                        <Button
                                            variant='primary'
                                            onClick={() => this.getNews(index)}>
                                            {srchGrp.buttonTitle}
                                        </Button>
                                        <Dropdown.Toggle
                                            split
                                            variant="primary"
                                            id="dropdown-split-basic"
                                        />
                                        <Dropdown.Menu
                                            style={{
                                                position: 'absolute',
                                                willChange: 'transform',
                                                top: '0px', left: '0px',
                                                height: '260px',
                                                overflowY: 'scroll',
                                                transform: 'translate3d(0px, 38px, 0px)'
                                            }}>
                                            {Object.keys(newsSources).map(src => {
                                                return (
                                                    <Dropdown.Item
                                                        as='button'
                                                        onClick={() => this.updateButtonTitle(src, index)}
                                                        key={src}>
                                                        {src}
                                                    </Dropdown.Item>
                                                )
                                            })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </React.Fragment>)
                                : null
                        }
                    </div>
                    <div className={classes.MainContentContainer}>
                        <NewsItems {...srchGrp.returnedArticles} />
                        {(window.localStorage.getItem('news1') && this.state.searchGroups[index].alreadySearched) ?
                            <button
                                className={classes.foobaz}
                                onClick={() => window.localStorage.clear()}>Clear favorite
                        </button> : null}
                    </div>
                </div>
            );
        });

        return (
            <div className={classes.NewsItemRow}>
                {newsContent}
            </div>
        );
    }
}

export default News;