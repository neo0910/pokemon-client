import {configureStore} from '@reduxjs/toolkit';

import {authApi} from '../services/AuthService';
import {pokemonApi} from '../services/PokemonService';
import {userApi} from '../services/UserService';
import {typeApi} from '../services/TypeService';
import auth from './authSlice';

export const store = configureStore({
    reducer: {
        auth,
        [pokemonApi.reducerPath]: pokemonApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [typeApi.reducerPath]: typeApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            pokemonApi.middleware,
            userApi.middleware,
            typeApi.middleware,
            authApi.middleware
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
