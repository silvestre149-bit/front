import React from 'react';
import { TabelaRelatorioDois } from './tabela';
import { DADOS } from './colunas';

// import { Container } from './styles';

function RelatorioDois() {
  return <>
    <div className="section">
      <section className="white">
        <div className="card">
            <div className="card">
                <div className="card-content">
                  <h3 className="center">Relatório #02</h3>
                  <p className='center'>Alunos que cadastraram projetos em TCC II</p>
                  <TabelaRelatorioDois avaliacoes={DADOS} />
                </div>
            </div>
        </div>
      </section>
    </div>
  </>;
}

export default RelatorioDois;