import React, { useState, useEffect } from 'react';
import { pegarSemestreAberto } from '../../../../api/semestre.js';
import { MdAddBox as Add, MdClose as Close } from "react-icons/md";
import * as M from 'materialize-css';
import MessageTemplate from '../../errorMessageTemplate/index.jsx';
import { inserirParticipacaoProjeto } from '../../../../api/projeto.js';
import { criarParticipacao } from '../../../../api/cadastrar.js';
import { inserirParticipacaoUsuario, pegarTodosAlunos, pegarUsuario } from '../../../../api/aluno.js';

export function ModalAdicionarAlunoProjeto({ atualizar, dadosProjeto }) {
    const [feedback, setFeedback] = useState({
        status: "",
        descricao: ""
    });
    const [alunos, setAlunos] = useState([]);
    const [semestre, setSemestre] = useState();
    const [aluno, setAluno] = useState("");
    const [dadosAluno, setDadosAluno] = useState();

    useEffect(() => {
        var elemsModalCadastroTCC = document.querySelectorAll(".modal");
        M.Modal.init(elemsModalCadastroTCC, {
            opacity: 0.5,
            preventScrolling: true,
            dismissible: false,
        });

        const pegarSemestre = async () => {
            const res = await pegarSemestreAberto();
            setSemestre(res.data);
        };

        const pegarAlunos = async () => {
            const res = await pegarTodosAlunos();
            setAlunos(res.data);
        };

        pegarSemestre();
        pegarAlunos();
    }, []);

    const pegarDadosAluno = async (id) => {
        const res = await pegarUsuario(id);
        setDadosAluno(res.data);
    };

    console.log(dadosAluno);
    const adicionarAluno = async (e) => {
        e.preventDefault();
        if (aluno === "") return setFeedback({
            status: "falha",
            descricao: "Selecione um aluno"
        });

        try {
            const participacao = await criarParticipacao({
                usuarioId: dadosAluno._id,
                projetoId: dadosProjeto._id,
                nome: dadosAluno.nome,
                cod: dadosAluno.cod,
                turmas: dadosAluno.turmas,
                tipo: "aluno",
            })
            await inserirParticipacaoUsuario(dadosAluno._id, participacao);
            await inserirParticipacaoProjeto(dadosProjeto._id, participacao.data);
            atualizar(true);
            return setFeedback({
                status: "sucesso",
                descricao: "Aluno adicionado com sucesso!"
            });
        } catch (e) {
            console.log(e);
            return setFeedback({
                status: "falha",
                descricao: "Erro ao adicionar aluno, tente mais tarde!"
            });
        }
    };

    return <>
        <div>
            <div>
                <div className="row">
                    <div className="col s12">
                        <a href="#adicionarAluno" className="btn red accent-4 modal-trigger" >
                            <Add style={{ verticalAlign: "middle", marginRight: "0.5em" }} />
                            Adicionar Aluno
                        </a>
                    </div>
                </div>
                <div id="adicionarAluno" className="modal">
                    <div className="modal-content">
                        <a className="modal-close btn-flat">
                            <Close className="grey-text" style={{ width: '100%', height: '100%' }} />
                        </a>
                        <div className='container'>
                            <h4 style={{ marginTop: '1em', fontSize: '1.8em' }}>
                                <b>Adicione um novo aluno</b>
                            </h4>
                            <form onSubmit={adicionarAluno}>
                                <select name="avaliador" class="browser-default" value={aluno} onChange={e => { pegarDadosAluno(e.target.value); setAluno(e.target.value) }}>
                                    <option selected>Escolha o aluno</option>
                                    {alunos.filter((aluno) => {
                                        if(dadosProjeto.disciplina === 'TCC I') return aluno.participacoes.length === 0 && aluno.tipo === 'aluno' && aluno.turmas.turmaUm;
                                        if(dadosProjeto.disciplina === 'TCC II') return aluno.participacoes.length === 0 && aluno.tipo === 'aluno' && aluno.turmas.turmaDois;
                                    }).map((aluno, index) => {
                                        return <option key={index} value={aluno._id}>{aluno.nome}</option>;
                                    })}
                                </select>
                                <MessageTemplate mensagem={feedback} />
                                <div className="modal-footer" style={{
                                    display: "flex", justifyContent: "center", marginBottom: "1.5em"
                                }}>
                                    <button type="submit" id="addAluno" className="btn red accent-4">Adicionar aluno</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
