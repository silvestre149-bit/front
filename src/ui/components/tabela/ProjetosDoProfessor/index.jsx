import React, { useContext } from 'react';
import { TabelaDoProf } from './tabela';
import { useEffect } from 'react';
import { buscarProjetoDoProfessor } from '../../../../api/projeto';
import { AuthContext } from '../../../context/Auth';
import { pegarSemestreAberto } from '../../../../api/semestre';
// import { Container } from './styles';

function TabelaProjetoProf() {
  const [dados, setDados] = React.useState([]);
  const [semestre, setSemestre] = React.useState([]);
  
  const { usuario } = useContext(AuthContext);
  useEffect(() => {
    const buscarDados = async () => {
      const projetos = await buscarProjetoDoProfessor(usuario._id);
      const semestre = await pegarSemestreAberto();
      setDados(projetos.data);
      setSemestre(semestre.data);
    };

    buscarDados();
  }, []);

  const projetos = dados.filter((projeto) => {
    if(semestre.length > 0) return projeto.semestre = semestre[0]._id;
  })

  return <>
        <section className="white">
        <div className="card">
            <div className="card">
                <div className="card-content">
                  <TabelaDoProf avaliacoes={projetos} />
                </div>
            </div>
        </div>
        </section>
  </>;
}

export default TabelaProjetoProf;