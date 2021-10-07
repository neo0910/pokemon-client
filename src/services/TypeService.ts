import {AxiosResponse} from 'axios';

import {TypeT} from '../models/Type';
import api from '../api';

export default class TypeService {
    static async fetchTypes(): Promise<AxiosResponse<TypeT[]>> {
        return api.get<TypeT[]>('/types');
    }
}
