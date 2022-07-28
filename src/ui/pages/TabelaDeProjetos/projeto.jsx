import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MdPersonOutline, MdFormatListBulleted, MdTimer, MdOutlinePendingActions } from 'react-icons/md'
import { BreadcrumbsProjetoEspecifico } from '../../components/Breadcrumbs/ProjetoEspecificoBC';
import { pegarSemestreAberto } from '../../../api/semestre.js';
import { Carregando } from '../../components/Carregando/index.jsx';

function Projeto() {
  const [semestre, setSemestre] = useState('');
  const [carregando, setCarregando] = useState(true);
  const location = useLocation();
  const projeto = location.state.projeto;

  useEffect(() => {
    const buscarSemestre = async () => {
      const res = await pegarSemestreAberto();
      setSemestre(res.data);
      setCarregando(false);
    }
    buscarSemestre();
  }, []);

  if (carregando) return <Carregando />;

  return <>
    <BreadcrumbsProjetoEspecifico />
    <div className="section">
      <h3 className="center">{projeto.titulo}</h3>
    </div>
    <br />
    <br />
    <div className="section">
      <div className="card ">
        <div className="card ">
          <div className="section card-title center">
            <h4></h4>
          </div>
          <div className="card-content ">
            <div className="section">
              <div className="row">
                <div className="col s12">
                  <h5><b>Dados do Projeto </b>
                  </h5>
                  <p className="right">Situação do projeto: {projeto.status} </p>
                </div>
              </div>
              <ul className="collection">
                <li className="collection-item avatar">
                  <i className="material-icons circle"><MdFormatListBulleted /></i>
                  <span className="title">
                    <b>Descrição</b>
                  </span>
                  <p>
                    {projeto.descricao}
                  </p>
                </li>
                <li className="collection-item avatar">
                  <i className="material-icons circle"><MdFormatListBulleted /></i>
                  <span className="title">
                    <b>Disciplina</b>
                  </span>
                  <p>
                    {projeto.disciplina}
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

                <li className="collection-item avatar">
                  <i className="material-icons circle"><MdPersonOutline /> </i>
                  <span className="title">
                    <b>Orientador</b>
                  </span>
                  <p></p>
                  <div className="col s1 offset-s12 right-align">
                    <span className="badge yellow darken-4 white-text text-darken-2">Situação: </span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="section">
              <div className="row">
                <div className="col s8">
                  <h5>
                    <b> Dados da Equipe </b>
                  </h5>
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
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Projeto;