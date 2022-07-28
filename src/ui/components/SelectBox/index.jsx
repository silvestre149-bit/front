import React from 'react';

import { SelectBox } from './template';
import { DADOS } from './dadosSelect';

// Obs: exemplo está em página de semestres, porém comentado em TabelaSemestre

export function SelectTurma() {
    return <>
        <SelectBox
            dadosSelect={DADOS}
            nomeSelect="Turma"
            textoSelect="Selecione a turma"
        />
    </>
}
