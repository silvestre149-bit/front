import React, { useContext } from 'react';
import { BrowserRouter as Router } from "react-router-dom";

/* context */
import { AuthContext } from '../context/Auth';
import { PrivateRoutes } from './private';
import { PublicRoutes } from './public';

function Routes() {
    const authContext = useContext(AuthContext);
    return <Router basename={process.env.PUBLIC_URL}>
        {(authContext.usuario)
            ? <PrivateRoutes />
            : <PublicRoutes />}
    </Router>;
}

export default Routes;