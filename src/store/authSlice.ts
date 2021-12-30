import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Nullable} from '../models/utils';
import {UserT} from '../models/User';

export type AuthStateT = {
    currentUser: Nullable<UserT>;
};

const initialState: AuthStateT = {
    currentUser: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<Nullable<UserT>>) => {
            state.currentUser = action.payload;
        },
    },
});

export const {setCurrentUser} = authSlice.actions;

export default authSlice.reducer;
