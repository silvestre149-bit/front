import React from 'react';

import { BreadcrumbTemplate } from '../template/index'
import { DADOS } from '../dadosHome';


export function BreadcrumbsProfessores() {
    return <>
        <BreadcrumbTemplate
            dadosBreadcrumb={DADOS}
            pagAtual="Professores"
        />
    </>
}
