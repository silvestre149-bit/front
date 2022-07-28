import React, { useState, useEffect } from 'react';
import { pegarSemestreAberto } from '../../../../api/semestre.js';
import { MdAddBox as Add, MdClose as Close } from "react-icons/md";
import * as M from 'materialize-css';
import { buscarProfessores, buscarUmProfessor } from '../../../../api/professor.js';
import MessageTemplate from '../../errorMessageTemplate/index.jsx';
import { enviarConvite } from '../../../../api/convites.js';
import { inserirParticipacaoProjeto } from '../../../../api/projeto.js';

export function ModalConvidarOrientador({ atualizar, dadosProjeto, dadosAluno }) {
    const [feedback, setFeedback] = useState({
        status: "",
        descricao: ""
    });
    const [semestre, setSemestre] = useState();
    const [professores, setProfessores] = useState([]);
    const [professor, setProfessor] = useState("");
    const [dadosProfessor, setDadosProfessor] = useState();

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

        const pegarProfessores = async () => {
            const res = await buscarProfessores();
            setProfessores(res.data);
        };

        pegarSemestre();
        pegarProfessores();
    }, []);

    const pegarDadosProf = async (id) => {
        const res = await buscarUmProfessor(id);
        setDadosProfessor(res.data);
    };

    const convidarOrientador = async (e) => {
        e.preventDefault();
        if(professor === "") return setFeedback({
            status: "falha",
            descricao: "Selecione um professor"
        });

        try {
            await enviarConvite({
                titulo: dadosProjeto.titulo,
                remetenteNome: dadosAluno.nome,
                destinatario: professor,
                tipo: "orientacao",
                semestre: semestre._id,
                projetoId: dadosProjeto._id
            });
            await inserirParticipacaoProjeto(dadosProjeto._id, {
                professorId: dadosProfessor._id,
                nome: dadosProfessor.nome,
                cod: dadosProfessor.cod,
                tipo: "orientador",
                status: "pendente"
            });
            atualizar(1);
            return setFeedback({
                status: "sucesso",
                descricao: "Orientador convidado com sucesso!"
            });
        } catch(e) {
            console.log(e);
            return setFeedback({
                status: "falha",
                descricao: "Erro ao convidar orientador, tente mais tarde!"
            });
        }
    };

    console.log(dadosProfessor);
    return <>
        <div>
            <div>
                <div className="row">
                    <div className="col s12">
                        <a href="#convidarOrientador" className="btn red accent-4 modal-trigger" >
                            <Add style={{ verticalAlign: "middle", marginRight: "0.5em" }} />
                            Convidar orientador
                        </a>
                    </div>
                </div>
                <div id="convidarOrientador" className="modal">
                    <div className="modal-content">
                        <a href="#!" className="modal-close btn-flat">
                            <Close className="grey-text" style={{ width: '100%', height: '100%' }} />
                        </a>
                        <div className='container'>
                            <h4 style={{ marginTop: '1em', fontSize: '1.8em' }}>
                                <b>Convide um novo orientador</b>
                            </h4>
                            <form onSubmit={convidarOrientador}>
                                <select name="avaliador" class="browser-default" value={professor} onChange={e => { pegarDadosProf(e.target.value); setProfessor(e.target.value) }}>
                                    <option selected>Escolha o professor orientador</option>
                                    {professores.filter((professor) => {
                                        return professor.permissoes.orientador === true
                                    }).map((professor, index) => {
                                        return <option key={index} value={professor._id}>{professor.nome}</option>;
                                    })}
                                </select>
                                <MessageTemplate mensagem={feedback} />
                                <div className="modal-footer" style={{
                                    display: "flex", justifyContent: "center", marginBottom: "1.5em"
                                }}>
                                    <button type="submit" id="addOrientador" className="btn red accent-4">Adicionar orientador</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
