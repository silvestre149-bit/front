import React, { useEffect } from "react";
import { MdKeyboardArrowUp as Up, MdKeyboardArrowDown as Down, MdAddBox as Add, MdClose as Close } from "react-icons/md";
import M from 'materialize-css';

function ModalEditarTCC() {
    useEffect(() => {
        var elemsModalCadastroTCC = document.querySelectorAll(".modal");
        M.Modal.init(elemsModalCadastroTCC, {
            opacity: 0.5,
            preventScrolling: true,
            dismissible: false,
        });
    }, []);

    return <>
        <br />
        <div style={{ marginBottom: '15px' }}>
            <div className="row">
                <div className="col s12">
                    <a href="#TCCcadastrado" className="btn red accent-4 modal-trigger">
                        cadastro TCC
                    </a>
                </div>
            </div>
            <div id="TCCcadastrado" className="modal">
                <div className="modal-content">
                    <a href="#!" className="modal-close btn-flat" style={{ float: "right" }}><Close className="grey-text" style={{ width: '100%', height: '100%' }} /></a>
                    <div className="container">
                        <h4 style={{ marginTop: '1em', fontSize: '1.8em' }}><b>Confirmação de cadastro</b></h4>
                        <p style={{ marginTop: '2.5em', marginBottom: '1.5em' }}>Seu projeto foi cadastrado com sucesso!</p>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default ModalEditarTCC;