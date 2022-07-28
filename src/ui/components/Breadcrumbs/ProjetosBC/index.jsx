import React from 'react';

import { BreadcrumbTemplate } from '../template/index'
import { DADOS } from '../dadosHome';


export function BreadcrumbsProjetos() {
    return <>
        <BreadcrumbTemplate
            dadosBreadcrumb={DADOS}
            pagAtual="Projetos"
        />
    </>
}
