
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { useForm } from "react-hook-form";
import { useQuery, useQueryClient, } from 'react-query';
import { ErroForm, gerarMensagemErro } from '../Erro';

/* api */
import { post } from '../../../../api/request';

/* estilização */
import { FormSelect } from 'materialize-css';

import { ALERTA_TYPES, CACHE_TYPES, PERFIL_TYPES } from '../../../../utils/types';
import { gerarObjetoAlerta, gerarObjetoAlertaErro } from '../../../../utils/alerta';
import { CACHE_CONFIGURACAO } from '../../../../utils/cache';
import { buscarPrestadores, Prestadores } from './Prestadores';
import { Titulo } from './Titulo';
import { AlterarUsuario } from './Acao';

const PAGINA_HOME_USUARIO = '/usuario';

function Inputs({ registrarInput, usuario }) {
    return <>
        <div>
            <label htmlFor="nome">Nome</label>
            <input
                type="text"
                id="nome"
                defaultValue={usuario && usuario.name}
                {...registrarInput("nome", { required: true, message: "error message" })}
            />
        </div>

        <div>
            <label htmlFor="identificador">Identificador</label>
            <input
             disabled={usuario !== undefined}
                type="number"
                id="identificador"
                defaultValue={usuario && usuario.cod}
                {...registrarInput("identificador", { required: true, message: "error message" })}
            />
        </div>
    </>
}

export function FormUsuario({ usuario }) {
    
    const [erro, definirErro] = useState(undefined);

    const { push } = useHistory()
    const { register, handleSubmit, watch } = useForm();
    const { data: prestadores } = useQuery(CACHE_TYPES.USUARIO_PRESTADOR, buscarPrestadores, CACHE_CONFIGURACAO)
    const queryClient = useQueryClient()

    const form = watch();
    const watchTipoUsuario = watch('categoria')

    const cadastrarUsuario = async dados => {
        try {
            const eCliente = dados.categoria === PERFIL_TYPES.CLIENTE;
            const fornecedor = eCliente ? { supplier: { id: dados.prestadorId } } : undefined
            const usuarioDTO = {
                name: dados.nome, cod: dados.identificador, type: dados.categoria, ...fornecedor
            }

            const requisicaoCadastro = await post('/user', usuarioDTO)

            /* invalidar dados de usuários para buscar novamente no back-end */
            queryClient.invalidateQueries(CACHE_TYPES.USUARIO)
            queryClient.invalidateQueries(CACHE_TYPES.USUARIO_PRESTADOR)
            queryClient.invalidateQueries(CACHE_TYPES.AVALIACAO_ADMINISTRADOR);

            /* redirecionar para página home e enviar o nome do novo usuário cadastrado */
            push(PAGINA_HOME_USUARIO, gerarObjetoAlerta(requisicaoCadastro.data.name, ALERTA_TYPES.CADASTRAR))
        } catch (error) {
            push(PAGINA_HOME_USUARIO, gerarObjetoAlertaErro())
        }
    };

    const apresentarErro = (erros, e) => {
        definirErro(gerarMensagemErro(erros, e));
    }

    useEffect(() => {
        FormSelect.init(document.querySelectorAll('#categoria'))
    }, [])

    return <>
        <div className="card-panel">

            {usuario ? <Titulo usuario={usuario} alterar /> : <Titulo />}

            <form onSubmit={handleSubmit(cadastrarUsuario, apresentarErro)} >

                <Inputs registrarInput={register} {...{ usuario }} />

                <div>
                    <br />
                    <select
                        name=""
                        defaultValue={usuario && usuario.type}
                        id="categoria"
                        disabled={usuario !== undefined}
                        {...register("categoria", { required: true, message: "error message" })}
                    >
                        <option value="" disabled>Categoria</option>
                        <option value={PERFIL_TYPES.PRESTADOR_SERVICO}>Prestador de Serviço</option>
                        <option value={PERFIL_TYPES.CLIENTE}>Cliente</option>
                        <option value={PERFIL_TYPES.ADMINISTRADOR}>Administrador</option>
                    </select>
                </div>

                {watchTipoUsuario === PERFIL_TYPES.CLIENTE &&
                    <Prestadores register={register} prestadores={prestadores} />
                }

                <ErroForm erro={erro} />

                <br />

                <div style={{ textAlign: 'right' }}>
                    {usuario && <AlterarUsuario {...{ usuario, form }} />}
                    {!usuario && <input className="btn green" type="submit" value="cadastrar" />}
                </div>
            </form>

        </div>
    </>;
}