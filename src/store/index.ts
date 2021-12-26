import {configureStore} from '@reduxjs/toolkit';

import auth from './authSlice';
import pokemons from './pokemonSlice';
import types from './typesSlice';

export const store = configureStore({
    reducer: {auth, pokemons, types},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
