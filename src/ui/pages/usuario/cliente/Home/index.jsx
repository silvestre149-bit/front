import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { buscarAvaliacoes } from '../../../../../api/avaliacao';

/* tipos */
import { CACHE_CONFIGURACAO } from '../../../../../utils/cache';
import { CACHE_TYPES } from '../../../../../utils/types';
import { informarUsuario } from '../../../../../utils/usuario';

/* componententes */
import Avaliacao from '../../../../components/Avaliacao';
import { AvaliacaoNaoExiste } from '../../../../components/Avaliacao/NaoExiste';
import { Carregando } from '../../../../components/Carregando';


export function Home() {
    const [avaliador] = useState(informarUsuario())

    const { data, isLoading } = useQuery(CACHE_TYPES.AVALIACAO_CLIENTE, buscarAvaliacoes, CACHE_CONFIGURACAO)

    if (isLoading) {
        return <Carregando />
    } else if (!data) {
        return <AvaliacaoNaoExiste />
    } else {
        return <Avaliacao
            avaliador={avaliador}
            dadosAvaliacao={data}
            detalhesPesquisa
        />
    }
}