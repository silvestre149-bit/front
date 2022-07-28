import React from 'react';
import { TabelaComAvaliacoes } from './Tabela';
import { DADOS } from './Colunas';
import { Link } from 'react-router-dom';
import { MdMenu } from 'react-icons/md'

function Teste() {
  return <>
    <nav>
      <div className="nav-wrapper red accent-4" style={{ transition: "1s ease-out" }}>
        <a href="/#" data-target="mobile-demo" className="sidenav-trigger">
          <i className="material-icons"><MdMenu /></i>
        </a>

        <ul>
          <li className="hide-on-med-and-down" style={{ display: 'flex' }}>
            <a href="/professor">
              <h5>ORIENTE</h5>
            </a>

          </li>
        </ul>

        <ul className="right hide-on-med-and-down">
          <li>
            <Link to="/professor">Home</Link>
          </li>
          <li>
            <Link to="/professor/meusprojetos">Meus Projetos</Link>
          </li>
          <li>
            <Link to="/professor/notificacoes">Notificações</Link>
          </li>
          <li>
            <Link to="/professor/perfil">Perfil</Link>
          </li>
          <li>
            <Link to="/administrador" className="blue darken-4 white-text">Trocar para Coordenador</Link>
          </li>
          <li>
            <Link to="/">Sair</Link>
          </li>
        </ul>

        <ul className="sidenav" id="mobile-demo">
          <li>
            <Link to="/professor">Home</Link>
          </li>
          <li>
            <Link to="/professor/meusprojetos">Meus Projetos</Link>
          </li>
          <li>
            <Link to="/professor/notificacoes">Notificações</Link>
          </li>
          <li>
            <Link to="/professor/perfil">Perfil</Link>
          </li>
          <li>
            <Link to="/administrador" className="blue darken-4 white-text">Trocar para Coordenador</Link>
          </li>
          <li>
            <Link to="/">Sair</Link>
          </li>
        </ul>

      </div>
    </nav>
    <section className="container">
      <div className="section">
        <h2 className="center">Lista de Projetos</h2>
        <TabelaComAvaliacoes avaliacoes={DADOS} />
      </div>
    </section>
  </>
}

export default Teste;