import React from 'react';

import { BreadcrumbTemplate } from '../template/index'
import { DADOS } from '../dadosHomeProf';


export function BreadcrumbsMeusProjetos() {
    return <>
        <BreadcrumbTemplate
            dadosBreadcrumb={DADOS}
            pagAtual="Meus Projetos"
        />
    </>
}
