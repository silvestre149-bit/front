import React from 'react';

import { RadioButtonTemplate } from './template';
import { DADOS } from './dadosRBSimNao';

// Obs: exemplo está em página de semestres, porém comentado em TabelaSemestre

export function RBSimNao() {
    return <>
        <RadioButtonTemplate
            dadosRB={DADOS}
        />
    </>
}


                        
                     