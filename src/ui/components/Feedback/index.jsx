import React from 'react';

import { MdAssignment as Geral, MdStar as Estrela } from "react-icons/md";
import "./styles.css";

function Estrelas({ porcentagem }) {
    const qtdEstrelas = 5;
    const porcentagemTotal = 100;
    const quantidadeEstrelasValidas = Math.round((qtdEstrelas * porcentagem) / porcentagemTotal)
    const estrelas = [];
    let estrelaValida;
    for (let i = 1; i <= qtdEstrelas; i++) {
        estrelaValida = i <= quantidadeEstrelasValidas ? "estrela" : "estrela-apagada"
        estrelas.push(
            <h3 href="#!" key={i} className={estrelaValida}><Estrela /></h3>
        )
    }
    return <>{estrelas}</>
}

function CardFeedback({ dimensao, avaliacaoGeral }) {

    const titulo = dimensao ? dimensao.title.toUpperCase() : "Avaliação Geral";
    const nota = dimensao ? dimensao.nota_da_dimensao_em_porcentagem : avaliacaoGeral.avaliacao_em_porcentagem;
    const feedback = dimensao ? dimensao.feedback : avaliacaoGeral.feedback

    

    const gerarMensagem = () => {
        const { midScore, minScore } = feedback;
        if (nota <= minScore) {
            
            return feedback.minFeedback;
        } else if (nota > minScore && nota <= midScore) {
            
            return feedback.midFeedback
        } else {
            
            return feedback.maxFeedback
        }
    }

    return <>
        <section className="card-panel z-depth-2" >
            <section style={{ display: 'flex', justifyContent: 'center' }}>
                <h3 style={{ marginRight: '10px' }} className="material-icons circle"><Geral /></h3>
                <h3 style={{ marginRight: '10px' }}> {titulo} </h3>
            </section>

            <section style={{ textAlign: 'center' }}>
                <h6>{gerarMensagem()}</h6>
            </section>

            <div className="estrelas" style={{ display: 'flex', justifyContent: 'center' }}>
                <Estrelas porcentagem={nota} />
            </div>
        </section>
    </>
}

export function Feedback({ avaliado, avaliacaoTotal, formulario }) {
    const { avaliacao_em_porcentagem, dimensoes } = avaliacaoTotal;
    return <>

        <h1 style={{ textAlign: 'center' }}>{formulario.type}</h1>
        <h5>Veja o(s) feedback abaixo {avaliado}</h5>
        <br />

        <CardFeedback avaliacaoGeral={{ ...formulario, avaliacao_em_porcentagem }} />

        <br />
        <hr />
        <br />

        <h2 style={{ textAlign: 'center' }}>Dimensões avaliadas</h2>

        <br />
        <hr />
        <br />

        {dimensoes.map(dimensao => {
            return <div key={dimensao.id}>
                <CardFeedback dimensao={dimensao} />
                <br />
            </div >
        })}


    </>;
}