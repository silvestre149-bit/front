import React, { useState, useEffect } from "react";
import { MdAddBox as Add, MdClose as Close } from "react-icons/md";
import {
    atualizarAluno,
    pegarTodosUsuarios,
    pegarUsuario,
    resetarSenhaAluno
} from '../../../../api/aluno.js';
import M from 'materialize-css';
import './index.css'
import { pegarSemestre } from "../../../../api/semestre.js";
import MessageTemplate from "../../errorMessageTemplate/index.jsx";
import { buscarCod } from "../../../../api/professor.js";

const form = {
    nome: String,
    cod: String,
    turmas: Object,
    tipo: "aluno",
    senha: String
}

function EditarAluno({ atualizar }) {

    const [feedback, setFeedback] = useState({
        status: "",
        descricao: ""
    });
    const [formValores, setValores] = useState(form);
    const [options, setOptions] = useState([]);
    const [alunos, setAlunos] = useState([]);
    const [alunoSelecionado, setAlunoSelecionado] = useState([]);
    const [alunoID, setAluno] = useState();

    useEffect(() => {
        var elemsModalAluno = document.querySelectorAll(".modal");
        M.Modal.init(elemsModalAluno, {
            opacity: 0.5,
            preventScrolling: true,
            dismissible: false,
        });
        var elemsSelectAluno = document.querySelectorAll('select');
        M.FormSelect.init(elemsSelectAluno);
    }, []);

    useEffect(() => {
        const buscarSemestre = async () => {
            const res = await pegarSemestre();
            setOptions(res.data);
        };

        buscarSemestre();

        const buscarUsuarios = async () => {
            const res = await pegarTodosUsuarios();
            setAlunos(res.data);
        };

        buscarUsuarios();
    }, []);

    const pegarValores = (e) => {
        const { name, value } = e.target;

        setValores({ ...formValores, [name]: value });
    }

    const pegarTurmas = (name, value) => {
        setValores({
            ...formValores, turmas:
            {
                ...formValores.turmas, [name]: value
            }
        });
    }

    const pegarDadosUsuario = async (aluno) => {
        const alunos = aluno;
        await pegarUsuario(alunos)
            .then(res => setAlunoSelecionado(res.data))
    }

    const semestresAtivos = options.filter((semestre) => {
        return semestre.status === "aberto"
    }).map((semestre) => {
        return semestre.turmas;
    })

    const listaAlunos = alunos.filter((aluno) => {
        return aluno.tipo === "aluno"
    }).map((aluno) => {
        let alunos = {};

        alunos.cod = aluno.cod;
        alunos.nome = aluno.nome;
        alunos.id = aluno._id;
        alunos.turmaOne = aluno.turmaUm;
        alunos.turmaTwo = aluno.turmaDois;

        return alunos;
    })

    const editarAluno = async (e) => {

        e.preventDefault();

        let res = await buscarCod(formValores.cod)

        if (res.data)
            return setFeedback({
                status: "falha",
                descricao: "O TIA inserido já está sendo utilizado!"
            });

        try {
            await atualizarAluno(alunoID, formValores);
            setFeedback({
                status: "sucesso",
                descricao: "Aluno editado com sucesso!"
            });
            atualizar(1);
        } catch (e) {
            setFeedback({
                status: "falha",
                descricao: "Erro no sistema, tente mais tarde!"
            });

            return console.error(e);
        }

    }

    const resetarSenha = async (e) => {
        e.preventDefault();

        await resetarSenhaAluno(alunoID, { senha: alunoSelecionado.cod, tipo: "aluno" });
        setFeedback({
            status: "sucesso",
            descricao: "Senha resetada com sucesso!"
        });
        return atualizar(1);
    }

    const resetarCampos = async (e) => {
        e.preventDefault();

        setValores(form);
        setAlunoSelecionado([]);
        setAluno([]);
    };

    return <>
        <br />
        <div style={{ marginBottom: '15px' }}>
            <div className="row">
                <div className="col s12">
                    <a href="#editarAluno" className="btn red accent-4   modal-trigger">
                        <Add style={{ verticalAlign: "middle", marginRight: "0.5em" }} />Editar Aluno
                    </a>
                </div>
            </div>
            <div id="editarAluno" className="modal open">
                <div className="modal-content">
                    <a onClick={resetarCampos} href="#!" className="modal-close btn-flat" style={{ float: "right" }}>
                        <Close className="grey-text" style={{ width: '100%', height: '100%' }} />
                    </a>
                    <form onSubmit={resetarSenha}>
                        <button type="submit" id="addAluno" className="btn red accent-4 p-2">Resetar senha</button>
                    </form>
                    <div className="container">
                        <h4 style={{ marginTop: '1em', fontSize: '1.8em' }}><b>Editar Aluno</b></h4>
                        <div class="row">
                            <label>Selecione o aluno</label>
                            <div className="custom-select">
                                <select value={alunoID} onChange={e => { pegarDadosUsuario(e.target.value); setAluno(e.target.value) }} class="browser-default select-options ">
                                    <option disabled selected>Selecione um aluno</option>
                                    {listaAlunos.map((aluno, index) => {
                                        return <option key={index} value={aluno.id}>{aluno.nome}</option>
                                    })}
                                </select>
                                <span className="custom-arrow"></span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="cod" name="cod" type="number" value={formValores.cod} onChange={pegarValores} />
                                <label for="cod">T.I.A: {alunoSelecionado.cod}</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="nome" name="nome" type="text" value={formValores.nome} onChange={pegarValores} />
                                <label for="nome">Nome: {alunoSelecionado.nome}</label>
                            </div>
                        </div>
                        {alunoSelecionado.turmas != null &&
                            <div class="row">
                                <label>Seleciona a Turma</label>
                                <div className="custom-select">
                                    <select name="turma" class="browser-default select-options" value={formValores.turma} onChange={(e) => pegarTurmas("turmaUm", e.target.value)}>
                                        <option value="" disabled selected>{alunoSelecionado.turmas[0]}</option>
                                        {(semestresAtivos[0] ? semestresAtivos[0] : [semestresAtivos[0]]).map((turma, index) => {
                                            return (
                                                <option name="turma" key={index} value={turma}>{turma}</option>
                                            )
                                        })}
                                    </select>
                                    <span className="custom-arrow">
                                    </span>
                                </div>
                            </div>
                        }
                        {alunoSelecionado.tccDuplo === true && <div class="row">
                            <label>Turma</label>
                            <div className="custom-select">

                                <select name="turmasDois" class="browser-default select-options" onChange={(e) => pegarTurmas("turmaDois", e.target.value)}>
                                    <option value="" disabled selected>{alunoSelecionado.turmas[1]}</option>
                                    {(semestresAtivos[0] ? semestresAtivos[0] : [semestresAtivos[0]]).map((turma, index) => {
                                        return (
                                            <option name="turmaDois" key={index} value={turma}>{turma}</option>
                                        )
                                    })}
                                </select>
                                <span className="custom-arrow"></span>
                            </div>
                        </div>}
                        <MessageTemplate mensagem={feedback} />
                        <div className="modal-footer" style={{
                            display: "flex", justifyContent: "center", marginBottom: "1.5em"
                        }}>
                            <form onSubmit={editarAluno}>
                                <button type="submit" id="addAluno" className="btn red accent-4">Salvar alterações</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    </>
}

export default EditarAluno;