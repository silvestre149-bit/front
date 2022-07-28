import React from 'react';

import { Tabela } from '../../components/tabela/template';
import { COLUNAS_AVALIACAO } from '../Teste2/Colunas';

export function TabelaNotificacoes({ avaliacoes }) {
    return <>
        <Tabela
            colunas={COLUNAS_AVALIACAO}
            dados={avaliacoes}
            nomeRecurso="outro"
            name={COLUNAS_AVALIACAO.acessor}
        />
    </>
}