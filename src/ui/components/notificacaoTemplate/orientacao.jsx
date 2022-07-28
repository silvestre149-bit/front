
import { useState, useContext } from 'react';
import { Collapsible, CollapsibleItem, Icon, Button, Modal } from 'react-materialize';
import MessageTemplate from '../../components/errorMessageTemplate/index.jsx';
import { useHistory, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/Auth';
import { adicionarCronogramaOrientacao, removerParticipacaoProjeto } from '../../../api/projeto';
import { aceitarOrientacao } from '../../../api/professor';
import { deletarConvite } from '../../../api/convites';
import { inserirParticipacaoUsuario } from '../../../api/aluno.js';
import { criarParticipacao } from '../../../api/cadastrar.js';
import { pegarSemestreAberto } from '../../../api/semestre.js';
import { useEffect } from 'react';

export default function NotificacaoOrientacao({ remetente, titulo, projetoId, convite, atualizar }) {
    const history = useHistory();
    const { usuario } = useContext(AuthContext);
    const location = useLocation();
    const [modalTrigger, setTrigger] = useState(false);
    const [semestre, setSemestre] = useState({});
    const [feeedback, setFeedback] = useState({
        status: '',
        mensagem: ''
    });
    const [dados, setDados] = useState({
        orientador: usuario.nome,
        email: usuario.email,
        data: "",
        horas: "",
        local: ""
    });

    useEffect(() => {
        const pegarSemestre = async () => {
            const res = await pegarSemestreAberto();
            setSemestre(res.data);
        }
        pegarSemestre();
    }, [])
    const pegarValores = (e) => {
        const { name, value } = e.target;
        setDados({ ...dados, [name]: value });
    };

    const enviarFormulario = async (e) => {
        e.preventDefault();
        if (dados.data === "" || dados.horas === "" || dados.local === "") {
            return setFeedback({
                status: 'falha',
                descricao: 'Preencha todos os campos'
            });
        }

        try {
            const participacao = await criarParticipacao({
                nome: usuario.nome,
                cod: usuario.cod,
                tipo: usuario.tipo,
                usuarioId: usuario._id,
                projetoId: projetoId,
                semestreId: semestre._id
            });
            await adicionarCronogramaOrientacao(projetoId, dados);
            await aceitarOrientacao(projetoId);
            await deletarConvite(convite);
            await inserirParticipacaoUsuario(usuario._id, participacao);
            setFeedback({
                status: 'sucesso',
                descricao: 'Orientação adicionada com sucesso'
            });

            return atualizar();
        } catch (e) {
            console.log(e);

            return setFeedback({
                status: 'falha',
                descricao: 'Erro ao adicionar orientação'
            })
        }
    };

    const recusarConvite = async (e) => {
        e.preventDefault();
        
        try {
            if(usuario.permissoes.orientador) await removerParticipacaoProjeto(projetoId);
            await deletarConvite(convite);

            return atualizar();
        } catch(e) {
            return console.log(e);
        }
    }
    return <>
        <Collapsible accordion>
            <CollapsibleItem
                expanded={false}
                header={`O aluno ${remetente} convidou você para orientar o projeto ${titulo}`}
                icon={<Icon>school</Icon>}
                node="div">
                <div className="row">
                    <div className="col s2">
                        <a onClick={() => { history.push(location.pathname, projetoId); setTrigger(true) }} className="btn red accent-4 modal-trigger">
                            Aceitar
                        </a>
                    </div>
                    <Modal
                        open={modalTrigger}
                        options={{
                            dismissible: false,
                            endingTop: '10%',
                            inDuration: 250,
                            opacity: 0.5,
                            outDuration: 250,
                            preventScrolling: true,
                            startingTop: '4%'
                        }}
                    >
                        <form onSubmit={enviarFormulario}>
                            <div className="modal-content">
                                <div className="container">
                                    <h4 style={{ marginTop: '1em', fontSize: '1.8em' }}><b>Confirmação</b></h4>
                                    <p style={{ marginTop: '2em', fontSize: '1.2em', marginBottom: '1.5em' }}><b>Por favor, preencha o cronograma de orientação.</b></p>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input name="local" type="text" value={dados.local} onChange={(e) => pegarValores(e)} />
                                            <label for="local">Local:</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input name="horas" type="text" value={dados.horas} onChange={(e) => pegarValores(e)} />
                                            <label for="horas">Horário: </label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input name="data" type="date" value={dados.data} onChange={(e) => pegarValores(e)} />
                                            <label for="data">Data: </label>
                                        </div>
                                    </div>
                                </div>
                                <MessageTemplate mensagem={feeedback} />
                                <div className="modal-footer" style={{
                                    display: "flex", justifyContent: "right", marginBottom: "1.5em", paddingRight: "3rem"
                                }}>
                                    <button type="submit" id="aceitar" className=" btn red accent-4" style={{ marginRight: '1rem' }}>Confirmar</button>
                                    <button type="button" onClick={e => setTrigger(false)} id="naoAceitar" className="modal-close btn grey">Não confirmar</button>
                                </div>
                            </div>
                        </form>
                    </Modal>
                    <div className="col s2">
                        <Button style={{
                            marginRight: '5px',
                            backgroundColor: 'red',
                        }}
                            onClick={(e) => {recusarConvite(e)}}>Recusar</Button>
                    </div>
                    <div className="col s5" />
                    <Button
                        href={`/informacoes/projeto`}
                        state={projetoId}
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