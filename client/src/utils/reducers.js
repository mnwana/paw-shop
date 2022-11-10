
// IMPORTS
import {useReducer} from 'react';


// REDUCER LOGIC
export function reducer(state, action){
    switch (action.type){
        default:
            return {...state};
    }
}


// IMPLEMENT REDUCER VIA REACT
export function useThisReducer(initialState){
    return useReducer(reducer, initialState);
}