import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import "./styles.css";

/* componentes */
import { ErroForm, gerarMensagemErro } from '../form/Erro';
import { post } from '../../../api/request';
import { AVALIACAO_TYPES } from '../../../utils/types';
import { useLocation } from 'react-router';

function Questao({ numeroQuestao, questao, registroInput }) {

    const { title, min_value, max_value } = questao

    const gerarAlternativas = () => {
        const alternativas = [];

        for (let i = min_value; i <= max_value; i++) {
            alternativas.push(
                <p key={i}>
                    <label>
                        <input
                            name={numeroQuestao}
                            value={i}
                            type="radio"
                            {...registroInput}
                        />
                        <span>{i}</span>
                    </label>
                </p>
            )
        }
        return alternativas;
    }

    return <div className="card-panel">
        <span className="questao-titulo">
            <h5>{title}</h5>

        </span>
        <section className="radio-grupo">
            {gerarAlternativas()}
        </section>
    </div>

}

export function Questionario({ avaliacaoId, titulo, questoes }) {

    const { register, handleSubmit } = useForm();
    const { pathname } = useLocation();
    /* estados */
    const [erro, definirErro] = useState(undefined);

    const submeterAvaliacao = async dados => {
        const idQuestoes = Object.keys(dados);

        const respostas = [];
        let resposta;
        for (const idQuestao of idQuestoes) {
            for (const questao of questoes) {
                if (questao.id.toString() === idQuestao) {
                    resposta = (+dados[idQuestao].resposta)
                    const total = resposta * questao.score;
                    respostas.push({
                        total,
                        answer: resposta,
                        avaliation: {
                            id: avaliacaoId
                        },
                        question: {
                            id: idQuestao
                        }
                    })
                }
            }
        }
        const request = await post('/answer', respostas)

        if (request.data.status === AVALIACAO_TYPES.RESPONDIDO) {
            window.location = pathname
        } else {
            alert('Ops, algo deu errado. Por favor deslogue e entre novamente por favor')
        }
    }

    const gerarErro = (erros, e) => {
        definirErro(gerarMensagemErro(erros, e))
    }

    return <>
        {/* <h1 id="questionario-titulo">Questionário do(a) {avaliado}</h1> */}
        <h1 id="questionario-titulo">{titulo}</h1>

       
        <form onSubmit={handleSubmit(submeterAvaliacao, gerarErro)}>

            {questoes.map((questao, i) => {
                const nomeQuestao = `${questao.id}.resposta`
                const registroInput = { ...register(nomeQuestao, { required: true }) };

                return <Questao
                    numeroQuestao={(i + 1)}
                    questao={questao}
                    key={questao.id}
                    registroInput={registroInput}
                />
            })}

            <ErroForm erro={erro} />

            <br />

            <span id="questionario-submeter">
                <button type="submit" className="btn green white-text">concluir</button>
            </span>

        </form>

    </>;
}