import React from 'react';
import { useQuery } from 'react-query';
import { get } from '../../../../../api';

import { CACHE_CONFIGURACAO } from '../../../../../utils/cache';
import { CACHE_TYPES } from '../../../../../utils/types';

import { Carregando } from '../../../../components/Carregando';
import { Tabela } from '../../../../components/Tabela';
import Avisos from './Avisos';
import { COLUNAS_AVALIACAO } from './colunas';

async function buscarEstatisticas() {
    const buscarDimensoes = get('/dimension');
    const buscarFormularios = get('/form');
    const buscarAvaliacoes = get('/avaliation')
    return Promise.all([
        buscarDimensoes,
        buscarFormularios,
        buscarAvaliacoes
    ]).then(([reqDimensoes, reqFormularios, reqAvaliation]) => {
        return {
            dimensoes: reqDimensoes.data,
            formularios: reqFormularios.data,
            avaliacoes: reqAvaliation.data
        }
    })
}

export function Home() {

    const { data, isLoading } = useQuery(CACHE_TYPES.ESTATISTICAS, buscarEstatisticas, CACHE_CONFIGURACAO)

    if (isLoading) {
        return <Carregando />
    }

    const { avaliacoes } = data;
    return <>

        <Avisos dados={data} />

        <section>

            <h1 style={{ textAlign: 'center' }}>Avaliações</h1>
            <br />

            <Tabela
                colunas={COLUNAS_AVALIACAO}
                dados={avaliacoes}
            />
        </section>
        {/*  <CadastrarDimensoes />
        <section className="white-text" style={{ display: 'grid', gridTemplateColumns: "repeat(3, 1fr)", columnGap: "10px" }}>
            <DimensoesAnalisadas />
        </section> */}

    </>;
}