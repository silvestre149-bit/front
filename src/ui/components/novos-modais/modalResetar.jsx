import React, { useContext, useEffect } from 'react';
import { MdClose as Close } from 'react-icons/md';
import { mudarUsuario } from '../../../api/alterarPerfil';
import { AuthContext } from '../../context/Auth';
import * as M from 'materialize-css';
import { useHistory } from 'react-router-dom';

export function ModalResetarSenha() {
    const { usuario } = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        var elemsModal = document.querySelectorAll(".modal");
        M.Modal.init(elemsModal, {
            opacity: 0.5,
            preventScrolling: true,
            dismissible: false,
        });
    }, []);

    const resetarSenha = async () => {

        await mudarUsuario(usuario._id, {tipo: usuario.tipo, senha: usuario.cod});
        history.push('/logout');
    };
    return <>
        <div style={{ marginBottom: '15px' }}>
            <div className="row">
                <div className="col s12">
                    <a href="#resetarSenha" className="btn red accent-4 modal-trigger" style={{
                        float: "right"
                    }}>
                        resetar senha
                    </a>
                </div>
            </div>
            <div id="resetarSenha" className="modal">
                <div className="modal-content">
                    <a href="#!" className="modal-close btn-flat" style={{ float: "right" }}><Close className="grey-text" style={{ width: '100%', height: '100%' }} /></a>
                    <div className="container">
                        <h4 style={{ marginTop: '1em', fontSize: '1.8em' }}><b>Confirmação</b></h4>
                        <p style={{ marginTop: '2em', fontSize: '1.2em', marginBottom: '1.5em' }}><b>Tem certeza que deseja resetar sua senha?</b></p>
                    </div>
                </div>
                <div className="modal-footer" style={{
                    display: "flex", justifyContent: "right", marginBottom: "1.5em", paddingRight: "3rem"
                }}>
                    <button type="button" onClick={resetarSenha} id="resetar" className="modal-close btn red accent-4" style={{ marginRight: '1rem' }}>Resetar</button>
                    <button type="button" id="naoResetar" className="modal-close btn grey">Não resetar</button>
                </div>
            </div>
        </div>
    </>
}
