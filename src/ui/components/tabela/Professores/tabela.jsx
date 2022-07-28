import React from 'react';

import { Tabela } from '../../tabela/template';
import { COLUNAS_PROFESSORES } from './colunas';

export function TabelaDeProfessores({ informacoes }) {
    return <>
        <Tabela
            colunas={COLUNAS_PROFESSORES}
            dados={informacoes}
            botaonovo={false}
        />
    </>
}