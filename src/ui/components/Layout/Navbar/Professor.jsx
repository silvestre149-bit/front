import React, { useState } from 'react';
import NavbarCoordenador from './Coordenador.jsx';
import { Link } from 'react-router-dom';

function NavbarProfessor() {
    const [navBar, navChange] = useState(<NavbarProfessor/>)

    function changeProf() {
        navChange(<NavbarCoordenador />)
    }
    
    return <>
        <li>
            <Link to="/">Home</Link>
        </li>
        <li>
            <Link to="/perfil">Perfil</Link>
        </li>
        <li>
            <Link to="/meusprojetos">Meus Projetos</Link>
        </li>
    </>
}

export default NavbarProfessor;