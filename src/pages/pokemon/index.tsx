import React, {FC} from 'react';
import {useParams} from 'react-router-dom';

import {pokemonApi} from '../../services/PokemonService';

const Pokemon: FC = () => {
    const {id} = useParams();
    const {data: pokemon} = pokemonApi.useFetchPokemonByIdQuery(id as string);

    return <pre>{JSON.stringify(pokemon)}</pre>;
};

export default Pokemon;
