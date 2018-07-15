import './styles/styles.scss';

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import WeatherApp from './components/WeatherApp';

const root = document.getElementById('root');

ReactDOM.render(<WeatherApp />, root);
