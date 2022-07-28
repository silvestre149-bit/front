import React, { useState, useEffect } from 'react';
import { BreadcrumbsNotificacoes } from '../../../../components/Breadcrumbs/NotificacoesBC';
import { tokenId } from '../../../../../utils/usuario.id.js';
import { buscarNotificacoes } from '../../../../../api/convites.js';
import * as M from 'materialize-css';
import jwt from 'jwt-decode';
import NotificacaoOrientacao from '../../../../components/notificacaoTemplate/orientacao';
import NotificacaoCancelamento from '../../../../components/notificacaoTemplate/cancelamento';
import { Icon } from 'react-materialize';
import { Carregando } from '../../../../components/Carregando';
export function NotificacaoProfessor() {
    const [notificacoes, setNotificacoes] = useState();
    const [atualizar, setAtualizar] = useState(0);
    const profInfo = jwt(tokenId);

    const atualizarDados = () => setAtualizar(atualizar + 1);

    useEffect(() => {
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.collapsible');
            M.Collapsible.init(elems, {});
        });

        const pegarNotificacoes = async () => {
            const res = await buscarNotificacoes(profInfo._id);
            setNotificacoes(res.data);
        };

        pegarNotificacoes();
    }, [atualizar])

    if(!notificacoes) return <Carregando />

    return <>
        <BreadcrumbsNotificacoes />
        <div className="section">
            <h2 className="center">
                <Icon style={{fontSize: "40px"}}>notifications</Icon>
                Notificações
            </h2>
        </div>
        <div className="section">
            <div className="card ">
                <div className="card-content">
                    <div className="section">
                        <div className="row">
                            <div className="col s12">
                                {notificacoes.map((notificacao) => {
                                    {
                                        switch (notificacao.tipo) {
                                            case 'orientacao':
                                                return <NotificacaoOrientacao
                                                    remetente={notificacao.remetenteNome}
                                                    titulo={notificacao.titulo}
                                                    projetoId={notificacao.projetoId}
                                                    convite={notificacao._id}
                                                    atualizar={atualizarDados} />
                                            case 'avaliacao':
                                                return <NotificacaoCancelamento
                                                    remetente={notificacao.remetenteNome}
                                                    titulo={notificacao.titulo}
                                                    projetoId={notificacao.projetoId} />
                                            case 'suplente':
                                                return <NotificacaoCancelamento
                                                    remetente={notificacao.remetenteNome}
                                                    titulo={notificacao.titulo}
                                                    projetoId={notificacao.projetoId} />
                                            case 'cancelamento':
                                                return <NotificacaoCancelamento
                                                    remetente={notificacao.remetenteNome}
                                                    titulo={notificacao.titulo}
                                                    descricao={notificacao.descricao}
                                                    projetoId={notificacao.projetoId} />
                                        }
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}