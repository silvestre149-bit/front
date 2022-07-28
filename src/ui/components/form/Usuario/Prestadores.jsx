import { FormSelect } from 'materialize-css';
import React, { useEffect } from 'react';
import { get } from '../../../../api/request';
import { PERFIL_TYPES } from '../../../../utils/types';

export function Prestadores({ prestadores, register, usuario }) {
    useEffect(() => {
        FormSelect.init(document.querySelectorAll('#prestadorId'))

    }, [])

    return <div>
        <br />
        <select
            id="prestadorId"
            defaultValue={usuario && usuario.type}
            {...register("prestadorId")}>
            {prestadores.map(prestador => {
                return <option key={prestador.id} value={prestador.id}>{prestador.name}</option>
            })}
        </select>
    </div>
}

export async function buscarPrestadores() {
    return get('/user?type=' + PERFIL_TYPES.PRESTADOR_SERVICO)
        .then(requisicao => requisicao.data)
}