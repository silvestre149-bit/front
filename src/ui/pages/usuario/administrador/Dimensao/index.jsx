import React from 'react';
import { useQuery } from 'react-query';
import { get } from '../../../../../api/request';
import { CACHE_CONFIGURACAO } from '../../../../../utils/cache';
import { CACHE_TYPES } from '../../../../../utils/types';
import { Tabela } from '../../../../components/Tabela';
import { COLUNAS_DIMENSAO } from './colunas';

const buscarDimensoes = async () => {
  return await get('/dimension').then(request => request.data)
}

function Dimensao() {

  const { data } = useQuery(CACHE_TYPES.DIMENSAO, buscarDimensoes, CACHE_CONFIGURACAO)

  const existeDados = Array.isArray(data);

  if (!existeDados) {
    return <></>
  }

  return <>
    <Tabela
      colunas={COLUNAS_DIMENSAO}
      dados={data}
      nomeRecurso='dimensao'
    />
  </>;
}

export default Dimensao;