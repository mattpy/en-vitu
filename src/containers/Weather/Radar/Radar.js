import React, { Component, Fragment } from 'react';
import classes from './Radar.css';
import { Map, TileLayer } from 'react-leaflet';

import RadarNavbar from '../../../components/Weather/Radar/RadarNavbar/RadarNavbar';
import WeatherMap from '../../../components/Weather/Radar/RadarTilesets/WeatherMap';

class Radar extends Component {
    state = {
        lat: 0,
        lng: 0,
        zoom: 7,
        map: 'precip'
    }

    componentDidMount() {
        this.setState({ lat: this.props.location[0], lng: this.props.location[1] });
    }

    navbarClickHandler = (weatherType) => {
        this.setState({ map: weatherType });
    }
    
    render() {
        const position = [this.state.lat, this.state.lng];
        return (
            <Fragment>
                <Map 
                    onClick={this.clickHandler}
                    className={classes.map} 
                    center={position} 
                    zoom={this.state.zoom}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <WeatherMap map={this.state.map} />
                    {/* <Marker position={position}>
                        <Popup>
                            You are here. Roll Tide!
                        </Popup>
                    </Marker> */}
                </Map>
                <RadarNavbar navbarClicked={(eve) => this.navbarClickHandler(eve)} />
            </Fragment>
        );
    }
}

export default Radar;