
import { useState, useContext } from 'react';
import { Collapsible, CollapsibleItem, Icon, Button } from 'react-materialize';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/Auth';
import { deletarConvite } from '../../../api/convites';
import { inserirParticipacaoUsuario } from '../../../api/aluno.js';
import { criarParticipacao } from '../../../api/cadastrar.js';
import { pegarSemestreAberto } from '../../../api/semestre.js';
import { useEffect } from 'react';
import { inserirParticipacaoProjeto } from '../../../api/projeto';

export default function NotificacaoOrientacao({ remetente, titulo, projetoId, convite, atualizar }) {
    const history = useHistory();
    const { usuario } = useContext(AuthContext);
    const [semestre, setSemestre] = useState({});

    useEffect(() => {
        const pegarSemestre = async () => {
            const res = await pegarSemestreAberto();
            setSemestre(res.data);
        }
        
        pegarSemestre();
    }, [])

    const aceitarParticipacao = async (e) => {
        e.preventDefault();

        try {
            const participacao = await criarParticipacao({
                nome: usuario.nome,
                cod: usuario.cod,
                turmas: usuario.turmas,
                tipo: usuario.tipo,
                usuarioId: usuario._id,
                projetoId: projetoId,
                semestreId: semestre._id
            });
            await deletarConvite(convite);
            await inserirParticipacaoUsuario(usuario._id, participacao);
            await inserirParticipacaoProjeto(projetoId, participacao.data);

            return atualizar();
        } catch (e) {
            return console.log(e);
        }
    };

    const recusarConvite = async (e) => {
        e.preventDefault();

        try {
            await deletarConvite(convite);
            return atualizar();
        } catch (e) {
            return console.log(e);
        }
    }
    return <>
        <Collapsible accordion>
            <CollapsibleItem
                expanded={false}
                header={`O aluno ${remetente} convidou você para participar do projeto ${titulo}`}
                icon={<Icon>school</Icon>}
                node="div">
                <div className="row">
                    <div className="col s2">
                        <a onClick={(e) => aceitarParticipacao(e)} className="btn red accent-4 modal-trigger">
                            Aceitar
                        </a>
                    </div>
                    <div className="col s2">
                        <Button style={{
                            marginRight: '5px',
                            backgroundColor: 'red',
                        }}
                            onClick={(e) => { recusarConvite(e) }}>Recusar</Button>
                    </div>
                    <div className="col s5" />
                    <Button
                        onClick={() => { history.push('/informacoes/projeto', { projeto: projetoId, tipo: 'aluno', convite: convite }) }}
                        node="button"
                        style={{
                            marginRight: '5px',
                            backgroundColor: 'red',
                        }}
                        waves="light">
                        Ver o projeto
                    </Button>
                </div>
            </CollapsibleItem>
        </Collapsible>
    </>
}