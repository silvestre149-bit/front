import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { toast } from 'react-toastify';

const { error, success, warn } = toast;

function Alerta() {

    const { state, pathname } = useLocation()
    const { replace } = useHistory()

    useEffect(() => {
        let mensagem = "Ops, tivemos um imprevisto, por favor reinicie a página"
        let toastFunction = error;

        if (state && Object.keys(state).length > 0) {
            const { acao, titulo } = state;

            if (titulo && acao) {
                mensagem = titulo + ' ';
                switch (acao) {
                    case "deletar":
                        toastFunction = toast.error;
                        break;
                    case "cadastrar":
                        toastFunction = toast.success;
                        break;
                    case "alterar":
                        toastFunction = toast.warn;
                        break;

                    default:
                        toastFunction = toast.error;
                        break;
                }
            }

            toastFunction(mensagem);
            replace(pathname, {})
        }
    }, [acao, titulo, state, pathname, replace])

    return <></>;
}

export default Alerta;