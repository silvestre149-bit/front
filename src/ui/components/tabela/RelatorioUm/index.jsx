import React from 'react';
import { TabelaRelatorioUm } from './tabela';
import { DADOS } from './colunas';

// import { Container } from './styles';

function RelatorioUm() {
  return <>
    <div className="section">
      <section className="white">
        <div className="card">
            <div className="card">
                <div className="card-content">
                  <h3 className="center">Relatório #01</h3>
                  <p className='center'>Alunos que cadastraram projetos (TCC I e TCC II)</p>
                  <TabelaRelatorioUm avaliacoes={DADOS} />
                </div>
            </div>
        </div>
      </section>
    </div>
  </>;
}

export default RelatorioUm;