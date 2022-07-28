import React from 'react';

import { Tabela } from '../template/index';
import { COLUNAS_AVALIACAO } from './colunas';

export function TabelaDoProf({ avaliacoes }) {
    return <>
        <Tabela
            colunas= {COLUNAS_AVALIACAO}
            dados={avaliacoes}
            nomeRecurso="meusprojetos"
            botaonovo={false}
        />
    </>
}