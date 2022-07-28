import React from 'react';
import { Link } from 'react-router-dom';

function NavbarAluno() {
    return <>
        <li>
            <Link to="/">Home</Link>
        </li>

        <li>
            <Link to="/aluno/projeto">Projeto</Link>
        </li>
        
        <li>
            <Link to="/notificacoes">Notificações</Link>
        </li>

        <li>
            <Link to="/cancelar">Cancelar Projeto</Link>
        </li>

        <li>
            <Link to="/perfil">Perfil</Link>
        </li>


    </>
}

export default NavbarAluno;