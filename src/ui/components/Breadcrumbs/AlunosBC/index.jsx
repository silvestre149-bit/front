import React from 'react';

import { BreadcrumbTemplate } from '../template/index'
import { DADOS } from '../dadosHome';


export function BreadcrumbsAlunos() {
    return <>
        <BreadcrumbTemplate
            dadosBreadcrumb={DADOS}
            pagAtual="Alunos"
        />
    </>
}
