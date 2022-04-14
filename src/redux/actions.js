export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_DESCRIPTION = 'SET_USER_DESCRIPTION';

export function userLogin(creds){
    return { type : USER_LOGIN, creds };
}

export function userLogout(){
    return { type : USER_LOGOUT };
}

export function setUserName(name){
    return {type : SET_USER_NAME, name};
}

export function setUserDescription(desc){
    return {type : SET_USER_DESCRIPTION, desc};
}