import React, { useContext, useEffect } from 'react';
import { MdClose as Close } from 'react-icons/md';
import { AuthContext } from '../../../context/Auth/index.jsx';
import * as M from 'materialize-css';
import { useState } from 'react';
import { aceitarOrientacao } from '../../../../api/professor';
import { adicionarCronogramaOrientacao } from '../../../../api/projeto.js';
import { useLocation } from 'react-router-dom';

export function ModalOrientadorAceitaConvite({ atualizar, projeto }) {
    const { usuario } = useContext(AuthContext);
    const location = useLocation();
    const projetoId = location.state;
    const [dados, setDados] = useState({
        orientador: usuario.nome,
        email: usuario.email,
        data: '',
        hora: '',
        local: ''
    });

    useEffect(() => {
        var elemsModal = document.querySelectorAll(".modal");
        M.Modal.init(elemsModal, {
            opacity: 0.5,
            preventScrolling: true,
            dismissible: false,
        });
    }, []);

    const pegarValores = (e) => {
        const { name, value } = e.target;
        setDados({ ...dados, [name]: value });
    };

    const enviarFormulario = async () => {
        await adicionarCronogramaOrientacao(projetoId, dados);
        await aceitarOrientacao(projetoId);
    };
    
    return <>
        <div style={{ marginBottom: '15px' }}>
            <div id="aceitarProjeto" className="modal-open">
                <div className="modal-content">
                    <a href="#!" className="modal-close btn-flat" style={{ float: "right" }}><Close className="grey-text" style={{ width: '100%', height: '100%' }} /></a>
                    <div className="container">
                        <h4 style={{ marginTop: '1em', fontSize: '1.8em' }}><b>Confirmação</b></h4>
                        <p style={{ marginTop: '2em', fontSize: '1.2em', marginBottom: '1.5em' }}><b>Por favor, preencha o cronograma de orientação.</b></p>
                        <div className="row">
                            <div className="input-field col s12">
                                <input name="local" type="text" onChange={pegarValores} />
                                <label for="local">Local:</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input name="horas" type="text" onChange={pegarValores} />
                                <label for="horas">Horário: </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input name="data" type="date" onChange={pegarValores} />
                                <label for="data">Data: </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer" style={{
                    display: "flex", justifyContent: "right", marginBottom: "1.5em", paddingRight: "3rem"
                }}>
                    <button type="button" onClick={enviarFormulario} id="aceitar" className="modal-close btn red accent-4" style={{ marginRight: '1rem' }}>Confirmar</button>
                    <button type="button" id="naoAceitar" className="modal-close btn grey">Não confirmar</button>
                </div>
            </div>
        </div>
    </>
}
