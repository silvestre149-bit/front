import React from 'react';

import { Tabela } from '../../tabela/template';
import { COLUNAS_RELATORIO_TRES } from './colunas';

export function TabelaRelatorioTres({ avaliacoes }) {
    return <>
        <Tabela
            colunas={COLUNAS_RELATORIO_TRES}
            dados={avaliacoes}
        />
    </>
}