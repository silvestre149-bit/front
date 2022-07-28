import React from 'react';

import { Tabela } from '../../tabela/template';
import { COLUNAS_RELATORIO_DOIS } from './colunas';

export function TabelaRelatorioDois({ avaliacoes }) {
    return <>
        <Tabela
            colunas={COLUNAS_RELATORIO_DOIS}
            dados={avaliacoes}
        />
    </>
}