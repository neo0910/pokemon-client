import React, {FC} from 'react';
import styled from 'styled-components';

import {Button} from '../ui/StyledButton';
import {Flex} from '../ui/StyledFlex';
import {logout} from '../store/authSlice';
import {pokemonApi} from '../services/PokemonService';
import {useTypedDispatch} from '../hooks';
import AddPokemon from './AddPokemon';
import PokemonCard from './PokemonCard';

const Header = styled(Flex)`
    height: 80px;
    padding: 0 16px;
`;

const Body = styled(Flex)`
    padding: 0 16px;
`;

const Content: FC = () => {
    const dispatch = useTypedDispatch();

    const {data: pokemons} = pokemonApi.useFetchPokemonsQuery();

    return (
        <Flex column width="100%">
            <Header align="center" gap="0" justify="space-between" width="100%">
                <AddPokemon />
                <Button primary onClick={() => dispatch(logout())}>
                    Logout
                </Button>
            </Header>
            <Body>{pokemons && pokemons.map((p) => <PokemonCard key={p.id} pokemon={p} />)}</Body>
        </Flex>
    );
};

export default Content;
