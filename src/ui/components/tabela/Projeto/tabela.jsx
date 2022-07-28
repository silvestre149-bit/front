import React from 'react';

import { Tabela } from '../../tabela/template/index';
import { COLUNAS_PROJETO } from './colunas';

export function TabelaComProjetos({ projetos }) {
    return <>
        <Tabela
            colunas= {COLUNAS_PROJETO}
            dados={projetos}
            nomeRecurso="projeto"
            botaonovo={false}
        />
    </>
}