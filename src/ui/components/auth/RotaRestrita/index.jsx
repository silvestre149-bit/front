import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

/* contexto */
import { AuthContext } from '../../../context/Auth';

/* utils */
import { validarLogin } from '../../../../utils/jwt';

export function RotaRestrita({ component: Component, ...rest }) {


    const { dispatch } = useContext(AuthContext);

    const loginValidado = validarLogin()

    useEffect(() => {
        if (loginValidado.erro) {
            dispatch({ type: loginValidado.id })
        }
    });

    if (loginValidado.erro) {
        return <Redirect to={{
            pathname: "/",
        }} />
    }
    return <Route {...rest} render={props => (
        <Component {...props} />
    )} />

}