import {createAsyncThunk, createSlice, SerializedError} from '@reduxjs/toolkit';

import {Nullable} from '../models/utils';
import {UserT} from '../models/User';
import AuthService from '../services/AuthService';

export type AuthStateT = {
    user: UserT;
    isAuth: boolean;
    loading: boolean;
    error: Nullable<SerializedError>;
};

const initialState: AuthStateT = {
    user: {} as UserT,
    isAuth: false,
    loading: false,
    error: null,
};

const login = createAsyncThunk('auth/loginStatus', async (payload: {email: string; password: string}) => {
    const {data} = await AuthService.login(payload.email, payload.password);
    localStorage.setItem('token', data.accessToken);
    return data;
});

const registration = createAsyncThunk('auth/registrationStatus', async (payload: {email: string; password: string}) => {
    const {data} = await AuthService.registration(payload.email, payload.password);
    localStorage.setItem('token', data.accessToken);
    return data;
});

const logout = createAsyncThunk('auth/logoutStatus', async () => {
    await AuthService.logout();
    localStorage.removeItem('token');
});

const checkAuth = createAsyncThunk('auth/checkAuthStatus', async () => {
    const {data} = await AuthService.refresh();
    localStorage.setItem('token', data.accessToken);
    return data;
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        //
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isAuth = true;
            state.loading = false;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.error = action.error;
            state.loading = false;
        });
        builder.addCase(registration.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(registration.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isAuth = true;
            state.loading = false;
        });
        builder.addCase(registration.rejected, (state, action) => {
            state.error = action.error;
            state.loading = false;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.user = {} as UserT;
            state.isAuth = false;
        });
        builder.addCase(logout.rejected, (state, action) => {
            state.error = action.error;
        });
        builder.addCase(checkAuth.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isAuth = true;
        });
        builder.addCase(checkAuth.rejected, (state, action) => {
            state.error = action.error;
        });
    },
});

export {login, logout, registration, checkAuth};

export default authSlice.reducer;
