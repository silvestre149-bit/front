import React from 'react';

export const AvisosPoster = () => {
    return <>
        <div className="col s12">
            <div className="card">
                <div className="card-content white-text  green darken-3">
                    <p>Atenção <b>Professores!!</b> Entrem no sistema normalmente para avaliar seus pôsteres
                    </p>
                </div>
            </div>
        </div>
        <div className="col s12">
            <div className="card">
                <div className="card-content white-text  green darken-3">
                    <p>Atenção <b>Alunos e Visitantes!!</b> Está liberado a Avaliação de pôsteres, Clique
                        abaixo.</p>
                    <div className="section">
                        <div className="col s12 center">
                            {/*Botão entrar*/}
                            <a href="/avaliacao" className="  btn-large center red accent-4 z-depth-3">
                                Avaliação
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
}