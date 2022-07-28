import React, { useState, useEffect } from 'react';
import { pegarSemestreAberto } from '../../../../api/semestre.js';
import { MdAddBox as Add, MdClose as Close } from "react-icons/md";
import MessageTemplate from '../../errorMessageTemplate';

export function ModalCadastrarProjetoSessao({ atualizar }) {
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

    return <>
        <div>
            <div>
                <div className="row">
                    <div className="col s12">
                        <a href="#cadastrarSessao" className="btn red accent-4 modal-trigger" >
                            <Add style={{ verticalAlign: "middle", marginRight: "0.5em" }} />
                            Cadastrar Sessão
                        </a>
                    </div>
                </div>
                <div id="cadastrarSessao" className="modal">
                </div>
            </div>
        </div>
    </>
}
