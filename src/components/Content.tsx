import React, {FC, useEffect} from 'react';
import styled from 'styled-components';

import {Button} from '../ui/StyledButton';
import {fetchPokemons} from '../store/pokemonSlice';
import {Flex} from '../ui/StyledFlex';
import {logout} from '../store/authSlice';
import {useTypedDispatch, useTypedSelector} from '../hooks';
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

    const pokemons = useTypedSelector((s) => s.pokemons.pokemons);

    useEffect(() => {
        dispatch(fetchPokemons());
    }, [dispatch]);

    return (
        <Flex column width="100%">
            <Header align="center" gap="0" justify="space-between" width="100%">
                <AddPokemon />
                <Button primary onClick={() => dispatch(logout())}>
                    Logout
                </Button>
            </Header>
            <Body>
                {pokemons.map((p) => (
                    <PokemonCard key={p.id} pokemon={p} />
                ))}
            </Body>
        </Flex>
    );
};

export default Content;
