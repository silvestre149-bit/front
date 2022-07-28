import React from 'react';
import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router';
import { patch } from '../../../../api/request';
import { CACHE_TYPES, ERRO_TYPES } from '../../../../utils/types';
import { ModalAlterar, ModalDeletar } from '../../Modal';

export function AlterarUsuario({ usuario, form }) {

    const { goBack } = useHistory()
    const queryClient = useQueryClient()


    const link = '/user/' + usuario.id;

    const alterar = async e => {
        const dados = { ...usuario, name: form.nome }
        await patch(link, dados)
            .then(() => {
                queryClient.invalidateQueries(CACHE_TYPES.USUARIO);
                goBack()
            })
            .catch(() => {
                alert(ERRO_TYPES.GENERICO)
            })

    }

    return <ModalAlterar {...{ alterar }} id="usuario-alterar" />;
}

export function DeletarUsuario({ usuario }) {
    return <ModalDeletar
        id="usuario-deletar"
        deletar={e => console.log(true)}
    />
}
