import React, {useEffect, useState} from 'react';

import {pokemonApi} from '../../services/PokemonService';
import PokemonCard from '../../components/PokemonCard';
import {Button} from '../../ui/StyledButton';

const Pokedex = () => {
    const [limit, setLimit] = useState(1);
    // (10)
    const {data: pokemons, error, isFetching, refetch} = pokemonApi.useFetchPokemonsQuery(limit);

    // (1)
    // console.log('limit :>> ', limit);
    // (2)
    // console.log('isLoading', isLoading);

    useEffect(() => {
        setTimeout(() => refetch(), 2000);
    }, []);

    return (
        <>
            <Button onClick={() => setLimit(limit - 1)}>Descrease limit</Button>
            <Button onClick={() => setLimit(limit + 1)}>Increase limit</Button>
            {isFetching && <h1>Loading...</h1>}
            {error && <h1>Error on loading</h1>}
            {pokemons && pokemons.map((p) => <PokemonCard key={p.id} pokemon={p} />)}
            <Pokedex2 />
        </>
    );
};

export default Pokedex;

// (1) (4)
const Pokedex2 = () => {
    const [limit, setLimit] = useState(1);
    const {data: pokemons, error, isLoading} = pokemonApi.useFetchPokemonsQuery(limit);

    return (
        <div style={{width: '100%', display: 'flex'}}>
            <Button onClick={() => setLimit(limit - 1)}>Descrease limit</Button>
            <Button onClick={() => setLimit(limit + 1)}>Increase limit</Button>
            {isLoading && <h1>Loading...</h1>}
            {error && <h1>Error on loading</h1>}
            {pokemons && pokemons.map((p) => <PokemonCard key={p.id} pokemon={p} />)}
        </div>
    );
};
