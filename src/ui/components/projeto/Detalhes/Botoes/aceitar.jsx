import { useHistory } from "react-router-dom";
import { deletarConvite } from "../../../../../api/convites";
import { Button } from "react-materialize";
import { aceitarAvaliacao, aceitarSuplente } from "../../../../../api/professor";
import { criarParticipacao } from "../../../../../api/cadastrar";
import { useContext } from "react";
import { AuthContext } from "../../../../context/Auth";
import { inserirParticipacaoUsuario } from "../../../../../api/aluno";
import { atualizarProjeto, inserirParticipacaoProjeto } from "../../../../../api/projeto";

export default function AceitarConvite({ projeto, tipo, convite, atualizar }) {
    const { usuario } = useContext(AuthContext);
    const history = useHistory();
    const enviarFormulario = async (e) => {
        e.preventDefault();

        try {
            if (tipo === 'avaliador') {
                const participacao = await criarParticipacao({
                    nome: usuario.nome,
                    cod: usuario.cod,
                    tipo: usuario.tipo,
                    usuarioId: usuario._id,
                    projetoId: projeto,
                });
                await aceitarAvaliacao(projeto)
                await inserirParticipacaoUsuario(usuario._id, participacao);
                await deletarConvite(convite);

                return history.push('/notificacoes');
            }
            ;
            if (tipo === 'suplente') {
                const participacao = await criarParticipacao({
                    nome: usuario.nome,
                    cod: usuario.cod,
                    tipo: usuario.tipo,
                    usuarioId: usuario._id,
                    projetoId: projeto,
                });
                await aceitarSuplente(projeto);
                await inserirParticipacaoUsuario(usuario._id, participacao);
                await deletarConvite(convite);

                return history.push('/notificacoes');
            };
            if (tipo === 'cancelamento') {
                await atualizarProjeto(projeto, { status: 'fechado' });
                await deletarConvite(convite);

                atualizar(true);
                return history.push('/notificacoes');
            };
            const participacao = await criarParticipacao({
                nome: usuario.nome,
                cod: usuario.cod,
                turmas: usuario.turmas,
                tipo: 'aluno',
                usuarioId: usuario._id,
                projetoId: projeto,
            });
            await inserirParticipacaoProjeto(projeto, participacao.data);
            await inserirParticipacaoUsuario(usuario._id, participacao);
            await deletarConvite(convite);

            return history.push('/notificacoes');
        } catch (e) {
            return console.log(e);
        }
    }

    return <>
        <Button style={{
            backgroundColor: 'red',
        }}
            onClick={(e) => { enviarFormulario(e) }}>Aceitar</Button>
    </>
}