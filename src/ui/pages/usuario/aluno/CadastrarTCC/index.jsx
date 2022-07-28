import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { BotaoVoltar } from '../../../../components/botao/Voltar/index.jsx';
import { criarParticipacao, cadastrarProjeto } from '../../../../../api/cadastrar.js';
import { inserirParticipacaoUsuario, pegarTodosAlunos, pegarUsuario } from '../../../../../api/aluno.js';
import { inserirParticipacaoProjeto } from '../../../../../api/projeto.js';
import MessageTemplate from '../../../../components/errorMessageTemplate/index.jsx';
import { Carregando } from '../../../../components/Carregando/index.jsx';
import { buscarProfessores } from '../../../../../api/professor.js';
import { enviarConvitesAosParticipantes } from '../../../../../api/convites.js';
import { AuthContext } from '../../../../context/Auth/index.jsx';

const feedbackForm = {
    status: "",
    descricao: ""
};

export default function CadastrarTCC({ atualizar}) {
    const { usuario } = useContext(AuthContext);
    const [projeto, setProjeto] = useState({
        titulo: "",
        descricao: "",
        disciplina: ""
    });
    const [participantes, setParticipantes] = useState({
        participanteUm: "",
        participanteDois: "",
        participanteTres: "",
        orientador: "",
        avaliador: "",
        suplente: ""
    });
    const [dadosUsuario, setUsuario] = useState(null);
    const [alunos, setAlunos] = useState();
    const [professores, setProfessores] = useState();
    const [orientador, setOrientador] = useState();
    const [feedback, setFeedback] = useState({
        participante: feedbackForm,
        professores: feedbackForm,
        resultado: feedbackForm
    });

    useEffect(() => {
        const buscarDados = async () => {
            const resUsuario = await pegarUsuario(usuario._id);
            const resAlunos = await pegarTodosAlunos();
            const resProfesosres = await buscarProfessores();
            setUsuario(resUsuario.data);
            setAlunos(resAlunos.data);
            setProfessores(resProfesosres.data);
        };
        buscarDados();
    }, []);

    const pegarValores = (e) => {
        const { name, value } = e.target;

        setProjeto({ ...projeto, [name]: value });
    };

    const pegarParticipantes = async (e) => {
        const { name, value } = e.target;

        if (Object.values(participantes).includes(value) === true)
            return setFeedback({
                participantes: {
                    status: "falha",
                    descricao: "Por favor, selecione um usuário diferente para cada campo!"
                }
            });

        setParticipantes({ ...participantes, [name]: value });

        if(name === "orientador") await pegarUsuario(value).then(res => setOrientador(res.data));

    };

    const enviarProjeto = async (e) => {
        e.preventDefault();

        if (projeto.titulo === "" || projeto.descricao === "" || projeto.disciplina === "") {
            return setFeedback({
                resultado: {
                    status: "falha",
                    descricao: "Preencha todos os campos"
                }
            });
        }
        if (participantes.orientador === "") {
            return setFeedback({
                resultado: {
                    status: "falha",
                    descricao: "Escolha um orientador"
                }
            });
        }

        if (usuario.participacoes.length > 0) {
            return setFeedback({
                resultado: {
                    status: "falha",
                    descricao: "Você já possui um projeto cadastrado"
                }
            });
        }

        try {
            const projetoInfo = await cadastrarProjeto(projeto);
            const participacaoAluno = await criarParticipacao({
                nome: usuario.nome,
                turmas: usuario.turmas,
                cod: usuario.cod,
                tipo: 'aluno',
                usuarioId: usuario._id,
                projetoId: projetoInfo.data._id
            });
            const participacaoOrientador = await criarParticipacao({
                nome: orientador.nome,
                tipo: 'orientador',
                cod: orientador.cod,
                status: 'pendente',
                usuarioId: participantes.orientador,
                projetoId: projetoInfo.data._id
            });
            await enviarConvitesAosParticipantes({
                ids: participantes, dados: {
                    titulo: projeto.titulo,
                    disciplina: projetoInfo.disciplina,
                    projetoId: projetoInfo.data._id,
                    usuarioId: usuario._id,
                    remetenteNome: usuario.nome
                }
            });
            await inserirParticipacaoUsuario(usuario._id, participacaoAluno);
            await inserirParticipacaoProjeto(projetoInfo.data._id, participacaoAluno);
            await inserirParticipacaoProjeto(projetoInfo.data._id, participacaoOrientador);
            setFeedback({
                resultado: {
                    status: "sucesso",
                    descricao: "Projeto cadastrado com sucesso!"
                }
            });
            return atualizar();
        } catch (e) {
            console.log(e);
            return setFeedback({
                resultado: {
                    status: "falha",
                    descricao: "Erro no sistema ao cadastrar projeto, tente mais tarde."
                }
            });
        }
    }

    if (!alunos || !professores) return <Carregando />

    return <>
        <div>
            <BotaoVoltar />
            <h1 className="center" style={{ padding: "15px" }}>Cadastro de Projeto</h1>
            <div className="card white" style={{ padding: "40px" }}>
                <h3 className="center">Preencha os dados do seu projeto</h3>
                <div>
                    <div className="card-content">
                        <form onSubmit={enviarProjeto}>
                            <h7 className="gray-text left">Nome do Projeto</h7>
                            <input type="text" name="titulo" value={projeto.titulo} onChange={(e) => pegarValores(e)}></input>
                            <h7 className="left">Descrição do projeto</h7>
                            <textarea name="descricao" id="textarea1" class="materialize-textarea" value={projeto.descricao} onChange={(e) => pegarValores(e)} ></textarea>
                            <h4>Disciplina</h4>
                            {dadosUsuario.turmas.turmaDois ? (
                                <div>
                                    <form onChange={e => setProjeto({ ...projeto, "disciplina": e.target.value })}>
                                        <label>
                                            <input name="group1" value="TCC I" type="radio" />
                                            <span>TCC I</span>
                                        </label>
                                        <label>
                                            <input name="group1" value="TCC II" type="radio" />
                                            <span>TCC II</span>
                                        </label>
                                    </form>
                                </div>
                            ) : (
                                <div>
                                    <form onChange={e => setProjeto({ ...projeto, "disciplina": e.target.value })}>
                                        <label>
                                            <input name="group1" value="TCC I" type="radio" />
                                            <span>TCC I</span>
                                        </label>
                                    </form>

                                </div>
                            )}
                            <strong>
                                <h4>Participantes</h4>
                            </strong>
                            <MessageTemplate mensagem={{ ...feedback.participantes }} />
                            <select name="participanteUm" class="browser-default" value={participantes.participanteUm} onChange={e => { pegarParticipantes(e); }}>
                                <option selected>Escolha o participante 1 do seu grupo (caso não tenha, escolha esta opção)</option>
                                {alunos.filter((aluno) => {
                                    return aluno.participacoes.length <= 0 && aluno._id != usuario._id
                                }).map((aluno, index) => {
                                    return <option key={index} value={aluno._id}>{aluno.nome}</option>;
                                })}
                            </select>
                            <select name="participanteDois" class="browser-default" value={participantes.participanteDois} onChange={e => pegarParticipantes(e)}>
                                <option selected>Escolha o participante 2 do seu grupo (caso não tenha, não escolha nenhuma opção)</option>
                                {alunos.filter((aluno) => {
                                    return aluno.participacoes.length <= 0 && aluno._id != usuario._id
                                }).map((aluno, index) => {
                                    return <option key={index} value={aluno._id} >{aluno.nome}</option>;
                                })}
                            </select>
                            <select name="participanteTres" class="browser-default" value={participantes.participanteTres} onChange={e => pegarParticipantes(e)}>
                                <option selected>Escolha o participante 3 do seu grupo (caso não tenha, não escolha nenhuma opção)</option>
                                {alunos.filter((aluno) => {
                                    return aluno.participacoes.length <= 0 && aluno._id != usuario._id
                                }).map((aluno, index) => {
                                    return <option key={index} value={aluno._id}>{aluno.nome}</option>;
                                })}
                            </select>
                            <strong>
                                <h4 className="left">Orientador</h4>
                            </strong>
                            <select name="orientador" class="browser-default" value={participantes.orientador} onChange={e => pegarParticipantes(e)}>
                                <option selected>Escolha o professor orientador</option>
                                {professores.filter((professor) => {
                                    return professor.permissoes.orientador === true
                                }).map((professor, index) => {
                                    return <option key={index} value={professor._id}>{professor.nome}</option>;
                                })}
                            </select>
                            <strong>
                                <h4 className="left">Avaliador</h4>
                            </strong>
                            <select name="avaliador" class="browser-default" value={participantes.avaliador} onChange={e => pegarParticipantes(e)}>
                                <option selected>Escolha o professor avaliador</option>
                                {professores.filter((professor) => {
                                    return professor.permissoes.avaliador === true
                                }).map((professor, index) => {
                                    return <option key={index} value={professor._id}>{professor.nome}</option>;
                                })}
                            </select>
                            <strong>
                                <h4 className="left">Suplente</h4>
                            </strong>
                            <select name="suplente" class="browser-default" value={participantes.suplente} onChange={e => pegarParticipantes(e)}>
                                <option selected>Escolha o professor suplente</option>
                                {professores.filter((professor) => {
                                    return professor.permissoes.orientador === true
                                }).map((professor, index) => {
                                    return <option key={index} value={professor._id}>{professor.nome}</option>;
                                })}
                            </select>
                            <MessageTemplate mensagem={{ ...feedback.resultado }} />
                            <div className="center" style={{ marginTop: "15px" }}>
                                <button class="btn red accent-4" type="submit" name="action">Cadastrar Projeto</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>;
}