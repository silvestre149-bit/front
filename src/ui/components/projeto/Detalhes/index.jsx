import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { buscarAvaliadorDoProjeto, buscarSuplenteDoProjeto, pegarProjeto, buscarOrientadorDoProjeto } from '../../../../api/projeto';
import { MdFormatListBulleted, MdPersonOutline, MdTimer } from 'react-icons/md';
import { Carregando } from '../../Carregando';
import RecusarConvite from './Botoes/recusar';
import AceitarConvite from './Botoes/aceitar.jsx';
import AceitarConviteOrientador from './Botoes/aceitarOrientador';

export function ProjetoDetalhes() {
    const [projeto, setProjeto] = useState({});
    const [orientador, setOrientador] = useState({});
    const [avaliador, setAvaliador] = useState({});
    const [suplente, setSuplente] = useState({});
    const [carregando, setCarregando] = useState(true);
    const [atualizar, setAtualizar] = useState(false);
    const location = useLocation();
    const state = location.state;

    const atualizarPagina = () => setAtualizar(!atualizar);

    useEffect(() => {
        const buscarProjeto = async () => {
            const res = await pegarProjeto(state.projeto);
            setProjeto(res.data);
        };
        const buscarProfessores = async () => {
            const orientador = await buscarOrientadorDoProjeto(state.projeto);
            const avaliador = await buscarAvaliadorDoProjeto(state.projeto);
            const suplente = await buscarSuplenteDoProjeto(state.projeto);
            setOrientador(orientador.data);
            setAvaliador(avaliador.data);
            setSuplente(suplente.data);
            setAtualizar(false);
            setCarregando(false);
        };

        buscarProjeto();
        buscarProfessores();
    }, [atualizar])

    if (carregando || !projeto) return <Carregando />
    
    return <>
        <div>
            <h1 className="center">Projeto</h1>
            <div className="section">
            </div>
            <br />
            <div className="card section">
                <div>
                    <div>
                        {state.tipo === 'orientador' &&
                            <>  <div className='row'>
                                <div className="col s2">
                                    <AceitarConviteOrientador projeto={projeto._id} convite={state.convite} />
                                </div>
                                <div className="col s2">
                                    <RecusarConvite aluno={state.remetente} projeto={projeto._id} tipo="orientador" convite={state.convite} />
                                </div>
                            </div>
                            </>
                        }
                        {state.tipo === 'avaliacao' &&
                            <div className='row'>
                                <div className="col s2">
                                    <AceitarConvite projeto={projeto._id} tipo="avaliador" convite={state.convite} />
                                </div>
                                <div className='col s2'>
                                    <RecusarConvite aluno={state.remetente} projeto={projeto._id} tipo="avaliador" convite={state.convite} />
                                </div>
                            </div>
                        }
                        {state.tipo === 'suplente' &&
                            <div className='row'>
                                <div className="col s2">
                                    <AceitarConvite projeto={projeto._id} tipo="suplente" convite={state.convite} />
                                </div>
                                <div className='col s2'>
                                    <RecusarConvite aluno={state.remetente} projeto={projeto._id} tipo="suplente" convite={state.convite} />
                                </div>
                            </div>}
                        {state.tipo === 'aluno' &&
                            <div className='row'>
                                <div className="col s2">
                                    <AceitarConvite projeto={projeto._id} tipo="aluno" convite={state.convite} atualizar={atualizarPagina} />
                                </div>
                                <div className='col s2'>
                                    <RecusarConvite aluno={state.remetente} projeto={projeto._id} tipo="aluno" convite={state.convite} />
                                </div>
                            </div>}
                        {state.tipo === 'cancelamento' &&
                            <div className='row'>
                                <div className="col s2">
                                    <AceitarConvite projeto={projeto._id} tipo="cancelamento" convite={state.convite} atualizar={atualizarPagina} />
                                </div>
                                <div className='col s2'>
                                    <RecusarConvite aluno={state.remetente} projeto={projeto._id} tipo="aluno" convite={state.convite} />
                                </div>
                            </div>}
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
                                    {projeto.cronogramaDeOrientacao ? (
                                        <li className="collection-item avatar">
                                            <i className="material-icons circle"><MdTimer /></i>
                                            <span className="title">
                                                <b>Cronograma de orientação</b>
                                            </span>
                                            <p>
                                                Data: {projeto.cronogramaDeOrientacao.data} -
                                                Horário: {projeto.cronogramaDeOrientacao.horas}  <br />
                                                Local da orientação: {projeto.cronogramaDeOrientacao.local}
                                            </p>
                                        </li>
                                    ) : (
                                        <li className="collection-item avatar">
                                            <i className="material-icons circle"><MdTimer /></i>
                                            <span className="title">
                                                <b>Cronograma de orientação</b>
                                            </span>
                                            <p>Nenhum cronograma encontrado
                                            </p>
                                        </li>
                                    )}
                                    <li className="collection-item avatar">
                                        <i className="material-icons circle"><MdPersonOutline /> </i>
                                        <span className="title">
                                            <b>Orientador</b>
                                        </span>
                                        {orientador ? (
                                            <>
                                                <p>{orientador.nome}</p>
                                                {orientador.status === 'aceito' ? (
                                                    <div className="col s1 offset-s12 right-align">
                                                        <span className="badge green darken-4 white-text text-darken-2">Situação: {orientador.status}</span>
                                                    </div>
                                                ) : (
                                                    <div className="col s1 offset-s12 right-align">
                                                        <span className="badge yellow darken-4 white-text text-darken-2">Situação: {orientador.status}</span>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <p>Nenhum orientador presente</p>
                                                <div className="col s1 offset-s12 right-align">
                                                    <span className="badge red darken-4 white-text text-darken-2">Situação:  </span>
                                                </div>
                                            </>
                                        )}
                                        <p></p>
                                    </li>
                                    <li className="collection-item avatar">
                                        <i className="material-icons circle"><MdPersonOutline /> </i>
                                        <span className="title">
                                            <b>Avaliador</b>
                                        </span>
                                        {avaliador ? (
                                            <>
                                                <p>{avaliador.nome}</p>
                                                {avaliador.status === 'aceito' ? (
                                                    <div className="col s1 offset-s12 right-align">
                                                        <span className="badge green darken-4 white-text text-darken-2">Situação: {orientador.status}</span>
                                                    </div>
                                                ) : (
                                                    <div className="col s1 offset-s12 right-align">
                                                        <span className="badge yellow darken-4 white-text text-darken-2">Situação: {orientador.status}</span>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <p>Nenhum avaliador presente</p>
                                                <div className="col s1 offset-s12 right-align">
                                                    <span className="badge red darken-4 white-text text-darken-2">Situação:  </span>
                                                </div>
                                            </>
                                        )}
                                        <p></p>
                                    </li>
                                    <li className="collection-item avatar">
                                        <i className="material-icons circle"><MdPersonOutline /> </i>
                                        <span className="title">
                                            <b>Suplente</b>
                                        </span>
                                        {suplente ? (
                                            <>
                                                <p>{suplente.nome}</p>
                                                {suplente.status === 'aceito' ? (
                                                    <div className="col s1 offset-s12 right-align">
                                                        <span className="badge green darken-4 white-text text-darken-2">Situação: {orientador.status}</span>
                                                    </div>
                                                ) : (
                                                    <div className="col s1 offset-s12 right-align">
                                                        <span className="badge yellow darken-4 white-text text-darken-2">Situação: {orientador.status}</span>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <p>Nenhum suplente presente</p>
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
                                                            <td>{participante.turmas.turmaUm ? (
                                                                <>{participante.turmas.turmaUm}</>
                                                            ) : (
                                                                <></>
                                                            )}</td>
                                                            <td>{participante.turmas.turmaDois ? (
                                                                <>{participante.turmas.turmaDois}</>
                                                            ) : (
                                                                <></>
                                                            )}</td>
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
            {state.tipo === 'cancelamento' && <div>
                <div className="card center">
                    <div style={{ padding: "50px", margin: "50px" }}>
                        <h4 class="header">Pedido feito por: {state.remetente}</h4>
                        <p><strong>
                            Motivo:
                        </strong>
                            {state.descricao}
                        </p>
                    </div>
                </div>
            </div>}
        </div>
    </>
}

