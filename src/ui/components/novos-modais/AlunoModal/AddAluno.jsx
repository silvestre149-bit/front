import React, { useState, useEffect } from "react";
import { MdAddBox as Add, MdClose as Close } from "react-icons/md";
import { cadastrarAluno } from '../../../../api/aluno.js';
import M from 'materialize-css';
import './index.css'
import { pegarSemestre } from "../../../../api/semestre.js";
import MessageTemplate from "../../errorMessageTemplate/index.jsx";
import { buscarCod } from "../../../../api/professor.js";

const form = {
    nome: String,
    cod: String,
    turmas: Array,
    tipo: "aluno",
    senha: String
};

function AdicionarAluno({ atualizar }) {
    const [feedback, setFeedback] = useState({
        status: "",
        descricao: ""
    });
    const [formValores, setValores] = useState(form);
    const [selects, setSelects] = useState();
    const [options, setOptions] = useState([]);

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
        }

        buscarSemestre();
    }, []);

    const pegarValores = (e) => {
        const { name, value } = e.target;

        setValores({ ...formValores, [name]: value });
    };

    const pegarTurmas = (name, value) => {
        setValores({
            ...formValores, turmas:
            {
                ...formValores.turmas, [name]: value
            }
        });
    };

    const semestresAtivos = options.filter((semestre) => {
        return semestre.status === "aberto"
    }).map((semestre) => {
        return semestre.turmas;
    });

    const adicionarAluno = async (e) => {
        e.preventDefault();

        let res = await buscarCod(formValores.cod)

        if (res.data)
            return setFeedback({
                status: "falha",
                descricao: "Erro, o TIA inserido já está sendo utilizado, tente novamente!"
            });

        try {
            await cadastrarAluno(formValores);
            setFeedback({
                status: "sucesso",
                descricao: "Aluno criado com sucesso!"
            });
            atualizar(1);
        } catch (e) {
            console.log(e);

            return setFeedback({
                status: "falha",
                descricao: "Não foi possível criar o aluno, tente mais tarde!"
            });
        }
    }

    return <>
        <br />
        <div style={{ marginBottom: '15px' }}>
            <div className="row">
                <div className="col s12">
                    <a href="#adicionarAluno" className="btn red accent-4 modal-trigger">
                        <Add style={{ verticalAlign: "middle", marginRight: "0.5em" }} />adicionar aluno
                    </a>
                </div>
            </div>
        </div>
        <div id="adicionarAluno" className="modal open">
            <div className="modal-content">
                <a href="#!" className="modal-close btn-flat" style={{ float: "right" }}><Close className="grey-text" style={{ width: '100%', height: '100%' }} /></a>
                <div className="container">
                    <h4 style={{ marginTop: '1em', fontSize: '1.8em' }}><b>Cadastrar Aluno</b></h4>
                    <form className="col s12" onSubmit={adicionarAluno}>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="cod" name="cod" type="number" onChange={pegarValores} />
                                <label for="cod">T.I.A.</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="nome" name="nome" type="text" onChange={pegarValores} />
                                <label for="nome">Nome</label>
                            </div>
                        </div>
                        <div class="row">
                            <label>O aluno está matriculado em...</label>
                            <div className="custom-select">
                                <select value={selects} onChange={e => setSelects(e.target.value)} class="browser-default select-options ">
                                    <option value="" selected>Selecione o número de turmas</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                </select>
                                <span className="custom-arrow"></span>
                            </div>
                        </div>
                        {selects === "1" &&
                            <div class="row">
                                <label>1º Turma</label>
                                <div className="custom-select">
                                    <select class="browser-default select-options" onChange={(e) => pegarTurmas("turmaUm", e.target.value)}>
                                        <option value="" disabled selected>Selecione a turma</option>
                                        {(semestresAtivos[0] ? semestresAtivos[0] : [semestresAtivos[0]]).filter((turma) => {
                                            return turma.slice(0, 2) === "07";
                                        }).map((turma, index) => {
                                            return (
                                                <option key={index} value={turma}>{turma}</option>
                                            )
                                        })}
                                    </select>
                                    <span className="custom-arrow">
                                    </span>
                                </div>
                            </div>}
                        {selects === "2" && <div>
                            <div class="row">
                                <label>1º Turma</label>
                                <div className="custom-select">
                                    <select class="browser-default select-options" onChange={(e) => pegarTurmas("turmaUm", e.target.value)}>
                                        <option value="" disabled selected>Selecione a turma</option>
                                        {(semestresAtivos[0] ? semestresAtivos[0] : [semestresAtivos[0]]).filter((turma) => {
                                            return turma.slice(0, 2) === "07";
                                        }).map((turma, index) => {
                                            return (
                                                <option key={index} value={turma}>{turma}</option>
                                            )
                                        })}
                                    </select>
                                    <span className="custom-arrow">
                                    </span>
                                </div>
                            </div>
                            <div class="row">
                                <label>2º Turma</label>
                                <div className="custom-select">

                                    <select class="browser-default select-options" onChange={(e) => pegarTurmas("turmaDois", e.target.value)}>
                                        <option value="" disabled selected>Selecione a 2º turma</option>
                                        {(semestresAtivos[0] ? semestresAtivos[0] : [semestresAtivos[0]]).filter((turma) => {
                                            return turma.slice(0, 2) != "07";
                                        }).map((turma, index) => {
                                            return (
                                                <option key={index} value={turma}>{turma}</option>
                                            )
                                        })}
                                    </select>
                                    <span className="custom-arrow"></span>
                                </div>
                            </div>
                        </div>}
                        <MessageTemplate mensagem={feedback} />
                        <div className="modal-footer" style={{
                            display: "flex", justifyContent: "center", marginBottom: "1.5em"
                        }}>
                            <button type="submit" id="addAluno" className="btn red accent-4">adicionar aluno</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default AdicionarAluno;