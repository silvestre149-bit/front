import React from 'react';

import { Tabela } from '../../tabela/template';
import { COLUNAS_ALUNOS } from './colunas';

export function TabelaDeAlunos({ informacoes }) {
    return <>
        <Tabela
            colunas={COLUNAS_ALUNOS}
            dados={informacoes}
            botaonovo={false}
        />
    </>
}