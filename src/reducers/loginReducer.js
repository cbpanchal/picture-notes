import * as a from '../constants/actionTypes';

const initialState = {
    user: {},
    isAuthUser: false,
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case a.LOGIN:
           return {
                ...state,
                user: payload || {},
                isAuthUser: !!payload
           };
        case a.SIGNUP:
           return {
                ...state,
           };
        default:
            return state;
    }
}