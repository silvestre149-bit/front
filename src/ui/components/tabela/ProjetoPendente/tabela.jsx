import React from 'react';

import { Tabela } from '../../tabela/template';
import { COLUNAS_AVALIACAO } from './colunas';

export function TabelaNotificacoes({ avaliacoes }) {
    return <>
        <Tabela
            colunas={COLUNAS_AVALIACAO}
            dados={avaliacoes}
            nomeRecurso="controle"
            botaonovo={false}
        />
    </>
}