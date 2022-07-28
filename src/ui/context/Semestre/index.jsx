import React from 'react';
import { useQuery } from 'react-query';
import { get } from '../../../api';
import { CACHE_CONFIGURACAO } from '../../../utils/cache';
import { CACHE_TYPES } from '../../../utils/types';
import { Carregando } from '../../components/Carregando';

function buscarSemestre() {
    return get('/semestre?status=aberto')
        .then(requisicao => {
            const eTipoArray = Array.isArray(requisicao.data)
            if (eTipoArray) {
                return requisicao.data[0]
            }
            return requisicao.data;
        })

}

export const SemestreContext = React.createContext()

export function SemestreProvider({ children }) {

    const { data, isLoading } = useQuery(CACHE_TYPES.SEMESTRE, buscarSemestre, CACHE_CONFIGURACAO)

    return <SemestreContext.Provider
        value={data}
    >
        {
            isLoading
                ? <Carregando />
                : children
        }
    </SemestreContext.Provider>
}