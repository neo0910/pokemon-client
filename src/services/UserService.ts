import {AxiosResponse} from 'axios';

import api from '../api';
import {UserT} from '../models/User';

export default class UserService {
    static async fetchUsers(): Promise<AxiosResponse<UserT[]>> {
        return api.get<UserT[]>('/users');
    }
}
