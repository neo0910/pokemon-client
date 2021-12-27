import {createApi} from '@reduxjs/toolkit/query/react';

import {baseQueryWithReauth} from '../api';
import {PokemonDto, PokemonT} from '../models/Pokemon';

export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Pokemon'],
    endpoints: (builder) => ({
        fetchPokemons: builder.query<PokemonT[], void>({
            query: () => '/pokemons',
            providesTags: ['Pokemon'],
        }),
        createPokemon: builder.mutation<PokemonT, PokemonDto>({
            query: (pokemon) => ({
                url: '/pokemons',
                method: 'POST',
                body: {...pokemon, type_id: pokemon.type_id.map((type) => parseInt(type as string, 10))},
            }),
            invalidatesTags: ['Pokemon'],
        }),
    }),
});
