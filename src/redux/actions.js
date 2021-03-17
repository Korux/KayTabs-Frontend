export const USER_LOGIN = 'USER_LOGIN';
export const USER_REGISTER = 'USER_REGISTER';
export const USER_LOGOUT = 'USER_LOGOUT';

export function userLogin(creds){
    return { type : USER_LOGIN, creds };
}

export function userLogout(){
    return { type : USER_LOGOUT };
}

export function userRegister(creds){
    return { type : USER_REGISTER, creds };
}

