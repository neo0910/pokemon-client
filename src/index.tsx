import React, {createContext} from 'react';
import ReactDOM from 'react-dom';

import {AuthStore, PokemonsStore, TypesStore} from './store/store';
import App from './App';
import GlobalStyle from './ui/globalStyle';

type StoreT = {
    authStore: AuthStore;
    pokemonStore: PokemonsStore;
    typesStore: TypesStore;
};

const stores = {
    authStore: new AuthStore(),
    pokemonStore: new PokemonsStore(),
    typesStore: new TypesStore(),
};

export const Context = createContext<StoreT>(stores);

ReactDOM.render(
    <React.StrictMode>
        <Context.Provider value={stores}>
            <GlobalStyle />
            <App />
        </Context.Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
