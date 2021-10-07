import {TypeT} from './Type';

export type PokemonT = {
    description: string;
    height: number;
    id: number;
    name: string;
    number: number;
    type: TypeT[];
    weight: number;
};

export type PokemonDto = {
    description: string;
    height: number;
    name: string;
    number: number;
    type_id: number | string;
    weight: number;
};
