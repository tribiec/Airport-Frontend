import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Context } from '../../../providers/ContextProvider';
import isTokenExpired from './isTokenExpired';
import {userState, appState} from '../initialStates';

const CheckLogin = (props) => {
    const [context,dispatch] = useContext(Context);
    const notLogin = ['/login','/register'];
    if(!context.app.logged || localStorage.getItem('user') === null){
        return <Redirect to='/login'/>;
    }else if(notLogin.includes(props.history.location.pathname)){
        return <Redirect to='/'/>;
    }else{
        if(isTokenExpired()){   
            alert("Su sesion ha expirado por motivos de seguridad, por favor vuelva a ingresar al sistema");
            localStorage.removeItem('user');
            dispatch({user: userState, app: appState});
            return <Redirect to='/login'/>;
        }else{
            return false;
        }
    }
}

export default CheckLogin;