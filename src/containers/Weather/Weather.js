import React, { Component } from 'react';
import axios from 'axios';
import classes from './Weather.css';

import CurrentConditions from './CurrentConditions/CurrentConditions';
import Forecast from './Forecast/Forecast';
import Radar from './Radar/Radar';
import Searchbar from '../../components/Searchbar/Searchbar';
import Spinner from '../../components/Spinner/Spinner';
import WeatherNavbar from '../../components/WeatherNavbar/WeatherNavbar';

const DS_KEY = '53d2ba527d49f587eb626387ec0ced14';
const MQ_KEY = 'i35CUZFlKRaFeYNiwxBrNtZ1SXoBjrmm';
// const GAPI_KEY = 'AIzaSyCe-q0jRBg7LFlTqhjKRkO1f-4atrUKnS4';

export default class Weather extends Component {
    state = {
        darkSkyCurrent: null,
        darkSkyForecast: null,
        radarLoc: null,
        searchVal: '',
        providedLoc: '',
        selector: true,
        loading: false,
        error: false,
        initial: true,
        isToggled: false,
        currentId: null,
        togCompData: null
    }

    componentDidMount() {
        if (window.localStorage.getItem('weather1')) {
            this.getGeocode(window.localStorage.getItem('weather1'))
        }
    }

    searchChangeHandler = (eve) => {
        this.setState({ searchVal: eve.target.value })
    }

    getGeocode = (location) => {
        this.setState({ loading: true, initial: false })
        if (!window.localStorage.getItem('weather1')) {
            window.localStorage.setItem('weather1', this.state.searchVal);
        }
        axios.get(`https://cors-anywhere.herokuapp.com/http://open.mapquestapi.com/geocoding/v1/address?key=${MQ_KEY}&location=${location}`)
            .then(resp => {
                let splitResp = resp.data.results[0].providedLocation.location.split(' ').map(word => {
                    if (word.length === 2) {return word.toUpperCase()}
                    return word.charAt(0).toUpperCase() + word.slice(1);
                }).join(' ');
                this.setState({ providedLoc: splitResp });
                let lat = resp.data.results[0].locations[0].displayLatLng.lat,
                    long = resp.data.results[0].locations[0].displayLatLng.lng;
                this.setState({ radarLoc: [lat, long]})
                this.queryWeatherData(lat, long)
            })
            .catch(err => {
                alert('Error: ', err);
            });
    }

    navClickHandler = (sel) => {
        this.setState({ selector: sel })
    }
    kpHandler = (event) => {
        if (event.key === 'Enter') {
            this.getGeocode(this.state.searchVal)
        }
    }

    clearLocal = () => {
        localStorage.clear();
    }

    isToggledHandler = (num) => {
        let toggle = true;
        if (num === this.state.currentId) {
            toggle = !this.state.isToggled;
        }
        this.setState(prevState => ({
            ...prevState,
            currentId: num,
            isToggled: toggle,
            togCompData: prevState.darkSkyForecast.daily[num],
            darkSkyForecast: {
                ...prevState.darkSkyForecast,
                daily: {
                    ...prevState.darkSkyForecast.daily,
                    [num]: {
                        ...prevState.darkSkyForecast.daily[num],
                        isToggled: !prevState.darkSkyForecast.daily[num].isToggled
                    }
                }
            }
        }))
    }

    queryWeatherData = (lat, long) => {
        axios(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${DS_KEY}/${lat},${long}`)
            .then(resp => {
                let daily = [];
                resp.data.daily.data.forEach((listArr, index) => {
                    listArr['id'] = index;
                    listArr['isToggled'] = false;
                    daily.push(listArr);
                });
                let statePreType = '';
                if (resp.data.currently.precipType) {
                    statePreType = resp.data.currently.precipType
                } 
                return this.setState({
                    darkSkyCurrent: {
                        dateTime: resp.data.currently.time,
                        humidity: resp.data.currently.humidity,
                        precipProb: resp.data.currently.precipProbability,
                        precipType: statePreType,
                        summary: resp.data.currently.summary,
                        temperature: resp.data.currently.temperature
                    },
                    darkSkyForecast: {
                        daily
                    },
                    loading: false
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        let weather = <Spinner />;
        if (this.state.darkSkyCurrent && this.state.darkSkyForecast) {
            weather = [
                <CurrentConditions
                    icon={this.state.darkSkyForecast.daily[0]['icon']} 
                    dateTime={this.state.darkSkyCurrent.dateTime}
                    humidity={this.state.darkSkyCurrent.humidity}
                    providedLoc={this.state.providedLoc}
                    precipProb={this.state.darkSkyForecast.daily[0].precipProbability}
                    precipType={this.state.darkSkyCurrent.precipType}
                    summary={this.state.darkSkyCurrent.summary}
                    temperature={this.state.darkSkyCurrent.temperature}
                    highTmp={this.state.darkSkyForecast.daily[0].temperatureHigh}
                    lowTmp={this.state.darkSkyForecast.daily[0].temperatureLow}
                    key={this.state.darkSkyCurrent.dateTime + 0} />,
                <Forecast 
                    forecast={this.state.darkSkyForecast} 
                    clicked={(id) => this.isToggledHandler(id)}
                    isToggled={this.state.isToggled}
                    focusData={this.state.togCompData}
                    key={'fKey'} />
            ];
        }
        let selector = <Radar location={this.state.radarLoc} />;
        if (this.state.initial && this.state.selector) {
            selector = null;
        } else if (this.state.selector) {
            selector = weather;
        }

        return (
            <div className={classes.WeatherContainer}>
                    <Searchbar 
                        class='Input-text' 
                        size='40'
                        value={this.state.searchVal}
                        placeholder='Enter a city, state to search...'
                        change={this.searchChangeHandler}
                        keypress={this.kpHandler} />
                    <WeatherNavbar 
                        forecastClicked={() => this.navClickHandler(true)}
                        radarClicked={() => this.navClickHandler(false)}
                        isActive={this.state.radarLoc} />
                    {selector}
                    {
                        window.localStorage.getItem('weather1') ? 
                        <button className={classes.foobaz} onClick={this.clearLocal}>Clear Favorite</button>
                        : null 
                    }
            </div>
        );
    }
}



// forecastDayClickHandler = (date) => {
//     let copiedForecast = {...this.state.forecast}
//     for (let key in copiedForecast) {
//         if (copiedForecast[key][0] === date) {
//             copiedForecast[key][2].isExpanded = !copiedForecast[key][2].isExpanded;
//         }
//     }
//     this.setState({forecast: copiedForecast});
// }

// const checkList = (array, name) => {
//     let contains = false;
//     for (let i = 0; i < array.length; i++) {
//         if (array[i][0] === name) {
//             contains = true;
//         }
//     }
//     return contains;
// }

// axios.get('http://api.openweathermap.org/data/2.5/forecast?id=4180439&APPID=' + API_KEY)
//             .then(resp => {
//                 console.log(resp);
//                 let daysWeather = [];
//                 resp.data.list.forEach(listArr => {
//                     let [date, time] = listArr.dt_txt.split(' ');
//                     if (!checkList(daysWeather, date)) {
//                         daysWeather.push([date, [{time: time, main: listArr.main, weather: listArr.weather}], {isExpanded: false}]);
//                     } else {
//                         daysWeather.forEach(ele => {
//                             if (ele[0] === date) {
//                                 ele[1].push({time: time, main: listArr.main, weather: listArr.weather});
//                             }
//                         })
//                     }
//                 });
//                 this.setState({forecast: daysWeather})
//             })
//             .catch(err => console.log(err));