import React, { useState } from 'react';
import { BreadcrumbsPerfil } from '../Breadcrumbs/PerfilBC';
import { ModalResetarSenha } from '../novos-modais/modalResetar';
import { Carregando } from '../Carregando';
import { AuthContext } from '../../context/Auth';
import { useContext } from 'react';
import { mudarUsuario } from '../../../api/alterarPerfil';
import MessageTemplate from '../errorMessageTemplate';
import { useHistory } from 'react-router-dom';

function PerfilUsuario() {
    const { usuario } = useContext(AuthContext);
    const [dados, setDados] = useState({
        nome: '',
        email: '',
        senha: '',
        tipo: usuario.tipo
    });
    const [feedback, setFeedback] = useState({
        status: '',
        descricao: ''
    });
    const history = useHistory();

    const editarPerfil = async (e) => {
        e.preventDefault();
        if(dados.nome === "" || undefined) delete dados.nome;
        if(dados.email === "" || undefined) delete dados.email;

        try {
            if(dados.senha !== "") { 
                await mudarUsuario(usuario._id, dados)
                setFeedback({status: 'sucesso', descricao: 'Perfil atualizado com sucesso!'});
                return history.push('/logout');
            }
            else {
                delete dados.senha;
                await mudarUsuario(usuario._id, dados)
                setFeedback({status: 'sucesso', descricao: 'Perfil atualizado com sucesso!'});
                return history.push('/logout');
            }
        } catch (e) {
            console.log(e);
            return setFeedback({status: 'falha', descricao: 'Erro ao editar perfil'});
        }
    }

    const pegarDados = (e) => {
        const { name, value } = e.target;
        setDados({ ...dados, [name]: value });
    }

    return <> {usuario ? <> <BreadcrumbsPerfil />
        <h2 className="center">Meu Perfil</h2>
        <ModalResetarSenha />
        <div class="card">
            <div class="card-content ">
                <div class="row">
                    <form class="col s12" onSubmit={editarPerfil} >
                        <div class="row">
                            <div class="input-field col s12">
                                <input disabled id="disabled" value={usuario.cod} type="text" />
                                <label class="active" for="disabled">Identificador: </label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input name="nome" type="text" value={dados.nome} onChange={e => pegarDados(e)} />
                                <label for="nome">Nome: {usuario.nome} </label>
                            </div>
                        </div>
                        {usuario.email ? (
                            <div class="row">
                                <div class="input-field col s12">
                                    <input name="email" type="email" value={dados.email} onChange={e => pegarDados(e)} />
                                    <label for="email">E-mail: {usuario.email} </label>
                                </div>
                            </div>)
                            : (<></>)}
                        <div class="row">
                            <div class="input-field col s12">
                                <input name="senha" type="password" value={dados.senha} onChange={e => pegarDados(e)} />
                                <label for="senha">Senha</label>
                            </div>
                        </div>
                        <MessageTemplate mensagem={feedback} />
                        <div className="center-align">
                            <button class="modal-close btn red accent-4 center" type="submit" name="action">Salvar alterações
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </> :
        <Carregando />
    }
    </>;
}

export default PerfilUsuario;