import React, { useState, useEffect } from 'react';
import { TabelaLista } from './tabela';
import { BreadcrumbsSemestre } from '../../Breadcrumbs/SemestreBC';
import { ModalExcluirSemestre } from '../../novos-modais/SemestreModal/modalExcluir';
import { ModalAdicionarSemestre } from '../../novos-modais/SemestreModal/AdicionarSemestre';
import { pegarSemestre } from '../../../../api/semestre';
function TabelaSemestre() {

  const [semestres, setSemestres] = useState([]);
  const [dado, setNovosDados] = useState(0);
  const atualizarTabela = (value) => setNovosDados(current => current + value);

  useEffect(() => {
    const buscarSemestres = async () => {
      const res = await pegarSemestre();
      setSemestres(res.data);
    };
    
    buscarSemestres();
  }, [dado])

  return <>
    <BreadcrumbsSemestre />
    <div className="section">
      <h2 className="center">Lista de Semestres</h2>
      <div className="row">
        <div className="col s4">
          <ModalAdicionarSemestre atualizar={atualizarTabela} />
        </div>
        <div className='right-align col s8'>
          <ModalExcluirSemestre atualizar={atualizarTabela} />
        </div>
      </div>
      <section className="white">
        <div className="card">
          <div className="card">
            <div className="card-content">
              <TabelaLista avaliacoes={semestres} />
            </div>
          </div>
        </div>
      </section>
    </div>
  </>;
}

export default TabelaSemestre;