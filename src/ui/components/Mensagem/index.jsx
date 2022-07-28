import React, { useState } from 'react';
import { MdClose as Fechar } from "react-icons/md";



/**
 * @param {(azul | vermelho | verde | amarelo)} cor 
 */
export function Mensagem({ descricao, cor, fechar }) {

    /* estados */
    const [oculto, ocultar] = useState(false);

    const [_cor] = useState(() => {
        switch (cor) {
            case 'azul':
                return 'blue lighten-1 white-text';
            case 'amarelo':
                return 'yellow lighten-1 black-text';
            case 'vermelho':
                return 'red lighten-1 white-text'
            case 'verde':
                return 'green lighten-1 white-text'
            default:
                return 'yellow lighten-1 black-text';
        }
    })

    return <div
        className={"card-panel flow-text " + _cor + (oculto ? ' hide' : '')}
        style={{ textAlign:'center', display: 'flex', alignItems: 'center', justifyContent: (fechar ? 'space-between' : 'center'), padding:"25px"}}
    >
        {fechar && <span></span>}
        <h5 style={{ fontSize: '1.5rem' }}><b>{descricao}</b></h5>
        {fechar && <Fechar onClick={() => ocultar(true)} />}
    </div>

}