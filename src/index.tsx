import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import {store} from './store';
import App from './App';
import GlobalStyle from './ui/globalStyle';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <GlobalStyle />
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
