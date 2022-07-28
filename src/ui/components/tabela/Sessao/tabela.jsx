import React from 'react';

import { Tabela } from '../../tabela/template';
import { COLUNAS_POSTERES } from './colunas';

export function TabelaDePosteres({ posteres }) {
    return <>
        <Tabela
            colunas={COLUNAS_POSTERES}
            dados={posteres}
            nomeRecurso="outro"
        />
    </>
}