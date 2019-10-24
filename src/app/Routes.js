import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../views/Login/Login';
import Aeropuerto from '../views/Aeropuerto/Aeropuerto';
import CheckLogin from './context/auth/CheckLogin';
export default (props) => {
    return (
        <>
            <CheckLogin history={props.history} />
            <Route exact path="/" component={Aeropuerto}/>
            <Route path="/login" component={Login} />
        </>
    )
}