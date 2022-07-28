import React from 'react';

import { BreadcrumbTemplate } from '../template/index'
import { DADOS } from './dadosContEsp';


export function BreadcrumbsControleEspecifico({texto}) {
    return <>
        <BreadcrumbTemplate
            dadosBreadcrumb={DADOS}
            pagAtual={texto}
        />
    </>
}
