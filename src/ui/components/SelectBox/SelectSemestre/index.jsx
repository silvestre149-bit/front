import React from 'react';

import { SelectBox } from '../template';

export function SelectSemestre() {
    const DADOS = []
    return <>
        <SelectBox
            dadosSelect={DADOS}
            textoSelect="Escolha entre os semestres disponíveis"
        />
    </>
}
