import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {UserT} from '../models/User';

export type AuthStateT = {
    user: UserT;
    isAuth: boolean;
};

const initialState: AuthStateT = {
    user: {} as UserT,
    isAuth: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserT>) => {
            state.user = action.payload;
        },
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
    },
});

export const {setUser, setIsAuth} = authSlice.actions;

export default authSlice.reducer;
