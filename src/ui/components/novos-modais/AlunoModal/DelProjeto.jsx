import React, { useEffect } from 'react';
import { MdClose as Close } from "react-icons/md";
import MessageTemplate from '../../errorMessageTemplate';
import * as M from 'materialize-css';

export function ModalExcluirProjeto({ enviar, resultado }) {
    useEffect(() => {
        var elemsModal = document.querySelectorAll(".modal");
        M.Modal.init(elemsModal, {
            opacity: 0.5,
            preventScrolling: true,
            dismissible: false,
        });
    }, []);
    return <>
        <div>
            <div style={{ marginBottom: '15px' }}>
                <div className="row">
                    <div className="col s12">
                        <a href="#cancelamentoDeProjeto" className="btn red accent-4 modal-trigger" >Enviar Solicitação
                        </a>
                    </div>
                </div>
                <div id="cancelamentoDeProjeto" className="modal">
                    <div className="modal-content">
                        <a href="#!" className="modal-close btn-flat" style={{ float: "right" }}><Close className="grey-text" style={{ width: '100%', height: '100%' }} /></a>
                        <div className="container">
                            <h4 style={{ marginTop: '1em', fontSize: '1.8em' }}><b>Confirmação de cancelamento</b></h4>
                            <p style={{ marginTop: '2em', fontSize: '1.2em', marginBottom: '1.5em' }}><b>Tem certeza que deseja enviar a solicitação de cancelamento?</b></p>
                        </div>
                    </div>
                    <MessageTemplate mensagem={resultado} />
                    <div className="modal-footer" style={{
                        display: "flex", justifyContent: "right", marginBottom: "1.5em", paddingRight: "3rem"
                    }}>
                        <button onClick={enviar} type="button" id="encerrar" className="btn red accent-4" style={{ marginRight: '1rem' }}>Enviar</button>
                        <button type="button" id="naoEncerrar" className="modal-close btn grey">Não enviar</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}