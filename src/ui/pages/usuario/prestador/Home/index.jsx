import React from 'react';
import { useQuery } from 'react-query';
import { buscarAvaliacoes } from '../../../../../api/avaliacao';

/* tipos */
import { CACHE_CONFIGURACAO } from '../../../../../utils/cache';
import { CACHE_TYPES } from '../../../../../utils/types';

/* componentes */
import { AvaliacaoNaoExiste } from '../../../../components/Avaliacao/NaoExiste';
import { Carregando } from '../../../../components/Carregando';
import { TabelaComAvaliacoes } from './Tabela';

function Home() {
    const { data, isLoading } = useQuery(CACHE_TYPES.AVALIACOES_PRESTADOR, buscarAvaliacoes, CACHE_CONFIGURACAO);
    if (isLoading) {
        return <Carregando />
    } else if (!data) {
        return <AvaliacaoNaoExiste />
    } else {
        return <TabelaComAvaliacoes avaliacoes={data} />
    }

}

export default Home;