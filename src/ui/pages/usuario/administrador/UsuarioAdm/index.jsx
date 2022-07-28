import React from 'react';
import { useLocation } from 'react-router';
import { FormUsuario } from '../../../../components/form/Usuario';

function UsuarioAdm() {
    const { state } = useLocation()
    if (state && state.usuario) {
        return <FormUsuario usuario={state.usuario} />
    }
    return <FormUsuario />
}

export default UsuarioAdm;