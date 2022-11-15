
// IMPORTS
import React, {createContext, useContext} from 'react';
import {useThisReducer} from './reducers';



// SET UP CONTEXT + PROVIDER

const StoreContext = createContext();
const {Provider} = StoreContext;


export function StoreProvider({value = [], ...props}){
    const initialState = {
        navActivePage: 'Posts',
        filterState: [
            {
                group: 'animal type',
                elements: [
                    {
                        name: 'dog',
                        checked: true
                    },
                    {
                        name: 'cat',
                        checked: true
                    },
                    {
                        name: 'fish',
                        checked: true
                    },
                    {
                        name: 'bird',
                        checked: true
                    },
                    {
                        name: 'rabbit / hamster',
                        checked: true
                    }
                ]
            },
            {
                group: 'category',
                elements: [
                    {
                        name: 'food',
                        checked: true
                    },
                    {
                        name: 'toys',
                        checked: true
                    },
                    {
                        name: 'furniture',
                        checked: true
                    },
                    {
                        name: 'cleaning products',
                        checked: true
                    },
                    {
                        name: 'outdoor',
                        checked: true
                    }
                ]
            },
            {
                group: 'condition',
                elements: [
                    {
                        name: 'new',
                        checked: true
                    },
                    {
                        name: 'like new',
                        checked: true
                    },
                    {
                        name: 'okay',
                        checked: true
                    },
                    {
                        name: 'bad',
                        checked: true
                    },
                    {
                        name: 'ugly',
                        checked: true
                    }
                ]
            },
            {
                group: 'borough',
                elements: [
                    {
                        name: 'manhattan',
                        checked: true
                    },
                    {
                        name: 'brooklyn',
                        checked: true
                    },
                    {
                        name: 'queens',
                        checked: true
                    },
                    {
                        name: 'staten island',
                        checked: true
                    },
                    {
                        name: 'the bronx',
                        checked: true
                    }
                ]
            }
        ]
    };


    const [state, dispatch] = useThisReducer(initialState);
    
    return (
        <Provider value={[state, dispatch]}>
            {props.children}
        </Provider>
    );
}


export const useStoreContext = () => useContext(StoreContext);