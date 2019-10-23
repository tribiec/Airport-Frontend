import React, { useState, createContext } from 'react';
import {userState, appState} from '../app/context/initialStates';
export const Context = new createContext();

export const ContextProvider = ({ children }) => {
    const [context, dispatch] = useState({user: userState(), app: appState()});
    return (
        <Context.Provider value={[context, dispatch]}>
            {children}
        </Context.Provider>
    )
}