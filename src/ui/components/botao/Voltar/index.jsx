import React from 'react';
import { useHistory } from 'react-router';

import { MdKeyboardBackspace as Voltar } from "react-icons/md";


export function BotaoVoltar() {
    const { goBack } = useHistory()
    return <span
        onClick={() => goBack()}
        className="waves-effect waves-light btn red accent-4"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "120px", marginTop: "30px" }}
    >
        <Voltar style={{ fontSize: "x-large" }} />Voltar
    </span>
}