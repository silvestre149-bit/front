import React, { useEffect, Suspense, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Sidenav } from "materialize-css";

/* styles e icones */
import "./styles.css";
import { MdMenu as Menu } from "react-icons/md";

/* context */
import { PERFIL_TYPES } from '../../../../utils/types';
import { AuthContext } from "../../../context/Auth";
import { Carregando } from '../../Carregando';

/* components */
const NavbarProfessor = React.lazy(() => import('./Professor'));
const NavbarCoordenador = React.lazy(() => import('./Coordenador'));
const NavbarAluno = React.lazy(() => import('./Aluno'));

function Navbar() {

  /* contexto */
  const contexto = useContext(AuthContext);
  const { perfil, usuario } = contexto;


  useEffect(() => {
    const elems = document.querySelectorAll('.sidenav');
    Sidenav.init(elems);
  })

  const sair = () => {
    return <li><Link to="/logout">Sair</Link></li>;
  }

  const renderizarMenu = () => {

    switch (perfil) {
      case PERFIL_TYPES.PROFESSOR:
        return usuario.permissoes.coordenador
          ? <Suspense fallback={<Carregando />}> <NavbarCoordenador /> </Suspense>
          : <Suspense fallback={<Carregando />}> <NavbarProfessor /> </Suspense>

      default:
        /* caso nao seja professor é aluno */
        return <Suspense fallback={<Carregando />}> <NavbarAluno /> </Suspense>
    }
  }

  return <>
    <nav>
      <div className="nav-wrapper red accent-4" style={{ transition: "1s ease-out" }}>
        <a href="/#" data-target="mobile-demo" className="sidenav-trigger">
          <i className="material-icons"><Menu /></i>
        </a>

        <ul>
          <li className="hide-on-med-and-down" style={{ display: 'flex' }}>
            <a href="/professor" className="">
              <h5>ORIENTE</h5>
            </a>

          </li>
        </ul>

        <div class="row">
      <div class="col s10"><span class="flow-text">
      <ul className="right hide-on-med-and-down w50">
          {renderizarMenu()}
          {sair()}
        </ul></span></div>
    </div>
        
        

        <ul className="sidenav" id="mobile-demo">
          {renderizarMenu()}
          {sair()}
        </ul>

      </div>
    </nav>
  </>

}

export default Navbar;