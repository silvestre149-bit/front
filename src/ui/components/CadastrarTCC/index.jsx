import React from 'react';
import { Link } from 'react-router-dom'

export default function FazerCadastroTCC() {
    return <>
        <div className="red accent-4 center">
            <div style={{ padding: "50px" }}>
                <h3 className="white-text">Novo Por Aqui?</h3>
                <p className="white-text">Cadastre agora o seu projeto de TCC</p>
            </div>
        </div>
        <Link to="/aluno/projeto">
            <div className="grey darken-2 white-text center" style={{ padding: "15px" }}>
                CLIQUE AQUI
            </div>
        </Link>
    </>
}