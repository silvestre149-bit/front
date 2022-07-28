import React, { useState, useEffect } from 'react';
import { pegarSemestreAberto } from '../../../api/semestre.js';
import NotificacaoAvaliacao from '../notificacaoTemplate/avaliacao.jsx';
import NotificacaoOrientacao from '../notificacaoTemplate/orientacao.jsx';
import NotificacaoCancelamento from '../notificacaoTemplate/cancelamento.jsx';
import NotificacaoSuplente from '../notificacaoTemplate/suplente.jsx';
import { buscarNotificacoes } from '../../../api/convites.js';
import { Carregando } from '../Carregando/index.jsx';
import AvisoSemestreFechado from '../AvisoSemestre/index.jsx';
import { useContext } from 'react';
import { AuthContext } from '../../context/Auth/index.jsx';
import { Icon } from 'react-materialize';

function HomeProf() {
    const [semestre, setSemestre] = useState([]);
    const [notificacoes, setNotificacoes] = useState([]);
    const [dados, setNovosDados] = useState(0);
    const { usuario } = useContext(AuthContext);

    const atualizarDados = () => {
        setNovosDados(1 + dados);
    };

    useEffect(() => {
        const buscarDados = async () => {
            const resSemestre = await pegarSemestreAberto();
            const resNotificacoes = await buscarNotificacoes(usuario._id);
            setSemestre(resSemestre.data);
            setNotificacoes(resNotificacoes.data);
        };
        buscarDados();
    }, [dados])

    if (!notificacoes) return <Carregando />

    return <>
        {semestre.length === 0 ? (<AvisoSemestreFechado />) : (
            <>
                <div className="section">
                    <h1 className="center">Olá, professor {usuario.nome}</h1>
                    <h3 className="center">{semestre[0].titulo} - {semestre[0].dataAbertura}</h3>
                </div>
                <div className="section">
                </div>
                <div class="section">
                    <div class="row">
                        <div class="col s12 ">
                            <div class="card white darken-1">
                                <div class="card-content">
                                    <span class="card-title ">
                                        <Icon style={{ fontSize: "20px" }}>notifications</Icon> 
                                        <b>Notificações novas</b>
                                    </span>
                                    <hr />
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
                                                    return <NotificacaoAvaliacao
                                                        remetente={notificacao.remetenteNome}
                                                        titulo={notificacao.titulo}
                                                        projetoId={notificacao.projetoId}
                                                        atualizar={atualizarDados} />
                                                case 'suplente':
                                                    return <NotificacaoSuplente
                                                        remetente={notificacao.remetenteNome}
                                                        titulo={notificacao.titulo}
                                                        projetoId={notificacao.projetoId}
                                                        atualizar={atualizarDados} />
                                                case 'cancelamento':
                                                    if (usuario.permissoes.coordenador) {
                                                        return <NotificacaoCancelamento
                                                            remetente={notificacao.remetenteNome}
                                                            titulo={notificacao.titulo}
                                                            descricao={notificacao.descricao}
                                                            projetoId={notificacao.projetoId}
                                                            atualizar={atualizarDados} />
                                                    }
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
        )}
    </>
}

export default HomeProf;
