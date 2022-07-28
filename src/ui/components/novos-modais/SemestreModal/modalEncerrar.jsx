import React, { useState, useEffect } from 'react';
import MessageTemplate from '../../errorMessageTemplate';
import { MdClose as Close } from "react-icons/md";
import {
    fecharSemestre,
    pegarSemestreAberto,
    deletarProjetos,
    deletarAlunos
} from '../../../../api/semestre';

export function ModalEncerrarSemestre({ atualizar }) {
    const [feedback, setFeedback] = useState({
        status: "",
        descricao: ""
    });
    const [semestre, setSemestre] = useState();

    useEffect(() => {
        const buscarSemestre = async () => {
            const res = await pegarSemestreAberto();
            setSemestre(res.data);
        };

        buscarSemestre();
    }, []);

    const cancelarSemestre = async (e) => {
        e.preventDefault();

        await deletarAlunos();
        await deletarProjetos();
        await fecharSemestre(semestre[0]._id);
        atualizar(1);

        return setFeedback({
            status: "sucesso",
            descricao: "Semestre encerrado com sucesso!"
        });
    };

    return <>
        <div>
            <div>
                <div className="row">
                    <div className="col s12">
                        <a href="#encerrarSemestre" className="btn red accent-4 modal-trigger" >encerrar semestre
                        </a>
                    </div>
                </div>
                <div id="encerrarSemestre" className="modal">
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
                        <MessageTemplate mensagem={feedback} />
                        <form onSubmit={cancelarSemestre}>
                            <button type="submit" id="encerrar" className="modal-close btn red accent-4" style={{ marginRight: '1rem' }}>Encerrar</button>
                            <button type="button" id="naoEncerrar" className="modal-close btn grey">Não encerrar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}
