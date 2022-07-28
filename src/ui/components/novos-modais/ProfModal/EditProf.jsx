import React from 'react';

import { ModalTemplate } from '../template';

export function ModalEditarProf({info1},{info2}) {
    return <>
        <ModalTemplate
        tipoModal="edicao"
        tipoPagina="professor"
        rota="#editarProf"
        nomeRota="editarProf"
        texto1={info1}
        texto2={info2}
        />
    </>
}
