import React, {FC, memo} from 'react';
import styled from 'styled-components';

import {Flex} from '../ui/StyledFlex';
import {PokemonT} from '../models/Pokemon';
import {StyledLink} from '../ui/StyledLink';
import {TypeT} from '../models/Type';

const PokemonCardWrapper = styled.div`
    border: 1px solid transparent;
    border-radius: 4px;
    padding: 8px;
    transition: border-color 0.25s;

    figure {
        margin: 16px;
        padding-top: 200px;
        position: relative;
        width: 200px;
    }

    img {
        position: absolute;
        top: 0;
        width: 100%;
    }

    &:hover {
        border-color: rgba(0, 0, 0, 0.1);
    }
`;

const PokemonCardDescription = styled(Flex)`
    margin-bottom: 8px;
`;

const PokemonType = styled.div<{background?: string; color?: string}>`
    border-radius: 4px;
    padding: 4px;

    background: ${({background}) => background || '#fff'};
    color: ${({color}) => color || '#000'};
`;

const pokemonTypeColors = (t: TypeT) => {
    switch (t.name) {
        case 'Grass':
            return {background: 'green', color: '#fff'};
        case 'Poison':
            return {background: 'violet', color: '#fff'};
        case 'Rock':
            return {background: 'brown', color: '#fff'};
        default:
            return {};
    }
};

const PokemonCard: FC<{pokemon: PokemonT}> = ({pokemon}) => (
    <PokemonCardWrapper>
        <StyledLink to={pokemon.id.toString()}>
            <figure>
                <img
                    alt={pokemon.name}
                    loading="lazy"
                    src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png"
                />
                <figcaption>{`${pokemon.number}. ${pokemon.name}`}</figcaption>
            </figure>
        </StyledLink>
        <PokemonCardDescription>
            <span>Height: {pokemon.height} m</span>
            <span>Weight: {pokemon.weight} kg</span>
        </PokemonCardDescription>
        <Flex justify="center">
            {pokemon.type.map((t) => (
                <PokemonType key={t.id} {...pokemonTypeColors(t)}>
                    {t.name}
                </PokemonType>
            ))}
        </Flex>
    </PokemonCardWrapper>
);

export default memo(PokemonCard);
