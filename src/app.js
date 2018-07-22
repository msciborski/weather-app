import './styles/styles.scss';
import 'normalize.css';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import WeatherApp from './components/WeatherApp';

const root = document.getElementById('root');

ReactDOM.render(<WeatherApp />, root);
