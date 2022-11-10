
// IMPORTS
import React, {createContext, useContext} from 'react';
import {useThisReducer} from './reducers';



// SET UP CONTEXT + PROVIDER

const StoreContext = createContext();
const {Provider} = StoreContext;


export function StoreProvider({value = [], ...props}){
    const [state, dispatch] = useThisReducer({
        // initial state goes here
    });
    
    return (
        <Provider value={[state, dispatch]}>
            {props.children}
        </Provider>
    );
}


export const useStoreContext = () => useContext(StoreContext);