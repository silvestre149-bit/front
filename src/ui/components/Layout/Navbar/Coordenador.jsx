import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import NavbarProfessor from './Professor';
import { MdPerson } from "react-icons/md";

import 'materialize-css'

import '../../Layout/styles.css'
function NavbarCoordenadorContent() {

    return <>
        <li>
            <Link to="/home">Home</Link>
        </li>

        <li>
            <Link to="/semestre">Semestre</Link>
        </li>

        <li className='title-ul'>
            <a>
                Usuários
            </a>
            <ul>
                <Link className='link-color card-content' to="/aluno">Alunos</Link>
                <Link className='link-color card-content' to="/professor">Professores</Link>
            </ul>
        </li>

        <li></li>
        <li>
            <Link to="/projeto">Projetos</Link>
        </li>

        <li>
            <Link to="/relatorio">Relatórios</Link>
        </li>

        <li className='link-hamburguer'>
            <Link to="/notificacoes">Notificações</Link>
        </li>
      
        <li className='title-ul'>
            <Link to='/perfil'>
                Perfil
            </Link>
            <ul>
                <Link className='link-color' to="/notificacoes">Notificações</Link>
                <Link className='link-color' to="/controle">Controle</Link>
            </ul>
        </li>

        <li className='link-hamburguer'>
            <Link to="/controle">Controle</Link>
        </li>

    </>
}

function NavbarCoordenador() {

    const [navBar, navChange] = useState(<NavbarCoordenadorContent />)
    const [name, nameBar] = useState('Professor');
    const [navState, setNavState] = useState(false);
    const history = useHistory();
    function changeProf() {
        if (navState === false) {
            setNavState(true);
            navChange(<NavbarProfessor />)
            nameBar('Coordenador');
            history.push('/');
        } else {
            setNavState(false);
            navChange(<NavbarCoordenadorContent />)
            nameBar('Professor');
            history.push('/home');
        }
    }

    return <>

        {navBar}

        <li onClick={changeProf}>
            <a className="dropdown-trigger blue darken-4 white-text" >
                Trocar para {name}
                <i className="material-icons right" >
                    <MdPerson />
                </i>
            </a>
        </li>
    </>
}

export default NavbarCoordenador;