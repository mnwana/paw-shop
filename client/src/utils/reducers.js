
// IMPORTS
import {useReducer} from 'react';

import {
    SHUFFLE_AUTHORS,
    FILTER_TOGGLE_ONE,
    FILTER_SELECT_ALL,
    FILTER_SELECT_NONE
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
        case FILTER_TOGGLE_ONE:
            function filterToggleOne(){
                const newFilterState = [...state.filterState];
                const group = newFilterState.find(({group}) => group === action.group);
                const element = group.elements.find(({name}) => name === action.element);
                element.checked = action.newCheckedState;

                return {
                    ...state,
                    filterState: newFilterState
                };
            }
            return filterToggleOne();
        case FILTER_SELECT_ALL:
            function filterSelectAll(){
                const newFilterState = [...state.filterState];
                const group = newFilterState.find(({group}) => group === action.group);
                for (const element of group.elements)
                    element.checked = true;
                
                return {
                    ...state,
                    filterState: newFilterState
                };
            }
            return filterSelectAll();
        case FILTER_SELECT_NONE:
            function filterSelectNone(){
                const newFilterState = [...state.filterState];
                const group = newFilterState.find(({group}) => group === action.group);
                for (const element of group.elements)
                    element.checked = false;
                
                return {
                    ...state,
                    filterState: newFilterState
                };
            }
            return filterSelectNone();
        default:
            return {...state};
    }
}


// IMPLEMENT REDUCER VIA REACT
export function useThisReducer(initialState){
    return useReducer(reducer, initialState);
}