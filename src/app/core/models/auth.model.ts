export interface LoginForm {
    email: string,
    password: string
}

export interface LoginResponseSuccess {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
    jti: string;
}

export interface DecodedToken {
    authorities: string[],
    client_id: string,
    exp: number,
    jti: string,
    scope: string[],
    user_name: string
}

export interface RegisterForm {
    name: string,
    email: string,
    password: string,
    organisation: string
}

export enum AuthStorageKey {
    ACCESS_TOKEN = 'ACCESS_TOKEN',
    EXPIRES_IN = 'EXPIRES_IN',
    USER_EMAIL = 'USER_EMAIL'
}
