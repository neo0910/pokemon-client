import React, {FC, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import {pokemonApi} from '../../services/PokemonService';

const Pokemon: FC = () => {
    const {id} = useParams();
    // (1)
    const {data: pokemons} = pokemonApi.useFetchPokemonsQuery(1);
    // (7)
    const {data: pokemon} = pokemonApi.useFetchPokemonByIdQuery(id as string, {skip: !id});
    // (9)
    // const [trigger, {data: pokemon}] = pokemonApi.useLazyFetchPokemonByIdQuery();
    // (10)
    // const {pokemon} = pokemonApi.useFetchPokemonsQuery(1, {
    //     selectFromResult: ({data}) => ({pokemon: data?.find((p) => p.id === +id!)}),
    // });

    console.log('pokemons', pokemons);

    // useEffect(() => {
    //     trigger(id as string);
    // }, []);

    return <pre>{JSON.stringify(pokemon)}</pre>;
};

export default Pokemon;
