import React, { useState } from 'react';
import { AvaliacaoTotal } from '../../../domain/avaliacao';
import { AVALIACAO_TYPES } from '../../../utils/types';

/* componentes */
import { Feedback } from '../Feedback';
import { Questionario } from '../Questionario';
import { DetalhesPesquisa } from './DetalhesPesquisa';

function Avaliacao({ dadosAvaliacao, detalhesPesquisa }) {

    const [visivel, definirVisivel] = useState(false);

    if (!dadosAvaliacao) {
        return <h1>No momento não existe avaliação</h1>;
    } else if (dadosAvaliacao.status === AVALIACAO_TYPES.ABERTO) {
        return <section>
            {detalhesPesquisa && <>
                <DetalhesPesquisa apresentarPesquisa={() => definirVisivel(true)} />
                <br />
            </>}

            {(visivel || !detalhesPesquisa) && <Questionario
                titulo={dadosAvaliacao.form.type}
                questoes={dadosAvaliacao.form.questions}
                avaliacaoId={dadosAvaliacao.id}
            />
            }

        </section>
    } else if (dadosAvaliacao.status === AVALIACAO_TYPES.RESPONDIDO) {
        const { dimensions, form, ...avaliacao } = dadosAvaliacao;
        const avaliacaoTotal = new AvaliacaoTotal(avaliacao.answers, dimensions);
        return <Feedback
            avaliacaoTotal={avaliacaoTotal}
            formulario={form}
        />;
    } else {
        return <h1>Avaliação cancelada</h1>
    }
}

export default Avaliacao;