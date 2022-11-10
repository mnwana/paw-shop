
// IMPORTS
import React, {createContext, useContext} from 'react';
import {useThisReducer} from './reducers';



// SET UP CONTEXT + PROVIDER

const StoreContext = createContext();
const {Provider} = StoreContext;


export function StoreProvider({value = [], ...props}){
    const [state, dispatch] = useThisReducer({
        siteAuthors: ['Noah Becker', 'Michael Choi', 'Marielle Nwana', 'Claudia Yile']
    });
    
    return (
        <Provider value={[state, dispatch]}>
            {props.children}
        </Provider>
    );
}


export const useStoreContext = () => useContext(StoreContext);