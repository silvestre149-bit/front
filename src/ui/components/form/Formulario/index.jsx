import React, { useState } from 'react';
import { useFieldArray, useForm } from "react-hook-form";
import { post } from "../../../../api";
import { Redirect } from 'react-router';
import { useQueryClient } from 'react-query';
/* componentes */
import { ErroForm, gerarMensagemErro } from '../Erro';
import { CadastroQuestoes } from './questoes';

/* tipos */
import { CACHE_TYPES, ERRO_TYPES, HTTP_STATUS_TYPES, } from '../../../../utils/types';

function FormularioInputs({ tipoFormulario, registrarInput, formulario }) {
    return <>

        <input type="hidden" name="type" value={tipoFormulario} />

        <label htmlFor="min_score">Porcentagem para feedback baixo</label>
        <input
            id="min_score"
            type="number"
            defaultValue={formulario && formulario.feedback.minScore}
            {...registrarInput("feedback.minScore", { required: "Porcentagem para feedback baixo" })}
            value={30}
        />

        <label htmlFor="min_feedback">Feedback para nota baixa</label>
        <input
            id="min_feedback"
            type="text"
            defaultValue={formulario && formulario.feedback.minFeedback}
            {...registrarInput("feedback.minFeedback", { required: "Feedback para nota baixa" })}
            value="serviço insuficiênte, repensar"
        />

        <label htmlFor="mid_score">Porcentagem para Feedback médio</label>
        <input
            id="mid_score"
            type="number"
            defaultValue={formulario && formulario.feedback.midScore}
            {...registrarInput("feedback.midScore", { required: "Porcentagem para Feedback médio" })}
            value={60}
        />

        <label htmlFor="mid_feedback">Feedback para nota média</label>
        <input
            id="mid_feedback"
            type="text"
            defaultValue={formulario && formulario.feedback.midFeedback}
            {...registrarInput("feedback.midFeedback", { required: "Feedback para nota média" })}
            value="Serviço bom, mas precisa melhorar"
        />

        <label htmlFor="max_feedback">Feedback para nota alta</label>
        <input
            id="max_feedback"
            type="text"
            defaultValue={formulario && formulario.feedback.maxFeedback}
            {...registrarInput("feedback.maxFeedback", { required: "Feedback para nota alta" })}
            value="Serviço excelente"	
        />

    </>
}

function BotaoCadastrar({ quantidadeQuestoes }) {
    const botaoHabilitado = quantidadeQuestoes > 0 ? false : true;
    return quantidadeQuestoes < 1
        ? <></>
        : <div style={{ display: 'flex', justifyContent: 'right' }}>
            <button
                type="submit"
                className="btn green"
                disabled={botaoHabilitado}
            >Cadastrar</button>
        </div>
}

function TituloFormulario({ tipo }) {
    return <div style={{ textAlign: 'center' }}>
        <h4 style={{ flexGrow: 0 }}>{tipo}</h4>
        <br />
        <br />
    </div>
}

function FormFormulario({ tipo, formulario }) {

    const { register, handleSubmit, control } = useForm();
    const { append, remove, fields } = useFieldArray({ name: 'questoes', control: control })
    const queryClient = useQueryClient();

    const [cadastrou, definirCadastrou] = useState(false);


    const quantidadeQuestoes = fields.length;
    const novasQuestoes = fields;
    /* estados */
    const [erro, definirErro] = useState(undefined);

    const cadastrarDados = async dados => {
        const { questoes, feedback } = dados;
        const formulario = { feedback, type: tipo };

        const formId = await cadastrarFormulario(formulario)
        const questoesComFormId = questoes.map(questao => { return { ...questao, formId } })

        return cadastrarQuestoes(questoesComFormId)
    }

    const cadastrarFormulario = async formulario => {
        const criarFormulario = await post('/form', formulario)
        if (criarFormulario.status !== HTTP_STATUS_TYPES.CRIADO) {
            alert(ERRO_TYPES.GENERICO)
            return
        }
        queryClient.invalidateQueries(CACHE_TYPES.FORMULARIO);
        return criarFormulario.data.id
    }

    const cadastrarQuestoes = async questoes => {
        const criarQuestoes = await post('/question', questoes)
        if (criarQuestoes.status !== HTTP_STATUS_TYPES.CRIADO) {
            alert(ERRO_TYPES.GENERICO)
            return
        }
        queryClient.invalidateQueries(CACHE_TYPES.FORMULARIO);
        definirCadastrou(true);
    }

    const apresentarErro = (erros, e) => {
        definirErro(gerarMensagemErro(erros, e));
    }

    if (cadastrou) {
        return <Redirect to="/" />
    }


    return <div className="card-panel">
        <TituloFormulario tipo={tipo} />

        <form onSubmit={handleSubmit(cadastrarDados, apresentarErro)}>
            <FormularioInputs
                registrarInput={register}
                formulario={formulario}
                tipoFormulario={tipo}
            />

            <CadastroQuestoes
                quantidadeQuestoes={quantidadeQuestoes}
                novasQuestoes={novasQuestoes}
                adicionar={append}
                remover={remove}
                registrarInput={register}
            />

            <ErroForm erro={erro} />

            <BotaoCadastrar quantidadeQuestoes={quantidadeQuestoes} />
        </form >
    </div >
}

export default FormFormulario;