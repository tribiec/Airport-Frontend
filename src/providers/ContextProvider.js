import React, { createContext, useReducer, useContext } from 'react';
import { userState, appState } from '../app/context/initialStates';

export const Context = new createContext();

export const ContextProvider = ({ children }) => {
    const reducer = (state, action) => {
        switch (action.type) {
            case 'SET_AEROPUERTOS':
                return { ...state, app: { ...state.app, aeropuertos: (action.aeropuertos || []) } };
            case 'SET_AGENCIAS':
                return { ...state, app: { ...state.app, agencias: (action.agencias || []) } };
            case 'SET_AEROPUERTO':
                return { ...state, app: { ...state.app, selector_aeropuerto: (action.aeropuerto || 0), agencias: [], selector_agencia: null} };
            case 'SET_AGENCIA':
                return { ...state, app: { ...state.app, selector_agencia: (action.agencia || null) } };
            case 'SET_LOGGED':
                return { user: action.user, app: { ...state.app, logged: true } };
            case 'RESET_STATE':
                return { user: userState(), app: appState() };
            case 'SET_VUELOS':
                return { ...state, app: { ...state.app, vuelos: action.vuelos } };
            case 'SET_DATA':
                return { ...state, app: { ...state.app, ...action.data } };
            case 'SET_HOME':
                return { ...state, app: { ...state.app, selector_agencia: null } };
            case 'SET_MAP':
                return { ...state, app: { ...state.app, map: true}};
            default:
                console.error("Reducer, type not found...", action.type);
                break;
        };
    };
    const [context, dispatch] = useReducer(reducer, { user: userState(), app: appState() });
    return (
        <Context.Provider value={[context, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const useStateValue = () => (useContext(Context))