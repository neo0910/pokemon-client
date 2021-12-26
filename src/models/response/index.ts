import {UserT} from '../User';

export type AuthResponseT = {
    readonly accessToken: string;
    readonly refreshToken: string;
    readonly user: UserT;
};
