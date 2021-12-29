import React, {FC} from 'react';
import styled from 'styled-components';

import {authApi} from '../services/AuthService';
import {Button} from '../ui/StyledButton';
import {Flex} from '../ui/StyledFlex';
import {pokemonApi} from '../services/PokemonService';
import AddPokemon from './AddPokemon';
import AddType from './AddType';
import PokemonCard from './PokemonCard';

const Header = styled(Flex)`
    height: 80px;
    padding: 0 16px;
`;

const Body = styled(Flex)`
    padding: 0 16px;
`;

const Content: FC = () => {
    const {data: pokemons} = pokemonApi.useFetchPokemonsQuery();
    const [logout] = authApi.useLogoutMutation();

    return (
        <Flex column width="100%">
            <Header align="center" width="100%">
                <AddPokemon />
                <AddType />
                <Button primary onClick={() => logout()} style={{marginLeft: 'auto'}}>
                    Logout
                </Button>
            </Header>
            <Body>{pokemons && pokemons.map((p) => <PokemonCard key={p.id} pokemon={p} />)}</Body>
        </Flex>
    );
};

export default Content;
