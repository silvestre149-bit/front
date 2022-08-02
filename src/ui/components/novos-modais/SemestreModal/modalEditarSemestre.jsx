import React from 'react';

import { ModalTemplate } from '../template';

export function ModalEditarSemestre() {
    return <>
        <ModalTemplate
        tipoModal="editar"
        tipoPagina="home"
        rota="#editar"
        nomeRota="editar"
        />
    </>
}