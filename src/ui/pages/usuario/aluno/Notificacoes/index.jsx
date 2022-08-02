import React, { useEffect, useState, useContext } from 'react';
import { buscarNotificacoes } from '../../../../../api/convites';
import NotificacaoParticipacao from '../../../../components/notificacaoTemplate/participacao.jsx';
import { pegarSemestreAberto } from '../../../../../api/semestre';
import { Icon } from 'react-materialize';
import { AuthContext } from '../../../../context/Auth';
import { Carregando } from '../../../../components/Carregando';
import NotificacaoProjetoRecusado from '../../../../components/notificacaoTemplate/projetoRecusado';

export function NotificacoesAluno() {
    const [notificacoes, setNotificacoes] = useState([]);
    const [atualizar, setAtualizar] = useState(false);
    const { usuario } = useContext(AuthContext);

    const atualizarPagina = () => {
        setAtualizar(!atualizar);
    };

    useEffect(() => {
        const pegarNotificacoes = async () => {
            const res = await buscarNotificacoes(usuario._id);
            setNotificacoes(res.data);
            setAtualizar(false);
        };

        pegarNotificacoes();
    }, [atualizar])

    if (!notificacoes) return <Carregando />

    return <>
        <div class="section">
            <div class="row">
                <div class="col s12 ">
                    <div class="card white darken-1">
                        <div class="card-content">
                            <span class="card-title "><b>
                                <h5 className="center">
                                    <Icon style={{ fontSize: "40px" }}>
                                        notifications
                                    </Icon>
                                </h5>
                                Notificações novas (Não respondidas)</b></span>
                            <hr />
                            {notificacoes.map((notificacao) => {
                                if (usuario.participacoes.length >= 1) {
                                    if (notificacao.tipo === 'recusado') {
                                        return <NotificacaoProjetoRecusado
                                            remetente={notificacao.remetenteNome}
                                            titulo={notificacao.titulo}
                                            projetoId={notificacao.projetoId}
                                            convite={notificacao._id}
                                            atualizar={atualizarPagina}
                                        />
                                    }
                                } else {
                                    if (notificacao.tipo === 'participacao') {
                                        return <NotificacaoParticipacao
                                            remetente={notificacao.remetenteNome}
                                            titulo={notificacao.titulo}
                                            projetoId={notificacao.projetoId}
                                            convite={notificacao._id}
                                            atualizar={atualizarPagina}
                                        />
                                    }
                                }
                            })}
                        </div>
                        <div class="card-action" style={{
                            display: "flex", justifyContent: "space-between", alignItens: "center", marginBottom: "1.5em", fontSize: "2vmin"
                        }}>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}