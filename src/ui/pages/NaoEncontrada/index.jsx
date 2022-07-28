import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

/* contexto */
import { AuthContext } from '../../context/Auth';

import { ERRO_TYPES } from '../../../utils/types';


export function NaoEncontrada() {
    const contexto = useContext(AuthContext);

    useEffect(() => {
        /* corrigir o caso de 
                        {
                usuario: undefined,
                token: undefined,
                mensagemErro: undefined,
                perfil: 0,
                dispatch: function () { [native code] },
                }
        */
        contexto.dispatch({ type: ERRO_TYPES.PAGINA_NAO_ENCONTRADA.id });
    })

    return <Redirect to="/" />
}
