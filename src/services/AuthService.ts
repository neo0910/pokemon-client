import {AxiosResponse} from 'axios';

import {AuthResponseT} from '../models/response';
import api, {refreshRequest} from '../api';

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponseT>> {
        return api.post<AuthResponseT>('/auth/login', {email, password});
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponseT>> {
        return api.post<AuthResponseT>('/auth/registration', {email, password});
    }

    static async logout(): Promise<void> {
        return api.post('/auth/logout');
    }

    static async refresh(): Promise<AxiosResponse<AuthResponseT>> {
        return refreshRequest();
    }
}
