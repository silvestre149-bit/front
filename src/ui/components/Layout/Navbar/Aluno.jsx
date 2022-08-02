import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { pegarUsuario } from '../../../../api/aluno';
import { AuthContext } from '../../../context/Auth';

function NavbarAluno({ atualizar, contexto }) {
    const { usuario } = useContext(AuthContext);
    const [dadosUsuario, setDados] = useState();

    useEffect(() => {
        const atualizarUsuario = async () => {
            const res = await pegarUsuario(usuario._id);
            setDados(res.data);
        }

        atualizarUsuario();
    }, [])

    if (!dadosUsuario) return <div></div>

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

        {dadosUsuario.participacoes.length > 0 && <li>
            <Link to="/cancelar">Cancelar Projeto</Link>
        </li>}

        <li>
            <Link to="/perfil">Perfil</Link>
        </li>


    </>
}

export default NavbarAluno;