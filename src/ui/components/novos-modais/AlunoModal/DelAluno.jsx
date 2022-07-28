import React from 'react';

import { ModalTemplate } from '../template';

export function ModalExcluirAluno() {
    return <>
        <ModalTemplate
        tipoModal="exclusao"
        tipoPagina="aluno"
        rota="#excluirAluno"
        nomeRota="excluirAluno"
        />
    </>
}
