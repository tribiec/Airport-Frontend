import React from 'react';
import { Route } from 'react-router-dom';
import CheckLogin from './context/auth/CheckLogin';
import Login from '../views/Login/Login';
import Aeropuerto from '../views/Aeropuerto/Aeropuerto';
export default (props) => {
    return (
        <>
            <Route path="/login" component={Login} />
            <CheckLogin>
                <Route path="/" component={Aeropuerto} />
            </CheckLogin>
        </>
    )
}