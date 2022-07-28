import React, { useEffect } from 'react';
import { Mensagem } from '../../Mensagem';
import { Tooltip, FormSelect } from 'materialize-css'
import { useQuery } from 'react-query';
import { CACHE_TYPES } from '../../../../utils/types';
import { get } from '../../../../api';
import { CACHE_CONFIGURACAO } from '../../../../utils/cache';
import { Carregando } from '../../Carregando';

export function QuestaoExemplo() {
    const gerarAlternativas = () => {
        const alternativas = [];

        for (let i = 0; i <= 5; i++) {
            alternativas.push(
                <p key={i}>
                    <label>
                        <input
                            name={i}
                            value={i}
                            type="radio"
                            disabled
                        />
                        <span>{i}</span>
                    </label>
                </p>
            )
        }
        return alternativas;
    }

    return <article>
        <div className="card-panel" style={{ display: 'flex' }}>
            <span className="questao-titulo">
                <h5>Exemplo de dados para a questão</h5>
                <h6>Título: Você gostou do serviço?</h6>
                <h6>Peso: 2</h6>
                <h6>Menor alternativa: 0</h6>
                <h6>Maior alternativa: 5</h6>
                <h6>Dimensão: Limpeza</h6>
                <br />
            </span>
        </div>

        <div className="card-panel" style={{ width: '100%' }}>
            <span className="questao-titulo">
                <h5>Você gostou do serviço?</h5>
                <br />
            </span>
            <section className="radio-grupo">
                {gerarAlternativas()}
            </section>
        </div>
    </article>
}

export function InformacaoQuestao() {
    return <>
        <h4 style={{ textAlign: 'center' }}>Questões</h4>
        <br />
        <Mensagem
            descricao="As questões são no formato Likert, como no exemplo abaixo"
        />
        <QuestaoExemplo />

    </>
}

const novaQuestao = {
    title: "",
    score: "",
    min_value: "",
    min_title: "",
    max_value: "",
    max_title: "",
    dimensionId: "",
}

const questaoPreenchida = {
    title: "Quão feliz o serviço pode proporcionar?",
    score: 3,
    min_value: 0,
    min_title: "",
    max_value: 4,
    max_title: "",
    dimensionId: "",
}

export function BotaoPrimeiraQuestao({ quantidadeQuestoes, adicionar }) {
    useEffect(() => {
        FormSelect.init(document.querySelectorAll('#dimensoes'))
    })
    const adicionarQuestao = e => {
        e.preventDefault();
        adicionar(questaoPreenchida)
    }
    return quantidadeQuestoes >= 1
        ? <></>
        : <div style={{ display: 'flex', justifyContent: 'right' }}>
            <button onClick={adicionarQuestao} className="btn blue">
                Adicionar Questão
            </button>
            <br />
        </div>
}

function DropdownDimensoes({ dimensoes, indice, registrarInput, questao }) {
    /* TODO - Caso exista questão verificar qual é e adicionar o atributo defaultvalue */
    return <>
        <label htmlFor="dimensoes">Selecione uma dimensão para a questão</label>
        <select
            id="dimensoes"
            className="btn grey browser-default"
            defaultValue={'DEFAULT'}
            {...registrarInput(`questoes.${indice}.dimensionId`, { required: "Dimensão" })}
        >
            {dimensoes.map(dimensao => (
                <option
                    value={dimensao.id}
                    key={dimensao.id}
                >
                    {dimensao.title}
                </option>
            ))}
        </select>
    </>
}

function Questao({ indice, registrarInput, adicionar, remover, questao, dimensoes }) {
    const adicionarNovaQuestao = e => {
        e.preventDefault();
        return adicionar(novaQuestao);
    }

    const removerQuestao = e => {
        e.preventDefault();
        return remover(indice)
    }

    useEffect(() => {
        Tooltip.init(document.querySelectorAll('.tooltipped'), { position: 'top' })
    })

    return <article className="card-panel">
        <article style={{ display: 'flex', justifyContent: 'right' }}>
            <article style={{ display: 'flex', flexDirection: 'column' }}>
                <button
                    onClick={adicionarNovaQuestao}
                    className="btn blue tooltipped"
                    data-tooltip="Adicionar +1 questão abaixo"
                >
                    +1
                </button>
                <br />
                <button
                    onClick={removerQuestao}
                    className="btn red tooltipped"
                    data-tooltip="Remover questão"
                >
                    +1
                </button>

            </article>
        </article>


        <label htmlFor="title">Título</label>
        <input
            type="text"
            id="title"
            {...registrarInput(`questoes.${indice}.title`, { required: "Título" })}
            defaultValue={questao && questao.title}

        />

        <label htmlFor="score">Peso</label>
        <input
            type="text"
            id="score"
            {...registrarInput(`questoes.${indice}.score`, { required: "Peso" })}
            defaultValue={questao && questao.score}
        />

        <label htmlFor="min_value">Menor Alternativa</label>
        <input
            type="text"
            id="min_value"
            {...registrarInput(`questoes.${indice}.min_value`, { required: "Menor Alternativa" })}
            defaultValue={questao && questao.min_value}
        />

        <label htmlFor="max_value">Maior Alternativa</label>
        <input
            type="text"
            id="max_value"
            {...registrarInput(`questoes.${indice}.max_value`, { required: "Maior Alternativa" })}
            defaultValue={questao && questao.max_value}
        />

        <DropdownDimensoes
            dimensoes={dimensoes}
            registrarInput={registrarInput}
            indice={indice}
            questao={questao}
        />

    </article>
}

async function buscarDimensoes() {
    return get('/dimension').then(requisicao => requisicao.data)
}

export function Questoes({ questoes, registrarInput, adicionar, remover, dimensoes }) {
    const atributos = { adicionar, remover, registrarInput, dimensoes };
    return questoes.map((questao, indice) => <Questao
        key={questao.id}
        indice={indice}
        {...atributos}
    />)
}

export function CadastroQuestoes({ quantidadeQuestoes,
    novasQuestoes,
    registrarInput,
    adicionar,
    remover,
    questoes
}) {
    const { data, isLoading } = useQuery(CACHE_TYPES.DIMENSAO, buscarDimensoes, CACHE_CONFIGURACAO)

    const propDadosQuestoes = questoes || novasQuestoes;
    const propsQuestoes = { registrarInput, adicionar, remover, questoes: propDadosQuestoes, dimensoes: data };


    if (isLoading) {
        return <Carregando />
    }

    return <>

        <InformacaoQuestao />

        <BotaoPrimeiraQuestao
            adicionar={adicionar}
            quantidadeQuestoes={quantidadeQuestoes}
        />

        <Questoes {...propsQuestoes} />

    </>
}