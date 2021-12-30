import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import {store} from './store';
import App from './App';
import GlobalStyle from './ui/globalStyle';
import Login from './pages/login';
import Pokedex from './pages/pokedex';
import PrivateRoute from './components/PrivateRoute';
import Registration from './pages/registration';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route
                            index
                            element={
                                <PrivateRoute>
                                    <Pokedex />
                                </PrivateRoute>
                            }
                        />

                        <Route path="login" element={<Login />} />
                        <Route path="registration" element={<Registration />} />

                        <Route
                            path="pokedex"
                            element={
                                <PrivateRoute>
                                    <Pokedex />
                                </PrivateRoute>
                            }
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
