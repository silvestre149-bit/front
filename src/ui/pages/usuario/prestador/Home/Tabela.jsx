import React from 'react';

import { Mensagem } from '../../../../components/Mensagem';
import { Tabela } from '../../../../components/Tabela';
import { COLUNAS_AVALIACAO } from './colunas';

export function TabelaComAvaliacoes({ avaliacoes }) {
    return <>
        <Mensagem
            fechar
            descricao="Clique em avaliar para responder o questionário"
            cor="azul"
        />
        <Mensagem
            fechar
            descricao="Clique em avaliado para ver o feedback"
            cor="verde"
        />
        <Tabela
            colunas={COLUNAS_AVALIACAO}
            dados={avaliacoes}
        />
    </>
}