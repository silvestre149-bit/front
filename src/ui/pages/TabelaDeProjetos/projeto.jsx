import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MdPersonOutline, MdFormatListBulleted, MdTimer, MdOutlinePendingActions } from 'react-icons/md'
import { BreadcrumbsProjetoEspecifico } from '../../components/Breadcrumbs/ProjetoEspecificoBC';
import { Carregando } from '../../components/Carregando/index.jsx';
import { buscarAvaliadorDoProjeto, buscarOrientadorDoProjeto, buscarSuplenteDoProjeto, pegarProjeto } from '../../../api/projeto';
import { ModalAdicionarAlunoProjeto } from '../../components/novos-modais/ProfModal/AdicionarAluno';
import { ModalRemoverAlunoProjeto } from '../../components/novos-modais/ProfModal/RemoverAlunoProjeto';

function Projeto() {
  const [projeto, setProjeto] = useState();
  const [orientador, setOrientador] = useState();
  const [avaliador, setAvaliador] = useState();
  const [suplente, setSuplente] = useState();
  const [carregando, setCarregando] = useState(true);
  const [atualizar, setAtualizar] = useState(false);
  const location = useLocation();
  const dados = location.state.projeto;

  const atualizarComponente = (value) => setAtualizar(value);
  useEffect(() => {
    const buscarDados = async () => {
      const projeto = await pegarProjeto(dados.id);
      setProjeto(projeto.data);

      const orientador = await buscarOrientadorDoProjeto(dados.id);
      setOrientador(orientador.data);

      const avaliador = await buscarAvaliadorDoProjeto(dados.id);
      setAvaliador(avaliador.data);

      const suplente = await buscarSuplenteDoProjeto(dados.id);
      setSuplente(suplente.data);

      setCarregando(false);
    }
    buscarDados();
  }, [atualizar]);

  if (carregando) return <Carregando />;

  console.log(projeto);
  return <>
    <BreadcrumbsProjetoEspecifico />
    <h4 className="center">{projeto.titulo}</h4>
    <div className="section card-title card">
      <div className="card-content">
        <div className="row">
          <div className="col s4">
            <ModalAdicionarAlunoProjeto atualizar={atualizarComponente} dadosProjeto={projeto} />
          </div>
          <div className='right-align col s8'>
            <ModalRemoverAlunoProjeto atualizar={atualizarComponente} dadosProjeto={projeto} />
          </div>
        </div>
        <div className="section">
          <div className="row">
            <div className="col s12">
              <h5>
                <b>Dados do Projeto:</b>
              </h5>
              <p className="right">Situação do projeto: {projeto.status} </p>
            </div>
          </div>
          <ul className="collection">
            <li className="collection-item avatar">
              <i className="material-icons circle"><MdFormatListBulleted /></i>
              <span className="title">
                <b>Descrição</b>
                <p>{projeto.descricao}</p>
              </span>
              <p>
              </p>
            </li>
            <li className="collection-item avatar">
              <i className="material-icons circle"><MdFormatListBulleted /></i>
              <span className="title">
                <b>Disciplina</b>
                <p>{projeto.disciplina}</p>
              </span>
              <p>
              </p>
            </li>
            <li className="collection-item avatar">
              <i className="material-icons circle"><MdTimer /></i>
              <span className="title">
                <b>Avaliação do pôster</b>
              </span>
              <p>Data: - Horário:  <br /> Local da avaliação:
              </p>
            </li>
            {projeto.cronogramaDeOrientacao ? (
              <li className="collection-item avatar">
                <i className="material-icons circle"><MdTimer /></i>
                <span className="title">
                  <b>Cronograma de orientação</b>
                </span>
                <p>
                  Data: {projeto.cronogramaDeOrientacao.data} -
                  Horário: {projeto.cronogramaDeOrientacao.horas}  <br />
                  Local da orientação: {projeto.cronogramaDeOrientacao.local}
                </p>
              </li>
            ) : (
              <li className="collection-item avatar">
                <i className="material-icons circle"><MdTimer /></i>
                <span className="title">
                  <b>Cronograma de orientação</b>
                </span>
                <p>Nenhum cronograma encontrado
                </p>
              </li>
            )}
            <li className="collection-item avatar">
              <i className="material-icons circle"><MdPersonOutline /> </i>
              <span className="title">
                <b>Orientador</b>
              </span>
              {orientador ? (
                <>
                  <p>{orientador.nome}</p>
                  {orientador.status === 'aceito' ? (
                    <div className="col s1 offset-s12 right-align">
                      <span className="badge green darken-4 white-text text-darken-2">Situação: {orientador.status}</span>
                    </div>
                  ) : (
                    <div className="col s1 offset-s12 right-align">
                      <span className="badge yellow darken-4 white-text text-darken-2">Situação: {orientador.status}</span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <p>Nenhum orientador presente</p>
                  <div className="col s1 offset-s12 right-align">
                    <span className="badge red darken-4 white-text text-darken-2">Situação:  </span>
                  </div>
                </>
              )}
              <p></p>
            </li>
            <li className="collection-item avatar">
              <i className="material-icons circle"><MdPersonOutline /> </i>
              <span className="title">
                <b>Avaliador</b>
              </span>
              {avaliador ? (
                <>
                  <p>{avaliador.nome}</p>
                  {avaliador.status === 'aceito' ? (
                    <div className="col s1 offset-s12 right-align">
                      <span className="badge green darken-4 white-text text-darken-2">Situação: {avaliador.status}</span>
                    </div>
                  ) : (
                    <div className="col s1 offset-s12 right-align">
                      <span className="badge yellow darken-4 white-text text-darken-2">Situação: {avaliador.status}</span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <p>Nenhum avaliador presente</p>
                  <div className="col s1 offset-s12 right-align">
                    <span className="badge red darken-4 white-text text-darken-2">Situação:  </span>
                  </div>
                </>
              )}
              <p></p>
            </li>
            <li className="collection-item avatar">
              <i className="material-icons circle"><MdPersonOutline /> </i>
              <span className="title">
                <b>Suplente</b>
              </span>
              {suplente ? (
                <>
                  <p>{suplente.nome}</p>
                  {suplente.status === 'aceito' ? (
                    <div className="col s1 offset-s12 right-align">
                      <span className="badge green darken-4 white-text text-darken-2">Situação: {suplente.status}</span>
                    </div>
                  ) : (
                    <div className="col s1 offset-s12 right-align">
                      <span className="badge yellow darken-4 white-text text-darken-2">Situação: {suplente.status}</span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <p>Nenhum suplente presente</p>
                  <div className="col s1 offset-s12 right-align">
                    <span className="badge red darken-4 white-text text-darken-2">Situação:  </span>
                  </div>
                </>
              )}
              <p></p>
            </li>
          </ul>
        </div>
        <div className="section">
          <div className="row">
            <div className="col s8">
              <h5><b> Dados da Equipe </b></h5>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Aluno</th>
                  <th>TIA</th>
                  <th>1º Turma</th>
                  <th>2º Turma</th>
                </tr>
              </thead>
              <tbody>
                {projeto.participantes.map((participante) => {
                  if (participante.tipo === 'aluno') {
                    return <>
                      <tr>
                        <td>{participante.nome}</td>
                        <td>{participante.cod}</td>
                        <td>{participante.turmas.turmaUm ? (
                          <>{participante.turmas.turmaUm}</>
                        ) : (
                          <></>
                        )}</td>
                        <td>{participante.turmas.turmaDois ? (
                          <>{participante.turmas.turmaDois}</>
                        ) : (
                          <></>
                        )}</td>
                      </tr>
                    </>;
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Projeto;