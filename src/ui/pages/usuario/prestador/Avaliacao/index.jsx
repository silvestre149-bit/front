import React, { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { Redirect, useHistory } from 'react-router';
import { buscarAvaliacaoPorId } from '../../../../../api/avaliacao';
import { informarUsuario } from '../../../../../utils/usuario';

/* tipos */
import { CACHE_CONFIGURACAO } from '../../../../../utils/cache';
import { CACHE_TYPES } from '../../../../../utils/types';

/* componentes */
import Avaliacao from '../../../../components/Avaliacao';
import { Carregando } from '../../../../components/Carregando';


export function AvaliacaoPrestador() {

    const { location } = useHistory()

    const [idAvaliacao] = useState(() => {
        const veioDadosDaPaginaHome = (location && location.state)
        return veioDadosDaPaginaHome ? location.state.idAvaliacao : undefined
    });
    const [avaliador] = useState(informarUsuario())

    const { data, isLoading } = useQuery(
        CACHE_TYPES.AVALIACAO_PRESTADOR,
        () => { return idAvaliacao ? buscarAvaliacaoPorId(idAvaliacao) : undefined },
        CACHE_CONFIGURACAO)

    const voltarParaHome = useMemo(() => {
        const veioDadosDaPaginaHome = (location && location.state)
        if (!veioDadosDaPaginaHome && !isLoading) {
            return true
        }
    }, [location, isLoading])


    if (isLoading) {
        return <Carregando />
    } else if (voltarParaHome) {
        return <Redirect to={process.env.PUBLIC_URL} />
    } else {
        return <Avaliacao
            dadosAvaliacao={data}
            avaliador={avaliador}
        />
    }
}