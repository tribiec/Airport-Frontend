import React from 'react';
import { Redirect } from 'react-router-dom';
import { useStateValue } from '../../../providers/ContextProvider';
import isTokenExpired from './isTokenExpired';

const CheckLogin = ({children}) => {
    const [context, dispatch] = useStateValue();
    if (!context.app.logged || localStorage.getItem('user') === null) {
        return <Redirect to='/login' />;
    } else {
        if (isTokenExpired()) {
            alert("Su sesion ha expirado por motivos de seguridad, por favor vuelva a ingresar al sistema");
            localStorage.removeItem('user');
            dispatch({ type: 'RESET_STATE' });
            return <Redirect to='/login' />;
        } else {
            return children;
        };
    };
};

export default CheckLogin;