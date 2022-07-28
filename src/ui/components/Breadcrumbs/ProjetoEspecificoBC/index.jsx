import React from 'react';

import { BreadcrumbTemplate } from '../template/index'
import { DADOS } from './dadosProjEsp';


export function BreadcrumbsProjetoEspecifico({texto}) {
    return <>
        <BreadcrumbTemplate
            dadosBreadcrumb={DADOS}
            pagAtual={texto}
        />
    </>
}
