import React from 'react';
import { Redirect, Route, Switch } from "react-router-dom";

/* pages */
import { Login } from '../../pages/Login';
import { NaoEncontrada } from '../../pages/NaoEncontrada';
import Teste from '../../pages/Teste';
import Projeto from '../../pages/TabelaDeProjetos/projeto';
import OutroTeste from '../../pages/Teste2';
import OutroProjeto from '../../pages/Projeto/projeto';

export function PublicRoutes() {

  return <Switch>

    {
      process.env.REACT_APP_ENV_TEST && <Route exact path="/teste" component={Teste} />
    }

    {
      process.env.REACT_APP_ENV_TEST && <Route exact path="/teste/adm/" component={Projeto} />
    }

    {
      process.env.REACT_APP_ENV_TEST && <Route exact path="/outro" component={OutroTeste} />
    }

    {
      process.env.REACT_APP_ENV_TEST && <Route exact path="/outro/adm/" component={OutroProjeto} />
    }


    <Route exact path="/" component={Login} />

    <Redirect from='/logout' to='/' />

    <Route component={NaoEncontrada} />

  </Switch>;
}

