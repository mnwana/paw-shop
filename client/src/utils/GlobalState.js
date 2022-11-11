
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
        ]
    });
    
    return (
        <Provider value={[state, dispatch]}>
            {props.children}
        </Provider>
    );
}


export const useStoreContext = () => useContext(StoreContext);