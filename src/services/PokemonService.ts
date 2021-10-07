import {AxiosResponse} from 'axios';

import {PokemonDto, PokemonT} from '../models/Pokemon';
import api from '../api';

export default class PokemonService {
    static async fetchPokemons(): Promise<AxiosResponse<PokemonT[]>> {
        return api.get<PokemonT[]>('/pokemons');
    }

    static async createPokemon(pokemon: PokemonDto): Promise<AxiosResponse<PokemonT>> {
        return api.post<PokemonT>('/pokemons', {...pokemon, type_id: [parseInt(pokemon.type_id as string, 10)]});
    }
}
