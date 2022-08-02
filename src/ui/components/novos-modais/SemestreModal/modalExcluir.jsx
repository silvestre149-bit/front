import React from 'react';
import { useState, useEffect } from 'react';
import { deletarAlunos, deletarProjetos, pegarSemestre } from '../../../../api/semestre';
import { MdClose as Close } from "react-icons/md";
import { deletarSemestre } from '../../../../api/semestre';
import MessageTemplate from '../../errorMessageTemplate';
import M from 'materialize-css';

export function ModalExcluirSemestre({ atualizar }) {
    const [semestres, setSemestres] = useState([]);
    const [semestreSelecionado, setSelecionarSemestre] = useState();
    const [feedback, setFeedback] = useState({
        status: "",
        descricao: ""
    });

    useEffect(() => {
        const buscarSemestre = async () => {
            const res = await pegarSemestre();
            setSemestres(res.data);
        };

        buscarSemestre();
    }, [atualizar]);

    useEffect(() => {
        var elemsModal = document.querySelectorAll(".modal");
        M.Modal.init(elemsModal, {
            opacity: 0.5,
            preventScrolling: true,
            dismissible: false,
        });
    }, []);

    const delSemestre = async (e) => {
        e.preventDefault();

        try {
            await deletarSemestre(semestreSelecionado);
            await deletarAlunos(semestreSelecionado);
            await deletarProjetos(semestreSelecionado);
            atualizar(1);

            return setFeedback({
                status: "sucesso",
                descricao: "Semestre deletado com sucesso, aguarde!"
            });
        } catch(e) {
            console.log(e);

            return setFeedback({
                status: "falha",
                descricao: "Erro ao deletar semestre, tente novamente!"
            });
        }
    };

    return <>
        <div>
            <div>
                <div className="row">
                    <div className="col s12">
                        <a href="#removerSemestre" className="btn red accent-4 modal-trigger align-right" >remover semestre </a>
                    </div>
                </div>
                <div id="removerSemestre" className="modal">
                    <div className="modal-content">
                        <a href="#!" className="modal-close btn-flat" style={{ float: "right" }}><Close className="grey-text" style={{ width: '100%', height: '100%' }} /></a>
                        <div className="container">
                            <form onSubmit={delSemestre}>
                                <h4 style={{ marginTop: '1em', fontSize: '1.8em' }}><b>Confirmação de exclusão</b></h4>
                                <p style={{ marginTop: '2em', fontSize: '1.4em', marginBottom: '1.5em' }}><b>Escolha o semestre que deseja excluir:</b></p>
                                <select className="browser-default select-options" value={semestreSelecionado} onChange={e => setSelecionarSemestre(e.target.value)}>
                                    <option selected>Selecione o semestre a ser removido</option>
                                    {semestres.map((e, index) => {
                                        return <option key={index} value={e._id}>{e.titulo}</option>
                                    })}
                                </select>
                                <hr className="grey-text" style={{ marginTop: '2em' }} />
                                <p style={{ marginTop: '2em', fontSize: '1.2em', marginBottom: '1.5em' }}>Tem certeza que deseja excluir esse semestre?</p>
                                <div className="modal-footer" style={{
                                    display: "flex", justifyContent: "right", marginBottom: "1.5em", paddingRight: "3rem"
                                }}>
                                    <button type="submit" id="excluirSem" className="btn red accent-4" style={{ marginRight: '1rem' }}>Excluir</button>
                                    <button type="button" id="naoExcluirSem" className="btn grey modal-close">Não excluir</button>
                                </div>
                                <MessageTemplate mensagem={feedback} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
