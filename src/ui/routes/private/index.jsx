import React, { useContext, useEffect, useMemo } from 'react';
import { Route, Switch } from 'react-router-dom';

/* context */
import { AuthContext } from '../../context/Auth';

/* rotas */
import { ROTAS_ALUNO } from './usuario/Aluno';
import { ROTAS_PROFESSOR } from './usuario/Professor';
import { ROTAS_COORDENADOR } from './usuario/Coordenador';

/* tipos */
import { LOGIN_TYPES, PERFIL_TYPES, ERRO_TYPES } from '../../../utils/types';

/* paginas */
import { NaoEncontrada } from '../../pages/NaoEncontrada';
import { Login } from '../../pages/Login';

import { useLocation } from 'react-router-dom';

/* componentes */
import { RotaRestrita } from '../../components/auth/RotaRestrita';
import Layout from '../../components/Layout';
import { SemestreProvider } from '../../context/Semestre';
import { limparCookies } from '../../../utils/cookie';

export function Logout() {
  const contexto = useContext(AuthContext);

  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
  contexto.dispatch({ type: LOGIN_TYPES.LOGOUT });
  limparCookies();

  return <Login />

}

export function PrivateRoutes() {

  const { usuario, dispatch } = useContext(AuthContext);

  let location = useLocation();
  let state = location.state;

  const rotasUsuario = useMemo(() => {

    /* gerarRotasPeloTipo */
    let rotas = [];
    const tipo = usuario.tipo;
    switch (tipo) {
      case PERFIL_TYPES.ALUNO:
        rotas = ROTAS_ALUNO;
        break;

      case PERFIL_TYPES.PROFESSOR:
        rotas = usuario.permissoes.coordenador
          ? [...ROTAS_PROFESSOR, ...ROTAS_COORDENADOR]
          : ROTAS_PROFESSOR
        break;

      default:
        dispatch({ type: ERRO_TYPES.GENERICO })
        break;
    }

    return rotas.map((rota, i) => {
      return <RotaRestrita exact key={'user' + i} {...rota} />
    })
  }, [usuario.tipo, dispatch, usuario.permissoes])

  return <Layout>
    <SemestreProvider>
      <Switch>

        {rotasUsuario}
        {/* <Route exact path="/login" component={Login} /> */}
        <Route exact path='/logout' component={() => (<Logout />)} />
        <Route path="*" component={() => (<NaoEncontrada />)} />
      </Switch>
    </SemestreProvider>
  </Layout>
}