
// IMPORTS
import React, {createContext, useContext} from 'react';
import {useThisReducer} from './reducers';



// SET UP CONTEXT + PROVIDER

const StoreContext = createContext();
const {Provider} = StoreContext;


export function StoreProvider({value = [], ...props}){
    const initialState = {
        activePage: 'Posts',
        siteAuthors: [
            {
                name: 'Noah Becker',
                link: 'https://noah35becker.github.io/portfolio/'
            },
            {
                name: 'Michael Choi',
                link: 'https://github.com/jchoi10?tab=repositories'
            },
            {
                name: 'Marielle Nwana',
                link: 'https://www.mariellenwana.com'
            },
            {
                name: 'Claudia Yile',
                link: 'https://market.zora.co/cybele'
            }
        ],
        filterState: [
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