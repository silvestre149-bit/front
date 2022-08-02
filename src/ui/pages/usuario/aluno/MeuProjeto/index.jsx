import React, { useEffect, useState } from 'react';
import { MdFormatListBulleted, MdPersonOutline, MdTimer } from 'react-icons/md';
import { Carregando } from '../../../../components/Carregando';
import { buscarProjetoDoAluno, buscarOrientadorDoProjeto, buscarAvaliadorDoProjeto, buscarSuplenteDoProjeto } from '../../../../../api/projeto';
import { ModalConvidarOrientador } from '../../../../components/novos-modais/ProjetoModal/ConvidarOrientador.jsx';
import { useContext } from 'react';
import { AuthContext } from '../../../../context/Auth';

export default function MeuProjeto() {
    const { usuario } = useContext(AuthContext);
    const [projeto, setProjeto] = useState([]);
    const [dados, setNovosDados] = useState(0);
    const [orientador, setOrientador] = useState();
    const [avaliador, setAvaliador] = useState();
    const [suplente, setSuplente] = useState();
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const buscarProfessores = async () => {
            const projeto = await buscarProjetoDoAluno(usuario._id);
            const orientador = await buscarOrientadorDoProjeto(projeto.data._id);
            const avaliador = await buscarAvaliadorDoProjeto(projeto.data._id);
            const suplente = await buscarSuplenteDoProjeto(projeto.data._id);

            setProjeto(projeto.data);
            setOrientador(orientador.data);
            setAvaliador(avaliador.data);
            setSuplente(suplente.data);
            setCarregando(false);
        };

        buscarProfessores();
    }, [dados])

    const atualizarDados = (novoDado) => {
        setNovosDados(dados + novoDado);
        setCarregando(true);
    };

    if (carregando) return <Carregando />

    console.log(orientador);
    return <>
        <div className="card">
            <h1 className="center">Projeto</h1>
            <div className="section">
            </div>
            <br />
            <br />
            <div className="section">
                {orientador ? (
                    <></>
                ) : (
                    <ModalConvidarOrientador atualizar={atualizarDados} dadosProjeto={projeto} dadosAluno={usuario} />
                )}
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
                                    {projeto.sessaodePoster ? (
                                        <li className="collection-item avatar">
                                            <i className="material-icons circle"><MdTimer /></i>
                                            <span className="title">
                                                <b>Avaliação do pôster</b>
                                            </span>
                                            <p>Data: - Horário:  <br /> Local da avaliação:
                                            </p>
                                        </li>
                                    ) : (
                                        <li className="collection-item avatar">
                                            <i className="material-icons circle"><MdTimer /></i>
                                            <span className="title">
                                                <b>Avaliação do pôster</b>
                                            </span>
                                            <p>Nenhuma sessão de pôster encontrada
                                            </p>
                                        </li>
                                    )}
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
                                                        <span className="badge green darken-4 white-text text-darken-2">Situação: {avaliador.status}</span>
                                                    </div>
                                                ) : (
                                                    <div className="col s1 offset-s12 right-align">
                                                        <span className="badge yellow darken-4 white-text text-darken-2">Situação: {avaliador.status}</span>
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
                                                        <span className="badge green darken-4 white-text text-darken-2">Situação: {suplente.status}</span>
                                                    </div>
                                                ) : (
                                                    <div className="col s1 offset-s12 right-align">
                                                        <span className="badge yellow darken-4 white-text text-darken-2">Situação: {suplente.status}</span>
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