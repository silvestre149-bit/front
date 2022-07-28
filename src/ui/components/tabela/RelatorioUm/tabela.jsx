import React from 'react';

import { Tabela } from '../../tabela/template';
import { COLUNAS_RELATORIO_UM } from './colunas';

export function TabelaRelatorioUm({ avaliacoes }) {
    return <>
        <Tabela
            colunas={COLUNAS_RELATORIO_UM}
            dados={avaliacoes}
        />
    </>
}