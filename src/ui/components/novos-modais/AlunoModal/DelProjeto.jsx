import React from 'react';

import { ModalTemplate } from '../template';

export function ModalExcluirProjeto() {
    return <>
        <ModalTemplate
        tipoModal="confirmacao-projeto"
        tipoPagina="encerramento-projeto"
        rota="#excluirSemestre"
        nomeRota="excluirSemestre"
        />
    </>
}