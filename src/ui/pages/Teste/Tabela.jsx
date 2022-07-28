import React from 'react';

import { Tabela } from '../../components/tabela/template/index';
import { COLUNAS_AVALIACAO } from './Colunas';

export function TabelaComAvaliacoes({ avaliacoes }) {
    return <>
        <Tabela
            colunas={COLUNAS_AVALIACAO}
            dados={avaliacoes}
            nomeRecurso="teste"
            name={COLUNAS_AVALIACAO.acessor}
        />
    </>
}