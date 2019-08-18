import React from 'react';
import { TileLayer } from 'react-leaflet';

const weatherMap = (props) => {
    switch (props.map) {
        case 'temp':
            return <TileLayer
                    attribution='OpenWeatherMap'
                    url='https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=7daab8f96599547db07db51798b02e1d'/>;
        case 'wind':
            return <TileLayer
                    attribution='OpenWeatherMap'
                    url='https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=7daab8f96599547db07db51798b02e1d'/>;
        default:
            return <TileLayer
                    attribution='OpenWeatherMap'
                    url='https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=7daab8f96599547db07db51798b02e1d' />;
    }
}

export default weatherMap;