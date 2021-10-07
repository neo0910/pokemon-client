import {makeAutoObservable} from 'mobx';

import {PokemonDto, PokemonT} from '../models/Pokemon';
import {TypeT} from '../models/Type';
import {UserT} from '../models/User';
import AuthService from '../services/AuthService';
import PokemonService from '../services/PokemonService';
import TypeService from '../services/TypeService';

export class PokemonsStore {
    loading = false;
    pokemons = [] as PokemonT[];

    constructor() {
        makeAutoObservable(this);
    }

    setLoading(loading: boolean) {
        this.loading = loading;
    }

    setPokemons(pokemons: PokemonT[]) {
        this.pokemons = pokemons;
    }

    async getPokemons() {
        try {
            const {data} = await PokemonService.fetchPokemons();
            this.setPokemons(data);
        } catch (err) {
            console.dir(err);
        } finally {
            this.setLoading(false);
        }
    }

    async createPokemon(pokemon: PokemonDto) {
        try {
            const {data} = await PokemonService.createPokemon(pokemon);
            this.setPokemons([...this.pokemons, data]);
        } catch (err) {
            console.dir(err);
        }
    }
}

export class TypesStore {
    loading = false;
    types = [] as TypeT[];

    constructor() {
        makeAutoObservable(this);
    }

    setLoading(loading: boolean) {
        this.loading = loading;
    }

    setTypes(types: TypeT[]) {
        this.types = types;
    }

    async getTypes() {
        try {
            const {data} = await TypeService.fetchTypes();
            this.setTypes(data);
        } catch (err) {
            console.dir(err);
        } finally {
            this.setLoading(false);
        }
    }
}

export class AuthStore {
    user = {} as UserT;
    isAuth = false;
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(auth: boolean) {
        this.isAuth = auth;
    }

    setLoading(loading: boolean) {
        this.loading = loading;
    }

    setUser(user: UserT) {
        this.user = user;
    }

    async login(email: string, password: string) {
        try {
            const {data} = await AuthService.login(email, password);
            localStorage.setItem('token', data.accessToken);
            this.setAuth(true);
            this.setUser(data.user);
        } catch (err) {
            console.dir(err);
        }
    }

    async registration(email: string, password: string) {
        try {
            const {data} = await AuthService.registration(email, password);
            localStorage.setItem('token', data.accessToken);
            this.setAuth(true);
            this.setUser(data.user);
        } catch (err) {
            console.dir(err);
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as UserT);
        } catch (err) {
            console.dir(err);
        }
    }

    async checkAuth() {
        try {
            const {data} = await AuthService.refresh();
            localStorage.setItem('token', data.accessToken);
            this.setAuth(true);
            this.setUser(data.user);
        } catch (err) {
            console.dir(err);
        } finally {
            this.setLoading(false);
        }
    }
}
