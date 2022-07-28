import React, { useEffect, useState, useContext } from 'react';
import { buscarNotificacoes } from '../../../../../api/convites';
import NotificacaoParticipacao from '../../../../components/notificacaoTemplate/participacao.jsx';
import { pegarSemestreAberto } from '../../../../../api/semestre';
import { Icon } from 'react-materialize';
import { AuthContext } from '../../../../context/Auth';
import { Carregando } from '../../../../components/Carregando';

export function NotificacoesAluno() {
    const [notificacoes, setNotificacoes] = useState([]);
    const [semestre, setSemestre] = useState([]);
    const { usuario } = useContext(AuthContext);

    useEffect(() => {
        const buscarSemestreAberto = async () => {
            const res = await pegarSemestreAberto();
            setSemestre(res.data);
        };
        const pegarNotificacoes = async () => {
            const res = await buscarNotificacoes(usuario._id);
            setNotificacoes(res.data);
        };

        pegarNotificacoes();
        buscarSemestreAberto();
    }, [])

    const aceitarConvite = async (e) => {
        e.preventDefault();

    }

    const recusarConvite = async (e) => {
        e.preventDefault();

    }

    if(!notificacoes) return <Carregando />
    
    return <>
        <h2 className="center"><Icon style={{ fontSize: "40px" }}>notifications</Icon>Notificações</h2>
        <div class="section">
            <div class="row">
                <div class="col s12 ">
                    <div class="card white darken-1">
                        <div class="card-content">
                            <span class="card-title "><b>Notificações novas (Não respondidas)</b></span>
                            <hr />
                            {notificacoes.map((notificacao) => {
                                {
                                    switch (notificacao.tipo) {
                                        case 'participacao':
                                            return <NotificacaoParticipacao
                                                remetente={notificacao.remetenteNome}
                                                titulo={notificacao.titulo}
                                                projetoId={notificacao.projetoId} />
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