import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';

import {store} from './utils/redux/store'
import { Provider } from 'react-redux';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>  
  // </React.StrictMode>
);


reportWebVitals();
