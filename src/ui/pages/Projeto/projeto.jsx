import React from 'react';
import { useLocation } from 'react-router-dom';
import { MdPersonOutline, MdFormatListBulleted, MdMenu, MdTimer } from 'react-icons/md'
import { BreadcrumbsControleEspecifico } from '../../components/Breadcrumbs/ControleEspecificoBC';
function OutroProjeto() {

  const location = useLocation();

  const PROJETO = location.state.controle;

  return <>
    <BreadcrumbsControleEspecifico texto={PROJETO.titulo} />
    <div className="section">
      <h2 className="center">Convite para orientação</h2>
    </div>
    <div className="section">
      <div className="card ">
        <div className="card ">
          <div className="section card-title center">
            <h4>{PROJETO.titulo}</h4>
          </div>
          <div className="card-content ">
            <div className="section">

              <div className="row">
                <div className="col s12">
                  <h5><b>Dados do Projeto </b>
                  </h5>
                  <p className="right">Situação do projeto: {PROJETO.situacao}</p>
                </div>

              </div>


              <ul className="collection">


                <li className="collection-item avatar">
                  <i className="material-icons circle"><MdFormatListBulleted /></i>
                  <span className="title">
                    <b>Descrição</b>
                  </span>
                  <p>{PROJETO.descricao}
                  </p>
                </li>


                <li className="collection-item avatar">
                  <i className="material-icons circle"><MdFormatListBulleted /></i>
                  <span className="title">
                    <b>Disciplina</b>
                  </span>
                  <p>{PROJETO.disciplina}
                  </p>
                </li>


                <li className="collection-item avatar">
                  <i className="material-icons circle"><MdPersonOutline /> </i>
                  <span className="title">
                    <b>Orientador</b>
                  </span>
                  <p>{PROJETO.professor}</p>

                  <div className="col s1 offset-s12 right-align">
                    <span className="badge yellow darken-4 white-text text-darken-2">Situação: {PROJETO.statusProfessor}</span>
                  </div>
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
                      <th>Turma</th>
                    </tr>
                  </thead>


                  <tbody>
                    <tr>
                      <td>{PROJETO.alunos[0].nome}</td>
                      <td>{PROJETO.alunos[0].codMatricula}</td>
                      <td>{PROJETO.alunos[0].turma}</td>

                    </tr>
                    <tr>
                      <td>{PROJETO.alunos[1].nome}</td>
                      <td>{PROJETO.alunos[1].codMatricula}</td>
                      <td>{PROJETO.alunos[1].turma}</td>

                    </tr>
                    <tr>
                      <td>{PROJETO.alunos[2].nome}</td>
                      <td>{PROJETO.alunos[2].codMatricula}</td>
                      <td>{PROJETO.alunos[2].turma}</td>

                    </tr>
                  </tbody>

                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="card">
        <div class="card-content ">
          <h4 class="center">Convite para orientar este projeto</h4>
          <br /><hr />
          <h5 class="center"><b>Resposta:</b></h5>
          <br />
          <form class="col s12" action="/#" method="POST">

            <div class="col 12">
              <p class="center">
                <label class="">
                  <input name="resposta" type="radio" id="resposta" value="sim" required="" /><span>Sim</span>
                </label>
              </p>
              <p class="center">
                <label class="">
                  <input name="resposta" type="radio" id="resposta" value="nao" required="" /><span>Não</span>
                </label>
              </p>
            </div>
            <br />
            <div className="center-align">
              <button className="modal-close btn red accent-4 center" type="submit" name="action">Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>
}

export default OutroProjeto;