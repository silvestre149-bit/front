import React, { useEffect, useState } from 'react';
import { MdFormatListBulleted, MdPersonOutline, MdTimer } from 'react-icons/md';
import { Carregando } from '../../../../components/Carregando';
import { buscarProjetoDoAluno, buscarCoordenadorDoProjeto } from '../../../../../api/projeto';
import { ModalConvidarOrientador } from '../../../../components/novos-modais/ProjetoModal/ConvidarOrientador.jsx';
import { useContext } from 'react';
import { AuthContext } from '../../../../context/Auth';

export default function MeuProjeto() {
    const { usuario } = useContext(AuthContext);
    const [projeto, setProjeto] = useState([]);
    const [dados, setNovosDados] = useState(0);
    const [carregando, setCarregando] = useState(true);
    const [coordenador, setCoordenador] = useState();

    useEffect(() => {
        const buscarDadosProjeto = async () => {
            const resProjeto = await buscarProjetoDoAluno(usuario._id);
            setProjeto(resProjeto.data);
            const resCoordenador = await buscarCoordenadorDoProjeto(resProjeto.data._id);
            setCoordenador(resCoordenador.data);
            setCarregando(false);
        };

        buscarDadosProjeto();
    }, [dados])

    const atualizarDados = (novoDado) => {
        setNovosDados(dados + novoDado);
    };

    if (carregando) return <Carregando />

    return <>
        <div className="card">
            <h1 className="center">Projeto</h1>
            <div className="section">
            </div>
            <br />
            <br />
            <div className="section">
                {coordenador ? (
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