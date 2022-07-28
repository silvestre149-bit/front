
import React from 'react';

export function DetalhesPesquisa({ apresentarPesquisa }) {
    return <div className="card darken-1">
        <div className="card-content">
            <h3 className="center">Bem-vindo, vamos fazer uma pesquisa?</h3>
            <br />
            <h6> <p>

                Nós, da Faculdade de Computação e Informática (FCI) junto com o Centro de Ciências Sociais e Aplicadas (CCSA)
                da Universidade Presbiteriana Mackenzie
                estamos muito felizes por você disponibilizar o seu tempo para se juntar a nós e poder fazer essa pesquisa.
            </p>
                <br />
                <p>
                    Para realizar a pesquisa clique no botão abaixo. Você será redirecionado para um questionário que deverá ser
                    respondido por completo, nele cada questão deve ter apenas uma resposta.
                </p>
                <br />
                <p>
                    Clique no botão abaixo e vamos lá!
                </p>
            </h6>
            <br />
        </div>
        <div className="center" >
            <a className="blue white-text" onClick={apresentarPesquisa} style={{ padding: "20px" }} href="/#questionario-titulo">Fazer pesquisa</a>
        </div>
    </div>
}