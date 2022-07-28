

import React from 'react';
import { Link } from 'react-router-dom';
import { Mensagem } from '../../../../components/Mensagem';

export function CadastrarDimensoes() {
    return <section className="card-panel">
        <Mensagem
            cor="vermelho"
            descricao="Atenção: é necessário cadastrar dimensões "
        />
        <section style={{ textAlign: 'right' }}>
            <Link to={process.env.PUBLIC_URL + 'dimensao/adm'} className="btn red">
                Cadastrar
            </Link>
        </section>
    </section>
}

function CadastrarFormularios() {
    return <section className="card-panel">
        <Mensagem
            cor="vermelho"
            descricao="Atenção: existem formulários que precisam ser cadastrados"
        />
        <section style={{ textAlign: 'right' }}>
            <Link to={process.env.PUBLIC_URL + 'form'} className="btn red">
                Cadastrar
            </Link>
        </section>
    </section>
}

function Avisos({ dados }) {

    const { dimensoes, formularios } = dados;

    const temDimensoesCadastras =
        Array.isArray(dimensoes) && dimensoes.length > 0

    const temFormulariosCadastrados =
        Array.isArray(formularios) && formularios.length === 2;

    return <>

        {temDimensoesCadastras ? undefined : <CadastrarDimensoes />}

        {temFormulariosCadastrados ? undefined : <CadastrarFormularios />}
    </>
}

export default Avisos;