import {createAsyncThunk, createSlice, SerializedError} from '@reduxjs/toolkit';

import {Nullable} from '../models/utils';
import {TypeT} from '../models/Type';
import TypeService from '../services/TypeService';

export type TypesStateT = {
    loading: boolean;
    types: TypeT[];
    error: Nullable<SerializedError>;
};

const initialState: TypesStateT = {
    loading: false,
    types: [],
    error: null,
};

const fetchTypes = createAsyncThunk('types/fetchTypesStatus', async () => {
    const {data} = await TypeService.fetchTypes();
    return data;
});

export const typesSlice = createSlice({
    name: 'types',
    initialState,
    reducers: {
        //
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTypes.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchTypes.fulfilled, (state, action) => {
            state.types = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchTypes.rejected, (state, action) => {
            state.error = action.error;
            state.loading = false;
        });
    },
});

export {fetchTypes};

export default typesSlice.reducer;
