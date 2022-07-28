import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ModalEncerrarSemestre } from '../novos-modais/SemestreModal/modalEncerrar';
import { DADOS } from '../tabela/Sessao/colunas';
import { atualizarSemestre, pegarSemestreAberto } from '../../../api/semestre.js';
import { ModalEditarSessao } from '../novos-modais/SemestreModal/modalEditarSessao';
import { ModalAdicionarSessao } from '../novos-modais/SemestreModal/modalAdicionarSessao';
import { Carregando } from '../Carregando';

function HomeCoordenador() {
    const [semestre, setSemestre] = useState(null);
    const [aceitacao, setAceitacao] = useState();
    const [sessao, setSessaoPoster] = useState();
    const [cadastro, setCadastro] = useState();
    const [dado, setNovosDados] = useState([]);
    const atualizarPagina = (value) => setNovosDados(current => current + value);

    useEffect(() => {
        const buscarSemestre = async () => {
            const res = await pegarSemestreAberto();
            setSemestre(res.data);
        };

        buscarSemestre();
    }, [dado]);

    async function atualizarInformacoes(e) {
        e.preventDefault();
        const idSemestre = semestre._id;
        await atualizarSemestre(idSemestre, {
            permissoes: {
                cadastraProjeto: cadastro,
                professorAceitaProjeto: aceitacao,
                sessaoPoster: sessao
            }
        });
    };

    if(!semestre) return <Carregando />;
    return <> {semestre.length === 0 ? (
        <div>
            <h2>Não há semestres cadastrados!</h2>
            <div className="red accent-4 center">
                <div style={{ padding: "50px" }}>
                    <h3 className="white-text">Cadastrar Semestre</h3>
                    <Link to="/semestre" className="white-text">Cadastrar um novo semestre!</Link>
                </div>
            </div>
            <a href="/semestre">
                <div className="grey darken-2 white-text center" style={{ padding: "15px" }}>
                    CLIQUE AQUI
                </div>
            </a>
        </div>
    ) : (
        <div className="section">
            <div>
                <h2 className="center">
                    {semestre[0].titulo}
                </h2>
            </div>
            <br />
            <br />
            <div className="section card">
                <div>
                    <div className="section card-title center">
                        <h4>Controle do Semestre</h4>
                        <h6>Data de inicio de semestre: {semestre[0].dataAbertura}</h6>
                    </div>
                    <div className="card-content">
                        <div className="section">
                            <div className="row">
                                <div style={{ display: "flex", flexWrap: "wrap" }}>
                                    <h5><b>Sessão de Pôster</b></h5>
                                    <div className="row">
                                        <div className="col s6"><ModalAdicionarSessao /></div>
                                        <div className="col s6 right"><ModalEditarSessao /></div>
                                    </div>
                                </div>
                            </div>
                            <table>
                                <tbody>
                                    {DADOS.map((DADOS, index) => <tr key={index}> <td> <span><b>{DADOS.sessao}</b></span> <p>Quantidade de pôsteres na sessão: {DADOS.posteres} <br /> Situação: {DADOS.situacao}</p></td></tr>)}
                                </tbody>
                            </table>
                        </div>
                        <div className="section">
                            <div className="row">
                                <div className="col s8">
                                    <h5><b>Autorizações</b></h5>
                                </div>
                            </div>
                            <ul className="collection">
                                <form>
                                    <li className="collection-item avatar" style={{ paddingLeft: "13px" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItens: "center", flexWrap: "wrap" }}>
                                            <div>
                                                <span className="title">
                                                    <i className="material-icons left" style={{ fontSize: "37px" }}>border_color</i>
                                                    <b>Habilitar Cadastro de Projetos</b>
                                                </span>
                                                {!semestre[0].permissoes.cadastraProjeto ? (
                                                    <p>Desabilitado</p>
                                                ) : (
                                                    <p>Habilitado</p>
                                                )}
                                            </div>
                                            <div className="col s1 offset-s12 right-align" style={{ marginRight: "1.5rem" }}>
                                                <p onClick={(e) => setCadastro(e.target.value)}>
                                                    <label>
                                                        <input name="group1" id="tres" type="radio" value={true} />
                                                        <span>Sim</span>
                                                    </label>
                                                    <label>
                                                        <input name="group1" id="quatro" type="radio" value={false} />
                                                        <span>Não</span>
                                                    </label>
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                </form>
                                <form>
                                    <li className="collection-item avatar" style={{ paddingLeft: "13px" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItens: "center", flexWrap: "wrap" }}>
                                            <div>
                                                <span className="title">
                                                    <i className="material-icons left" style={{ fontSize: "37px" }}>supervisor_account</i>
                                                    <b>Habilitar Aceitação do Professor</b>
                                                </span>
                                                {!semestre[0].permissoes.professorAceitaProjeto ? (
                                                    <p>Desabilitado</p>
                                                ) : (
                                                    <p>Habilitado</p>
                                                )}
                                            </div>
                                            <div className="col s1 offset-s12 right-align" style={{ marginRight: "1.5rem" }}>
                                                <p onClick={(e) => setAceitacao(e.target.value)}>
                                                    <label>
                                                        <input name="group2" id="sete" type="radio" value={true} />
                                                        <span>Sim</span>
                                                    </label>
                                                    <label>
                                                        <input name="group2" id="oito" type="radio" value={false} />
                                                        <span>Não</span>
                                                    </label>
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                </form>
                                <form>
                                    <li className="collection-item avatar" style={{ paddingLeft: "13px" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItens: "center", flexWrap: "wrap" }}>
                                            <div>
                                                <span className="title">
                                                    <i className="material-icons left" style={{ fontSize: "37px" }}>assignment</i>
                                                    <b>Habilitar Sessão de Pôster</b>
                                                </span>
                                                {!semestre[0].permissoes.sessaoPoster ? (
                                                    <p>Desabilitado</p>
                                                ) : (
                                                    <p>Habilitado</p>
                                                )}
                                            </div>
                                            <div className="col s1 offset-s12 right-align" style={{ marginRight: "1.5rem" }}>
                                                <p onClick={(e) => setSessaoPoster(e.target.value)}>
                                                    <label>
                                                        <input name="group3" id="onze" type="radio" value={true} />
                                                        <span>Sim</span>
                                                    </label>
                                                    <label>
                                                        <input name="group3" id="doze" type="radio" value={false} />
                                                        <span>Não</span>
                                                    </label>
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                </form>
                            </ul>
                        </div>
                        <div className="row">
                            <div className="col s4">
                                <ModalEncerrarSemestre atualizar={atualizarPagina} />
                            </div>
                            <div className='right-align col s8'>
                                <form onSubmit={atualizarInformacoes}>
                                    <button type="submit" className="btn red accent-4" style={{ marginRight: '1rem' }}>Salvar alterações</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )}
    </>;
}

export default HomeCoordenador;