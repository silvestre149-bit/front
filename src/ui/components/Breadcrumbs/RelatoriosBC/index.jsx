import React from 'react';

import { BreadcrumbTemplate } from '../template/index'
import { DADOS } from '../dadosHome';


export function BreadcrumbsRelatorios() {
    return <>
        <BreadcrumbTemplate
            dadosBreadcrumb={DADOS}
            pagAtual="Relatórios"
        />
    </>
}
