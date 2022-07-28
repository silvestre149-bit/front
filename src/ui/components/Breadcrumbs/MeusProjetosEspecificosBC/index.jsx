import React from 'react';

import { BreadcrumbTemplate } from '../template/index'
import { DADOS } from './dadosProjEsp';


export function BreadcrumbsMeusProjetosEspecificos({texto}) {
    return <>
        <BreadcrumbTemplate
            dadosBreadcrumb={DADOS}
            pagAtual={texto}
        />
    </>
}
