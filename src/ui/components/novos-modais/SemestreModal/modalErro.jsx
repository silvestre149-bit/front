import React from 'react';

import { ModalTemplate } from '../template';

export function ModalErroSemestre() {
    return <>
        <ModalTemplate
        tipoModal="erro"
        tipoPagina="semestre"
        rota="#addProf"
        nomeRota="adicionarSemestre"
        />
    </>
}