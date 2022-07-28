import React from 'react';

/* api */
import { get } from '../../../../../api/request';

/* componentes */
import { Tabela } from '../../../../components/Tabela';

/* tipos */
import { COLUNAS_USUARIO } from './colunas';
import { useQuery } from 'react-query';
import { CACHE_TYPES } from '../../../../../utils/types';
import { CACHE_CONFIGURACAO } from '../../../../../utils/cache';

const buscarDados = async () => {
    const requisicaoHttp = await get('/user');
    return requisicaoHttp.data
}


function Usuario() {

    /* Buscar dados de usuário */
    const { data } = useQuery(CACHE_TYPES.USUARIO, buscarDados, CACHE_CONFIGURACAO);

    return <>
        {data && <Tabela
            nomeRecurso="usuario"
            dados={data}
            colunas={COLUNAS_USUARIO}
        />}

    </>;
}

export default Usuario;