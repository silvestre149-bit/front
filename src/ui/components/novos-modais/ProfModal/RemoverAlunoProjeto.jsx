import React, { useState, useEffect } from 'react';
import { MdAddBox as Add, MdClose as Close } from "react-icons/md";
import * as M from 'materialize-css';
import MessageTemplate from '../../errorMessageTemplate/index.jsx';
import { pegarUsuario, removerParticipacaoUsuario } from '../../../../api/aluno.js';

export function ModalRemoverAlunoProjeto({ atualizar, dadosProjeto }) {
    const [feedback, setFeedback] = useState({
        status: "",
        descricao: ""
    });
    const [aluno, setAluno] = useState("");
    const [dadosAluno, setDadosAluno] = useState();

    useEffect(() => {
        var elemsModalCadastroTCC = document.querySelectorAll(".modal");
        M.Modal.init(elemsModalCadastroTCC, {
            opacity: 0.5,
            preventScrolling: true,
            dismissible: false,
        });
    }, []);

    const pegarDadosAluno = async (id) => {
        const res = await pegarUsuario(id);
        setDadosAluno(res.data);
    };

    const removerAluno = async (e) => {
        e.preventDefault();
        if (aluno === "") return setFeedback({
            status: "falha",
            descricao: "Selecione um aluno"
        });

        try {
            await removerParticipacaoUsuario(dadosAluno._id, dadosAluno.participacoes);
            atualizar(true);
            return setFeedback({
                status: "sucesso",
                descricao: "Aluno removido com sucesso!"
            });
        } catch (e) {
            console.log(e);
            return setFeedback({
                status: "falha",
                descricao: "Erro ao remover aluno, tente mais tarde!"
            });
        }
    };

    return <>
        <div>
            <div>
                <div className="row">
                    <div className="col s12">
                        <a href="#removerAluno" className="btn red accent-4 modal-trigger" >
                            <Add style={{ verticalAlign: "middle", marginRight: "0.5em" }} />
                            Remover Aluno
                        </a>
                    </div>
                </div>
                <div id="removerAluno" className="modal">
                    <div className="modal-content">
                        <a className="modal-close btn-flat">
                            <Close className="grey-text" style={{ width: '100%', height: '100%' }} />
                        </a>
                        <div className='container'>
                            <h4 style={{ marginTop: '1em', fontSize: '1.8em' }}>
                                <b>Remover um novo aluno</b>
                            </h4>
                            <form onSubmit={removerAluno}>
                                <select name="avaliador" class="browser-default" value={aluno} onChange={e => { pegarDadosAluno(e.target.value); setAluno(e.target.value) }}>
                                    <option selected>Escolha o aluno</option>
                                    {dadosProjeto.participantes.filter((aluno) => {
                                        return aluno.tipo === "aluno";
                                    }).map((aluno, index) => {
                                        return <option key={index} value={aluno._id}>{aluno.nome}</option>;
                                    })}
                                </select>
                                <MessageTemplate mensagem={feedback} />
                                <div className="modal-footer" style={{
                                    display: "flex", justifyContent: "center", marginBottom: "1.5em"
                                }}>
                                    <button type="submit" id="removeAluno" className="btn red accent-4">Remover aluno</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
