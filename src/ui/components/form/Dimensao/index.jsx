import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router';
import { post } from '../../../../api';
import { BotaoVoltar } from '../../botao/Voltar';
import { ErroForm, gerarMensagemErro } from '../Erro';

import "./styles.css";

export function FormDimensao({ dimensao }) {

    const { register, handleSubmit } = useForm()


    const [erro, definirErro] = useState(undefined);
    const [cadastrou, definirCadastrou] = useState(false)

    const cadastrarDimensao = async (data) => {
        const requisicao = await post('/dimension', data)

        requisicao.status === 201
            ? definirCadastrou(true)
            : alert('Ops, tivemos um problema. Saia e entre novamente por favor')

    }

    const apresentarErro = (erros, e) => {
        definirErro(gerarMensagemErro(erros, e));
    }

    if (cadastrou) {
        return <Redirect to="/dimensao" />
    }

    return <>
        <section className="card-panel">
            <BotaoVoltar />
            <h3 className="center">Formulário de Dimensão</h3>
            <form onSubmit={handleSubmit(cadastrarDimensao, apresentarErro)}>

                <label htmlFor="title">Título</label>
                <input
                    type="text"
                    id="title"
                    {...register("title", { required: "Título" })}
                    defaultValue={dimensao && dimensao.title}
                />

                <label htmlFor="score">Peso</label>
                <input
                    type="number"
                    id="score"
                    defaultValue={dimensao && dimensao.score}
                    {...register("score", { required: "Peso" })}
                />

                <label htmlFor="min_score">Porcentagem para Feedback baixo</label>
                <input
                    type="number"
                    id="min_score"
                    defaultValue={dimensao && dimensao.feedback.minScore}
                    {...register("feedback.minScore", { required: "Porcentagem para Feedback baixo" })}
                />

                <label htmlFor="min_feedback">Feedback para nota baixa</label>
                <input
                    type="text"
                    id="min_feedback"
                    defaultValue={dimensao && dimensao.feedback.minFeedback}
                    {...register("feedback.minFeedback", { required: "Feedback para nota baixa" })}
                />

                <label htmlFor="mid_score">Porcentagem para Feedback médio</label>
                <input
                    type="number"
                    id="mid_score"
                    defaultValue={dimensao && dimensao.feedback.midScore}
                    {...register("feedback.midScore", { required: "Porcentagem para Feedback médio" })}
                />

                <label htmlFor="mid_feedback">Feedback para nota média</label>
                <input
                    type="text"
                    id="mid_feedback"
                    defaultValue={dimensao && dimensao.feedback.midFeedback}
                    {...register("feedback.midFeedback", { required: "Feedback para nota média" })}
                />

                <label htmlFor="max_feedback">Feedback para nota alta</label>
                <input
                    type="text"
                    id="max_feedback"
                    defaultValue={dimensao && dimensao.feedback.maxFeedback}
                    {...register("feedback.maxFeedback", { required: "Feedback para nota alta" })}
                />

                <ErroForm erro={erro} />

                <section className="btn-dimensao">
                    <button type="submit" className="btn green">Cadastrar</button>
                </section>

            </form>
        </section>

    </>;
}