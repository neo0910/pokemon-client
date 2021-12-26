import {createAsyncThunk, createSlice, SerializedError} from '@reduxjs/toolkit';

import {Nullable} from '../models/utils';
import {PokemonDto, PokemonT} from '../models/Pokemon';
import PokemonService from '../services/PokemonService';

export type PokemonsStateT = {
    loading: boolean;
    pokemons: PokemonT[];
    error: Nullable<SerializedError>;
};

const initialState: PokemonsStateT = {
    loading: false,
    pokemons: [],
    error: null,
};

const fetchPokemons = createAsyncThunk('pokemons/fetchPokemonsStatus', async () => {
    const {data} = await PokemonService.fetchPokemons();
    return data;
});

const createPokemon = createAsyncThunk('pokemons/createPokemonStatus', async (pokemon: PokemonDto) => {
    const {data} = await PokemonService.createPokemon(pokemon);
    return data;
});

export const pokemonsSlice = createSlice({
    name: 'pokemons',
    initialState,
    reducers: {
        //
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPokemons.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchPokemons.fulfilled, (state, action) => {
            state.pokemons = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchPokemons.rejected, (state, action) => {
            state.error = action.error;
            state.loading = false;
        });
        builder.addCase(createPokemon.fulfilled, (state, action) => {
            state.pokemons.push(action.payload);
        });
        builder.addCase(createPokemon.rejected, (state, action) => {
            state.error = action.error;
        });
    },
});

export {fetchPokemons, createPokemon};

export default pokemonsSlice.reducer;
