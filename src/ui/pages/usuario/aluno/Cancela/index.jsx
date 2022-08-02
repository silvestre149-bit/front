import React, { useContext, useEffect, useState } from 'react';
import { isValidElement } from 'react';
import { buscarCoordenadores } from '../../../../../api/aluno';
import { buscarPedidoAberto, enviarConvite, enviarConvitesAosParticipantes } from '../../../../../api/convites';
import { buscarProjetoDoAluno, buscarStatusDoOrientador } from '../../../../../api/projeto';
import { Carregando } from '../../../../components/Carregando';
import { ModalExcluirProjeto } from '../../../../components/novos-modais/AlunoModal/DelProjeto';
import { AuthContext } from '../../../../context/Auth';

export function CancelaAluno() {
  const { usuario } = useContext(AuthContext);
  const [projeto, setProjeto] = useState();
  const [orientador, setOrientador] = useState();
  const [carregando, setCarregando] = useState(true);
  const [pedido, setPedido] = useState();
  const [justificativa, setJustificativa] = useState('');
  const [feedback, setFeedback] = useState({
    status: '',
    descricao: '',
  });

  useEffect(() => {
    const pegarDados = async () => {
      const projeto = await buscarProjetoDoAluno(usuario._id);
      setProjeto(projeto.data);

      const orientador = await buscarStatusDoOrientador(projeto.data._id);
      setOrientador(orientador.data);

      const pedido = await buscarPedidoAberto(usuario._id);
      setPedido(pedido.data);

      setCarregando(false);
    };

    pegarDados();
  }, []);

  const enviarPedidoDeCancelamento = async (e) => {
    if (!justificativa)
      return setFeedback({
        status: 'falha',
        descricao: 'Por favor, preencha o campo de justificativa'
      })

    try {
      await enviarConvite({
        destinatario: 'coordenador',
        titulo: projeto.titulo,
        remetente: usuario._id,
        remetenteNome: usuario.nome,
        projetoId: projeto._id,
        descricao: justificativa,
        tipo: 'cancelamento'
      });

      return setFeedback({
        status: 'sucesso',
        descricao: 'Pedido enviado com sucsso!'
      })
    } catch (e) {
      console.log(e);
      return setFeedback({
        status: 'falha',
        descricao: 'Ocorreu um erro ao enviar o pedido de cancelamento'
      })
    }
  }
  if (carregando) return <Carregando />

  if (pedido.length > 0)
    return <div>
      <div className="red accent-4 center">
        <div style={{ padding: "50px", margin: "50px" }}>
          <h2 class="header white-text">Já há um pedido de cancelamento em andamento, aguarde</h2>
        </div>
      </div>
    </div>
  return <>
    {orientador ? (
      <div>
        <div className="red accent-4 center">
          <div style={{ padding: "50px", margin: "50px" }}>
            <h2 class="header white-text">O seu orientador já aceitou o convite.</h2>
            <p className="white-text">Não é mais possível fazer o pedido de cancelamento do projeto</p>
          </div>
        </div>
      </div>
    ) : (
      <>
        <h1 className="center">Protocolo de cancelamento do projeto</h1>
        <div className="section">
          <section className="white">
            <div className="card">
              <div className="card">
                <div className="card-content">
                  <h2 className="center" >Explique-nos o porquê</h2>
                  <strong><h6>Observação</h6></strong>
                  <p>O projeto só poderá ser cancelado caso não tenha sido aceito pelo orientador.</p>
                  <form>
                    <label style={{ padding: "4px" }}>Justificativa</label>
                    <input onChange={(e) => setJustificativa(e.target.value)} id="justificativa" type="text" />
                    <div className="center">
                      <ModalExcluirProjeto enviar={enviarPedidoDeCancelamento} resultado={feedback} />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    )}
  </>
}