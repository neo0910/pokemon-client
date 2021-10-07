import {UserT} from '../User';

export type AuthResponseT = {
    accessToken: string;
    refreshToken: string;
    user: UserT;
};
