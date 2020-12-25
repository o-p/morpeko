import { createElement } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux';

import App from './App';
import reducers from './reducers/index.ts';
import reportWebVitals from './reportWebVitals';

import "./app.scss";

const store = createStore(reducers);

render(
  createElement(Provider, { store }, createElement(App)),
  document.getElementById('app-wrapper')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
