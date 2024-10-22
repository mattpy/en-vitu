import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import 'leaflet/dist/leaflet.css'; // Get Leaflet CSS the React way
import 'leaflet/dist/leaflet.js'; // Get Leaflet CSS the React way
import App from './App';
import * as serviceWorker from './serviceWorker';

const app = (
    <Router>
        <App />
    </Router>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
