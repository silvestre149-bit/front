
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { get } from '../../../../../api';
import Avaliacao from '../../../../components/Avaliacao';
import { BotaoVoltar } from '../../../../components/botao/Voltar';
import { Carregando } from '../../../../components/Carregando';

export function PaginaAvaliacao() {

    const { location, push } = useHistory();
    const { state } = location;
    const [dadosAvaliacao, definirDadosAvaliacao] = useState(undefined);

    useEffect(() => {
        if (!state) {
            push(process.env.PUBLIC_URL);
        }
    })



    useEffect(() => {
        const buscarAvaliacao = async () => {
            const avaliacao = await get('/avaliation/' + state.avaliacao.id).then(req => req.data)

            definirDadosAvaliacao(avaliacao);

        }
        buscarAvaliacao()
    }, [state,])


    if (!state || !dadosAvaliacao) {
        return <Carregando />
    }

    return <article>

        <article style={{ marginTop: '30px' }}>
            <BotaoVoltar />
        </article>

<br />
        <h5>{state.avaliacao.examiner.name}</h5>

        <Avaliacao
            dadosAvaliacao={dadosAvaliacao}
            detalhesPesquisa={true}
        />
    </article>
}