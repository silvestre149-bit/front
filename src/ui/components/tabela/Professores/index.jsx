import React, { useState, useEffect } from 'react';
import { TabelaDeProfessores } from './tabela';
import { BreadcrumbsProfessores } from '../../../components/Breadcrumbs/ProfessoresBC/index'
import { pegarTodosUsuarios } from '../../../../api/aluno';
import CriarProf from '../../novos-modais/ProfModal/CriarProf';
import EditarProfessor from '../../novos-modais/ProfModal/EditarProfessor';
function TabelaProfessores() {

  const [dados, setDados] = useState([]);
  const [novoDado, setNovoDado] = useState(0);
  const atualizarTabela = (value) => setNovoDado(current => current + value);

  useEffect(() => {
    const pegarUsuarios = async () => {
      const res = await pegarTodosUsuarios();
      setDados(res.data);
    };

    pegarUsuarios();
  }, [novoDado])

  const dadosProfessores = dados.filter((professor) => {
    return professor.tipo === 'professor';
  }).map((professor) => {
    let professores = {};

    professores.nome = professor.nome;
    professores.cod = professor.cod;
    professores.email = professor.email;

    return professores;
  })


  return <>
    <BreadcrumbsProfessores />
    <div className="section">
      <h2 className="center">Lista de Professores</h2>
      <div className="row m-auto">
        <div className="col s12">
          <div className="col s8">
            <CriarProf atualizar={atualizarTabela} />
          </div>
          <div className="col s4">
            <EditarProfessor atualizar={atualizarTabela} />
          </div>
        </div>
      </div>
      <section className="white">
        <div className="card">
          <div className="card">
            <div className="card-content">
              <TabelaDeProfessores informacoes={dadosProfessores} />
            </div>
          </div>
        </div>
      </section>
    </div>
  </>;
}

export default TabelaProfessores;