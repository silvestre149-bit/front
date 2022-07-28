import React from 'react';
import { BotaoVoltar } from '../../botao/Voltar';
import { DeletarUsuario } from './Acao';

export function Titulo({ alterar, usuario }) {

    const tituloAlterar = alterar ? "Alterar " + usuario.name : undefined;
    const titulo = alterar ? tituloAlterar : "Cadastrar Novo Usuário"
    const botaoDeletar = alterar
        ? <DeletarUsuario {...{ usuario }} />
        : <span></span>

    return <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <BotaoVoltar />
        <h4 style={{padding:"10px", textAlign:'center'}}>{titulo}</h4>
        {botaoDeletar}
    </div>
}