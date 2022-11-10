
// IMPORTS
import {useReducer} from 'react';

import {
    SHUFFLE_AUTHORS
} from './actions';

const shuffle = require('lodash.shuffle');


// REDUCER LOGIC
export function reducer(state, action){
    switch (action.type){
        case SHUFFLE_AUTHORS:
            return {
                ...state,
                siteAuthors: shuffle(state.siteAuthors)
            };
        default:
            return {...state};
    }
}


// IMPLEMENT REDUCER VIA REACT
export function useThisReducer(initialState){
    return useReducer(reducer, initialState);
}