import * as a from '../constants/actionTypes';

const initialState = {
    user: {},
    isAuthUser: false,
    isLoading: false
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case a.SET_USER:
            console.log(payload)
            return {
              ...state,
              user: payload || {},
              isAuthUser: !!payload            
            };
        case a.LOGIN: 
           return {
              ...state,
              user: payload ||   {},
              isAuthUser: !!payload,
              isLoading: false
           };
        case a.GOOGLE_LOGIN:
           return {
              ...state,
              isLoading: false
           };
        case a.SIGNUP:
           return {
              ...state,
              isLoading: false
           };
        case a.LOGOUT:
           return {
              ...state,
              isLoading: false
           };
        case a.SHOW_LOADER: 
            return {
              ...state,
              isLoading: true
            };
        default:
           return state;
    }
}