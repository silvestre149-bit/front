import React from 'react';

import { BreadcrumbTemplate } from '../template/index'
import { DADOS } from '../dadosHomeProf';


export function BreadcrumbsPerfil() {
    return <>
        <BreadcrumbTemplate
            dadosBreadcrumb={DADOS}
            pagAtual="Perfil"
        />
    </>
}
