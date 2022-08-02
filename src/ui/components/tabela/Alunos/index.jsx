import { useEffect, useState } from 'react';
import { TabelaDeAlunos } from './tabela';
import { BreadcrumbsAlunos } from '../../Breadcrumbs/AlunosBC';
import { pegarTodosUsuarios } from '../../../../api/aluno';
import EditarAluno from '../../novos-modais/AlunoModal/EditAluno';
import AdicionarAluno from '../../novos-modais/AlunoModal/AddAluno';
import { pegarSemestreAberto } from '../../../../api/semestre';
import { Carregando } from '../../Carregando';

function TabelaAlunos() {

  const [dados, setDados] = useState([]);
  const [novoDado, setNovoDado] = useState(0);
  const [semestre, setSemestre] = useState();
  const [carregando, setCarregando] = useState(true);
  const atualizarTabela = (value) => setNovoDado(current => current + value);

  useEffect(() => {
    const pegarUsuarios = async () => {
      const semestre = await pegarSemestreAberto();
      const usuarios = await pegarTodosUsuarios();
      setDados(usuarios.data);
      setSemestre(semestre.data);
      setCarregando(false);
    }

    pegarUsuarios();
  }, [novoDado])

  if(carregando) return <Carregando />;

  const listaAlunos = dados.filter((aluno) => {
    if(semestre.length > 0) return aluno.tipo === 'aluno' && aluno.semestre === semestre[0]._id;
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
    <BreadcrumbsAlunos />
    <div className="section">
      <h2 className="center">Lista de Alunos</h2>
      <div className="row m-auto">
        <div className="row">
          <div className="col s4">
            <AdicionarAluno atualizar={atualizarTabela} />
          </div>
          <div className='right-align col s8'>
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