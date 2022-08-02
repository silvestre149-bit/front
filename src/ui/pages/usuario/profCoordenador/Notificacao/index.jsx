import React, { useState, useEffect, useContext } from 'react';
import { BreadcrumbsNotificacoes } from '../../../../components/Breadcrumbs/NotificacoesBC';
import { buscarTodasNotificacoes } from '../../../../../api/convites.js';
import * as M from 'materialize-css';
import NotificacaoOrientacao from '../../../../components/notificacaoTemplate/orientacao';
import { Icon } from 'react-materialize';
import { Carregando } from '../../../../components/Carregando';
import NotificacaoAvaliacao from '../../../../components/notificacaoTemplate/avaliacao';
import NotificacaoSuplente from '../../../../components/notificacaoTemplate/suplente';
import { AuthContext } from '../../../../context/Auth';
import NotificacaoCancelamento from '../../../../components/notificacaoTemplate/cancelamento';
export function NotificacaoProfessor() {
    const [notificacoes, setNotificacoes] = useState();
    const [atualizar, setAtualizar] = useState(false);
    const { usuario } = useContext(AuthContext);
    const atualizarDados = () => setAtualizar(true);

    useEffect(() => {
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.collapsible');
            M.Collapsible.init(elems, {});
        });

        const pegarNotificacoes = async () => {
            const res = await buscarTodasNotificacoes();
            setNotificacoes(res.data);
            setAtualizar(false);
        };

        pegarNotificacoes();
    }, [atualizar])

    if (!notificacoes) return <Carregando />

    return <>
        <BreadcrumbsNotificacoes />
        <div className="section">
            <h2 className="center">
                <Icon style={{ fontSize: "40px" }}>notifications</Icon>
                Notificações
            </h2>
        </div>
        <div className="section">
            <div className="card ">
                <div className="card-content">
                    <div className="section">
                        <div className="row">
                            <div className="col s12">
                                {notificacoes.filter((notificacao) => {
                                    return notificacao.destinatario === usuario._id || notificacao.destinatario === "coordenador";
                                }).map((notificacao) => {
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
                                                return <NotificacaoAvaliacao
                                                    remetente={notificacao.remetenteNome}
                                                    titulo={notificacao.titulo}
                                                    projetoId={notificacao.projetoId}
                                                    convite={notificacao._id}
                                                    atualizar={atualizarDados} />
                                            case 'suplente':
                                                return <NotificacaoSuplente
                                                    remetente={notificacao.remetenteNome}
                                                    titulo={notificacao.titulo}
                                                    projetoId={notificacao.projetoId}
                                                    convite={notificacao._id}
                                                    atualizar={atualizarDados} />
                                            case 'cancelamento':
                                                return <NotificacaoCancelamento
                                                    remetente={notificacao.remetenteNome}
                                                    titulo={notificacao.titulo}
                                                    projetoId={notificacao.projetoId}
                                                    descricao={notificacao.descricao}
                                                    convite={notificacao._id}
                                                    atualizar={atualizarDados} />
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