import React from 'react';

import { ModalTemplate } from '../template';

export function ModalExcluirProf() {
    return <>
        <ModalTemplate
        tipoModal="exclusao"
        tipoPagina="professor"
        rota="#excluirProf"
        nomeRota="excluirProf"
        />
    </>
}
