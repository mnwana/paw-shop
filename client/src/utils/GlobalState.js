
import React, {createContext, useContext} from 'react';
import {useThisReducer} from './reducers';


const StoreContext = createContext();
const {Provider} = StoreContext;


export function StoreProvider({value = [], ...props}){
    const [state, dispatch] = useThisReducer({
        // initial state values go here
    });
    
    return (
        <Provider value={[state, dispatch]}>
            {props.children}
        </Provider>
    );
}

export const useStoreContext = () => useContext(StoreContext);