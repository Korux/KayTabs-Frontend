import { combineReducers } from 'redux';

import {
    SET_USER_DESCRIPTION,
    SET_USER_NAME,
    USER_LOGIN,
    USER_LOGOUT,
} from './actions.js';

const guestState = {
    loggedin : false, 
    name : "Guest", 
    image : "https://cdn0.iconfinder.com/data/icons/online-shop-equitment-gliph/32/line-2_on_going_logo-02-512.png",
}



function userReducer(state=guestState, action){
    switch(action.type){
        case USER_LOGIN:
            return {
                loggedin : true,
                name : action.creds.name,
                description : action.creds.description,
                image : "https://cdn0.iconfinder.com/data/icons/online-shop-equitment-gliph/32/line-2_on_going_logo-02-512.png",
                id : action.creds._id,
            };
        case USER_LOGOUT:
            return guestState;
        case SET_USER_NAME:
            return {
                ...state,
                name : action.name
            }
        case SET_USER_DESCRIPTION:
            return {
                ...state,
                description : action.desc
            }
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    user : userReducer
});
export default rootReducer;