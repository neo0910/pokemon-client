import {observer} from 'mobx-react-lite';
import React, {FC, useContext, useEffect} from 'react';
import styled from 'styled-components';

import {Button} from '../ui/StyledButton';
import {Context} from '..';
import {Flex} from '../ui/StyledFlex';
import AddPokemon from './AddPokemon';
import PokemonCard from './PokemonCard';

const Header = styled(Flex)`
    height: 80px;
    padding: 0 16px;
`;

const Body = styled(Flex)`
    padding: 0 16px;
`;

const Content: FC<any> = () => {
    const {authStore, pokemonStore} = useContext(Context);

    useEffect(() => {
        pokemonStore.getPokemons();
    }, [pokemonStore]);

    return (
        <Flex column width="100%">
            <Header align="center" gap="0" justify="space-between" width="100%">
                <AddPokemon />
                <Button primary onClick={() => authStore.logout()}>
                    Logout
                </Button>
            </Header>
            <Body>
                {pokemonStore.pokemons.map((p) => (
                    <PokemonCard key={p.id} pokemon={p} />
                ))}
            </Body>
        </Flex>
    );
};

export default observer(Content);
