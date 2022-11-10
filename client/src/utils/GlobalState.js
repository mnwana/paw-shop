
// IMPORTS
import React, {createContext, useContext} from 'react';
import {useThisReducer} from './reducers';



// SET UP CONTEXT + PROVIDER

const StoreContext = createContext();
const {Provider} = StoreContext;


export function StoreProvider({value = [], ...props}){
    const [state, dispatch] = useThisReducer({
        siteAuthors: [
            {
                name: 'Noah Becker',
                github: 'noah35becker'
            },
            {
                name: 'Michael Choi',
                github: 'jchoi10'
            },
            {
                name: 'Marielle Nwana',
                github: 'mnwana'
            },
            {
                name: 'Claudia Yile',
                github: 'claudiayile'
            }
        ]
    });
    
    return (
        <Provider value={[state, dispatch]}>
            {props.children}
        </Provider>
    );
}


export const useStoreContext = () => useContext(StoreContext);