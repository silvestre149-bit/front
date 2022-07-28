import React from 'react';
import { Link } from 'react-router-dom';

export default function VerTCC() {

    return <>
        <div className="red accent-4 center">
            <div style={{ padding: "50px"}}>
                <h3 className="white-text">Projeto</h3>
                <p className="white-text">Clique aqui para ver o seu TCC.</p>
            </div>
        </div>
        <Link to="/aluno/projeto">
            <div className="grey darken-2 white-text center" style={{ padding: "15px"}}>
                CLIQUE AQUI
            </div>
        </Link>
    </>
}