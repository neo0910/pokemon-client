import {TypeT} from './Type';

export type PokemonT = {
    readonly description: string;
    readonly height: number;
    readonly id: number;
    readonly name: string;
    readonly number: number;
    readonly type: TypeT[];
    readonly weight: number;
};

export type PokemonDto = {
    readonly description: string;
    readonly height: number;
    readonly name: string;
    readonly number: number;
    readonly type_id: Array<number | string>;
    readonly weight: number;
};
