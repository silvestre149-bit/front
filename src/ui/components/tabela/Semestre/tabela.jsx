import React from 'react';

import { Tabela } from '../../tabela/template';
import { COLUNAS_LISTA } from './colunas';

export function TabelaLista({ avaliacoes }) {
    return <>
        <Tabela
            colunas={COLUNAS_LISTA}
            dados={avaliacoes}
        />
    </>
}