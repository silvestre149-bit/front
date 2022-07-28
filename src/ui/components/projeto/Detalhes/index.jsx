import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { pegarProjeto } from '../../../../api/projeto';
import { MdFormatListBulleted, MdPersonOutline, MdTimer } from 'react-icons/md';
import { buscarCoordenadorDoProjeto } from '../../../../api/projeto';

export function ProjetoDetalhes() {
    const [projeto, setProjeto] = useState({});
    const [coordenador, setCoordenador] = useState({});
    const location = useLocation();
    const state = location.state;

    useEffect(() => {
        const buscarProjeto = async () => {
            const res = await pegarProjeto(state.projetoId);
            setProjeto(res.data);
        };

        const buscarCoordenador = async () => {
            const res = await buscarCoordenadorDoProjeto(state.projetoId);
            setCoordenador(res.data);
        }

        buscarProjeto();
        buscarCoordenador();
    }, [])
    return <>
        <div className="card">
            <h1 className="center">Projeto</h1>
            <div className="section">
            </div>
            <br />
            <br />
            <div className="section">
                <div>
                    <div>
                        <div className="section card-title center">
                            <h4>{projeto.titulo}</h4>
                        </div>
                        <div className="card-content ">
                            <div className="section">
                                <div className="row">
                                    <div className="col s12">
                                        <h5>
                                            <b>Dados do Projeto:</b>
                                        </h5>
                                        <p className="right">Situação do projeto: {projeto.status} </p>
                                    </div>
                                </div>
                                <ul className="collection">
                                    <li className="collection-item avatar">
                                        <i className="material-icons circle"><MdFormatListBulleted /></i>
                                        <span className="title">
                                            <b>Descrição</b>
                                            <p>{projeto.descricao}</p>
                                        </span>
                                        <p>
                                        </p>
                                    </li>
                                    <li className="collection-item avatar">
                                        <i className="material-icons circle"><MdFormatListBulleted /></i>
                                        <span className="title">
                                            <b>Disciplina</b>
                                            <p>{projeto.disciplina}</p>
                                        </span>
                                        <p>
                                        </p>
                                    </li>
                                    <li className="collection-item avatar">
                                        <i className="material-icons circle"><MdTimer /></i>
                                        <span className="title">
                                            <b>Avaliação do pôster</b>
                                        </span>
                                        <p>Data: - Horário:  <br /> Local da avaliação:
                                        </p>
                                    </li>
                                    <li className="collection-item avatar">
                                        <i className="material-icons circle"><MdPersonOutline /> </i>
                                        <span className="title">
                                            <b>Orientador</b>
                                        </span>
                                        {coordenador ? (
                                            <>
                                                <p>{coordenador.nome}</p>
                                                {coordenador.status === 'aceito' ? (
                                                    <div className="col s1 offset-s12 right-align">
                                                        <span className="badge green darken-4 white-text text-darken-2">Situação: {coordenador.status}</span>
                                                    </div>
                                                ) : (
                                                    <div className="col s1 offset-s12 right-align">
                                                        <span className="badge yellow darken-4 white-text text-darken-2">Situação: {coordenador.status}</span>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <p>Nenhum coordenador presente</p>
                                                <div className="col s1 offset-s12 right-align">
                                                    <span className="badge red darken-4 white-text text-darken-2">Situação:  </span>
                                                </div>
                                            </>
                                        )}
                                        <p></p>
                                    </li>
                                </ul>
                            </div>
                            <div className="section">
                                <div className="row">
                                    <div className="col s8">
                                        <h5><b> Dados da Equipe </b></h5>
                                    </div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Aluno</th>
                                                <th>TIA</th>
                                                <th>1º Turma</th>
                                                <th>2º Turma</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {projeto.participantes.map((participante) => {
                                                if (participante.tipo === 'aluno') {
                                                    return <>
                                                        <tr>
                                                            <td>{participante.nome}</td>
                                                            <td>{participante.cod}</td>
                                                            <td>{participante.turmas.turmaUm}</td>
                                                            <td>{participante.turmas.turmaDois}</td>
                                                        </tr>
                                                    </>;
                                                }
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

