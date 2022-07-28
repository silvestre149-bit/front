import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router";
import M from 'materialize-css';
import jwt from 'jwt-decode';
import { MdAddBox as Add, MdClose as Close } from "react-icons/md";
import { pegarTodosUsuarios } from '../../../../api/aluno';
import { resetarSenha } from '../../../../api/alterarPerfil';
import { formAluno, formSessao, formSemestre } from './formsModel';
import { deletarAlunos, deletarProjetos,
    deletarUsuarios, fecharSemestre,
    pegarSemestre
} from '../../../../api/semestre.js';
import MessageTemplate from '../../errorMessageTemplate';

/**
 * @property {String} tipoModal
 * @property {String} tipoPagina
 * @property {String} texto1
 * @property {String} texto2
 * @property {String} texto3
 * @property {String} rota
 * @property {String} nomeRota
 * @property {String} id
 * @property {String} valor
 */

export function ModalTemplate({
    tipoModal,
    tipoPagina,
    rota,
    nomeRota,
    alterarSemestre
}) {

    const [semestre, setSemestre] = useState(formSemestre);
    const [aluno, setAluno] = useState(formAluno);
    const [sessao, setSessao] = useState(formSessao);
    const [status, setStatus] = useState('');
    const [descricao, setDescricao] = useState('');
    const [feedback, setFeedback] = useState({
        status: "",
        descricao: ""
    });
    const [usuarios, setUsuarios] = useState();
    const [semestreSelecionado, setSelecionarSemestre] = useState();
    const [dadosColunas, setDadosColunas] = useState([]);
    const [items, setItems] = useState([]);
    const [selects, setSelects] = useState();
    const getToken = localStorage.getItem('token');
    const decode = jwt(getToken);
    const history = useHistory();

    const reload = () => {
        setTimeout(() => {
            window.location.reload(true);
        }, 3000);
    }
    const novaArray = [];

    const pegarDadosSessao = (e, form) => {
        const { name, value } = e.target;

        setSessao({ ...form, [name]: value });

    }

    useEffect(() => {
        var elemsModal = document.querySelectorAll(".modal");
        M.Modal.init(elemsModal, {
            opacity: 0.5,
            preventScrolling: true,
            dismissible: false,
        });
    }, []);

    useEffect(() => {
        const buscarSemestre = async () => {
            await pegarSemestre()
                .then(res => {
                    setDadosColunas(res.data)
                })
                .catch(error => console.log(error));
        }

        buscarSemestre();

    }, [])

    useEffect(() => {
        const buscarUsuarios = async () => {
            const res = await pegarTodosUsuarios();

            setUsuarios(res.data);
        }

        buscarUsuarios();

    }, [])

    const verificarSemestre = dadosColunas.filter((semestre) => {
        return semestre.status === 'aberto';
    }).map((semestre) => {
        return semestre.status;
    })

    const editarSessao = async (e) => {

    }

    const deletarSemestre = async () => {
        if (semestre === false) {
            setStatus('falha');
            setDescricao("Não foi possível deletar o semestre, aguarde e tente novamente!");
            reload();
        }

        setStatus('sucesso');
        setDescricao("Semestre deletado com sucesso, aguarde!");
        await deletarSemestre(semestre);
        reload();
    }

    const listaSemestre = dadosColunas.filter((semestre) => {
        return semestre.status === 'aberto'
    }).map((semestre) => {
        let semestres = {};
        semestres.nome = semestre.titulo;
        semestres.data = semestre.createdAt;
        semestres.id = semestre._id;
        semestres.status = semestre.status;
        return semestres;
    })

    const cancelarSemestre = async (e) => {
        e.preventDefault();
        const semestreID = listaSemestre[0].id;

        await deletarAlunos();
        await deletarProjetos();
        await fecharSemestre(semestreID);
        return setFeedback({ status: 'sucesso', descricao: 'Semestre cancelado com sucesso!' });    
}

    const cancelarProjeto = (e) => {
        e.preventDefault();
    }

    const aceitarTCC = (e) => {

    };

    const resetSenha = async () => {
        await resetarSenha(decode._id, { "cod": decode.cod })
        history.push('/logout')
    }

    return <>
        {
            /* Adicionar Sessao */
            tipoModal === "adicionar" && tipoPagina === "sessao" && < div >
                <br />
                <div style={{ marginBottom: '15px' }}>
                    <div className="row">
                        <div className="col s12">
                            <a href="#adicionarSessao" className="btn red accent-4 modal-trigger">
                                <Add style={{
                                    verticalAlign: "middle", marginRight: "0.5em"
                                }} />Adicionar Sessão
                            </a>
                        </div>
                    </div>

                    <div id="adicionarSessao" className="modal">
                        <div className="modal-content">
                            <a href="#!" className="modal-close btn-flat" style={{ float: "right" }}><Close className="grey-text" style={{ width: '100%', height: '100%' }} /></a>
                            <div className="container">
                                <h4 style={{ marginTop: '1em', fontSize: '1.8em' }}><b>Adicionar sessão</b></h4>
                                <form className="col s12" onSubmit={editarSessao}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input id="name" type="text" value={sessao.data} onChange={e => pegarDadosSessao(e.target.value, sessao)} />
                                            <label for="name">Data da sessão</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input id="name" type="text" value={sessao.quantidade} onChange={e => pegarDadosSessao(e.target.value, sessao)} />
                                            <label for="name">Quantidade de pôsteres</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input id="name" type="text" value={sessao.apresentacao} onChange={(e) => pegarDadosSessao(e.target.value, sessao)} />
                                            <label for="name">Local da Apresentação</label>
                                        </div>
                                    </div>

                                    <MessageTemplate type={status} mensagem={descricao} />
                                    <button type="submit" id="addProf" className="btn red accent-4 center">Salvar alterações</button>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer" style={{
                            display: "flex", justifyContent: "center", marginBottom: "1.5em"
                        }}>
                        </div>
                    </div>
                </div>
            </div>
        }

        {
            /* Editar Sessao */
            tipoModal === "editar" && tipoPagina === "sessao" && < div >
                <br />
                <div style={{ marginBottom: '15px' }}>
                    <div className="row">
                        <div className="col s12">
                            <a href="#editarSessao" className="btn red accent-4 modal-trigger">
                                Editar Sessão
                            </a>
                        </div>
                    </div>

                    <div id="editarSessao" className="modal">
                        <div className="modal-content">
                            <a href="#!" className="modal-close btn-flat" style={{ float: "right" }}><Close className="grey-text" style={{ width: '100%', height: '100%' }} /></a>
                            <div className="container">
                                <h4 style={{ marginTop: '1em', fontSize: '1.8em' }}><b>Editar sessão</b></h4>
                                <div class="row">
                                    <label>Selecione a sessão a ser editada.</label>
                                    <div className="custom-select">
                                        <select value={selects} onChange={e => setSelects(e.target.value)} class="browser-default select-options ">
                                            <option value="1">Sessão 1</option>
                                            <option value="2">Sessão 2</option>
                                        </select>
                                        <span className="custom-arrow"></span>
                                    </div>
                                </div>
                                <form className="col s12" onSubmit={editarSessao}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input id="name" type="text" value={sessao.data} onChange={e => pegarDadosSessao(e.target.value, sessao)} />
                                            <label for="name">Data da sessão</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input id="name" type="text" value={sessao.quantidade} onChange={e => pegarDadosSessao(e.target.value, sessao)} />
                                            <label for="name">Quantidade de pôsteres</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input id="name" type="text" value={sessao.apresentacao} onChange={e => pegarDadosSessao(e.target.value, sessao)} />
                                            <label for="name">Local da Apresentação</label>
                                        </div>
                                    </div>

                                    <MessageTemplate type={status} mensagem={descricao} />
                                    <button type="submit" id="addProf" className="btn red accent-4 center">Salvar alterações</button>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer" style={{
                            display: "flex", justifyContent: "center", marginBottom: "1.5em"
                        }}>
                        </div>
                    </div>
                </div>
            </div>
        }

        {
            /* Aceitar Projeto Para Sessão */
            tipoModal === "aceitar" && tipoPagina === "tcc" && < div >
                <br />
                <div style={{ marginBottom: '15px' }}>
                    <div className="row">
                        <div className="col s12">
                            <a href="#adicionarProfessor" className="btn red accent-4 modal-trigger">
                                Aceitar Projeto
                            </a>
                        </div>
                    </div>

                    <div id="aceitarProjeto" className="modal">
                        <div className="modal-content">
                            <a href="#!" className="modal-close btn-flat" style={{ float: "right" }}><Close className="grey-text" style={{ width: '100%', height: '100%' }} /></a>
                            <div className="container">
                                <h4 style={{ marginTop: '1em', fontSize: '1.8em' }}><b>Aceitar Projeto</b></h4>
                                <form className="col s12" onSubmit={aceitarTCC}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input id="name" type="text" value={sessao} onChange={(e) => setSessao(e.target.value)} />
                                            <label for="name">Sessão</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input name="local" id="local" type="text" value={formSessao.horario} onChange={e => pegarDadosSessao(e.target.value, formSessao)} />
                                            <label name="local" for="local">Horário</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input name="local" id="local" type="text" value={formSessao.local} onChange={e => pegarDadosSessao(e.target.value, formSessao)} />
                                            <label name="local" for="local">Local</label>
                                        </div>
                                    </div>
                                    <button type="submit" id="addProf" className="btn red accent-4 center">Salvar alterações</button>
                                    <h4 id="error" className="center red-text"></h4>
                                    <h4 id="error-cadastrar-alunos-profs" className="center red-text"></h4>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer" style={{
                            display: "flex", justifyContent: "center", marginBottom: "1.5em"
                        }}>
                        </div>
                    </div>
                </div>
            </div>
        }
        {
            /* Encerrar Semestre */
            tipoModal === "confirmacao" && tipoPagina === "encerramento" && <div>
                <div style={{ marginBottom: '15px' }}>
                    <div className="row">
                        <div className="col s12">
                            <a href={rota} className="btn red accent-4 modal-trigger" >encerrar semestre
                            </a>
                        </div>
                    </div>

                    <div id={nomeRota} className="modal">
                        <div className="modal-content">
                            <a href="#!" className="modal-close btn-flat" style={{ float: "right" }}><Close className="grey-text" style={{ width: '100%', height: '100%' }} /></a>
                            <div className="container">
                                <h4 style={{ marginTop: '1em', fontSize: '1.8em' }}><b>Confirmação de encerramento</b></h4>
                                <p style={{ marginTop: '2em', fontSize: '1.2em', marginBottom: '1.5em' }}><b>Tem certeza que deseja encerrar o semestre?</b></p>
                            </div>
                        </div>
                        <div className="modal-footer" style={{
                            display: "flex", justifyContent: "right", marginBottom: "1.5em", paddingRight: "3rem"
                        }}>
                            <MessageTemplate type={status} mensagem={descricao} />
                            <form onSubmit={cancelarSemestre}>
                                <button type="submit" id="encerrar" className="modal-close btn red accent-4" style={{ marginRight: '1rem' }}>Encerrar</button>
                                <button type="button" id="naoEncerrar" className="modal-close btn grey">Não encerrar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>}

        {
            /* Salvar Alterações do Semestre */
            tipoModal === "editar" && tipoPagina === "home" && <div>
                <div style={{ marginBottom: '15px' }}>
                    <div className="row">
                        <div className="col s12">
                            <a href={rota} className="btn red accent-4 modal-trigger" >salvar alterações
                            </a>
                        </div>
                    </div>

                    <div id={nomeRota} className="modal">
                        <div className="modal-content">
                            <a href="#!" className="modal-close btn-flat" style={{ float: "right" }}><Close className="grey-text" style={{ width: '100%', height: '100%' }} /></a>
                            <div className="container">
                                <h4 style={{ marginTop: '1em', fontSize: '1.8em' }}><b>Confirmação para salvar</b></h4>
                                <p style={{ marginTop: '2em', fontSize: '1.2em', marginBottom: '1.5em' }}><b>Tem certeza que deseja salvar as alterações?</b></p>
                            </div>
                        </div>
                        <div className="modal-footer" style={{
                            display: "flex", justifyContent: "right", marginBottom: "1.5em", paddingRight: "3rem"
                        }}>
                            <form onSubmit={alterarSemestre}>
                                <button type="submit" className="modal-close btn red accent-4" style={{ marginRight: '1rem' }}>Salvar</button>
                                <button type="button" className="modal-close btn grey">Não salvar</button>
                            </form>
                            <h4 id="mensagem-semestre" className="red"></h4>
                        </div>
                    </div>
                </div>
            </div>}

        {
            /* Confirmar Cancelamento de Projeto */
            tipoModal === "confirmacao-projeto" && tipoPagina === "encerramento-projeto" && <div>
                <div style={{ marginBottom: '15px' }}>
                    <div className="row">
                        <div className="col s12">
                            <a href={rota} className="btn red accent-4 modal-trigger" >Enviar Solicitação
                            </a>
                        </div>
                    </div>
                    <div id={nomeRota} className="modal">
                        <div className="modal-content">
                            <a href="#!" className="modal-close btn-flat" style={{ float: "right" }}><Close className="grey-text" style={{ width: '100%', height: '100%' }} /></a>
                            <div className="container">
                                <h4 style={{ marginTop: '1em', fontSize: '1.8em' }}><b>Confirmação de cancelamento</b></h4>
                                <p style={{ marginTop: '2em', fontSize: '1.2em', marginBottom: '1.5em' }}><b>Tem certeza que deseja enviar a solicitação de cancelamento?</b></p>
                            </div>
                        </div>
                        <div className="modal-footer" style={{
                            display: "flex", justifyContent: "right", marginBottom: "1.5em", paddingRight: "3rem"
                        }}>
                            <MessageTemplate type={status} mensagem={descricao} />
                            <form onSubmit={cancelarProjeto}>
                                <button type="submit" id="encerrar" className="modal-close btn red accent-4" style={{ marginRight: '1rem' }}>Enviar</button>
                            </form>
                            <button type="button" id="naoEncerrar" className="modal-close btn grey">Não enviar</button>
                        </div>
                    </div>
                </div>
            </div>}

        {
            /* Resetar Senha */
            tipoModal === "confirmacao" && tipoPagina === "resetar" && <div>
                <div style={{ marginBottom: '15px' }}>
                    <div className="row">
                        <div className="col s12">
                            <a href={rota} className="btn red accent-4 modal-trigger" style={{
                                float: "right"
                            }}>
                                resetar senha
                            </a>
                        </div>
                    </div>

                    <div id={nomeRota} className="modal">
                        <div className="modal-content">
                            <a href="#!" className="modal-close btn-flat" style={{ float: "right" }}><Close className="grey-text" style={{ width: '100%', height: '100%' }} /></a>
                            <div className="container">
                                <h4 style={{ marginTop: '1em', fontSize: '1.8em' }}><b>Confirmação</b></h4>
                                <p style={{ marginTop: '2em', fontSize: '1.2em', marginBottom: '1.5em' }}><b>Tem certeza que deseja resetar sua senha?</b></p>
                            </div>
                        </div>
                        <div className="modal-footer" style={{
                            display: "flex", justifyContent: "right", marginBottom: "1.5em", paddingRight: "3rem"
                        }}>
                            <button type="button" onClick={resetSenha} id="resetar" className="modal-close btn red accent-4" style={{ marginRight: '1rem' }}>Resetar</button>
                            <button type="button" id="naoResetar" className="modal-close btn grey">Não resetar</button>
                        </div>
                    </div>
                </div>
            </div>}

    </>
}

