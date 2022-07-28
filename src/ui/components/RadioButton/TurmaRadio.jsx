import React from 'react';

import { RadioButtonTemplate } from './template';
import { DADOS } from './dadosRB';

// Obs: exemplo está em página de semestres, porém comentado em TabelaSemestre

export function RBTurma() {
    return <>
        <RadioButtonTemplate
            dadosRB={DADOS}
        />
    </>
}


                        
                     