import React from 'react';

import {pokemonApi} from '../../services/PokemonService';
import PokemonCard from '../../components/PokemonCard';

const Pokedex = () => {
    const {data: pokemons} = pokemonApi.useFetchPokemonsQuery();

    return <>{pokemons && pokemons.map((p) => <PokemonCard key={p.id} pokemon={p} />)}</>;
};

export default Pokedex;
