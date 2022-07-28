import { useEffect, useState } from 'react';
import { TabelaDeAlunos } from './tabela';
import { BreadcrumbsAlunos } from '../../Breadcrumbs/AlunosBC';
import { pegarTodosUsuarios } from '../../../../api/aluno';
import EditarAluno from '../../novos-modais/AlunoModal/EditAluno';
import AdicionarAluno from '../../novos-modais/AlunoModal/AddAluno';

function TabelaAlunos() {

  const [dados, setDados] = useState([]);
  const [novoDado, setNovoDado] = useState(0);
  const atualizarTabela = (value) => setNovoDado(current => current + value);

  useEffect(() => {
      const pegarUsuarios = async () => {
        const res = await pegarTodosUsuarios();
        setDados(res.data);
      }
      
      pegarUsuarios();
    }, [novoDado])


    const listaAlunos = dados.filter((aluno) => {
      return aluno.tipo === 'aluno';
    }).map((aluno) => {
      let alunos = {};

      alunos.id = aluno._id;
      alunos.nome = aluno.nome;
      alunos.cod = aluno.cod;
      alunos.etapa = aluno.etapa;
      alunos.turma = aluno.turmas.turmaUm;
      alunos.turmaDois = aluno.turmas.turmaDois;

      return alunos;

    })

  return <>
    <BreadcrumbsAlunos/>
    <div className="section">
      <h2 className="center">Lista de Alunos</h2>
      <div className="row m-auto">
      <div className="col s12">
          <div className="col s9">
            <AdicionarAluno atualizar={atualizarTabela} />
          </div>
          <div className="col s3">
            <EditarAluno atualizar={atualizarTabela} />
          </div>
        </div>
      </div>
      <section className="white">
        <div className="card">
          <div className="card">
            <div className="card-content">
              <TabelaDeAlunos informacoes={listaAlunos} />
            </div>
          </div>
        </div>
      </section>
    </div>
  </>;
}

export default TabelaAlunos;