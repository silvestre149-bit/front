import React from 'react';
import { useLocation } from 'react-router';
import { FormDimensao } from '../../../../components/form/Dimensao';

export function DimensaoAdm() {
    const { state } = useLocation()

    if (state && state.dimensao) {
        return <FormDimensao dimensao={state.dimensao} />
    }

    return <FormDimensao />
}