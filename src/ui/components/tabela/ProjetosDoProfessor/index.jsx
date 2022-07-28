import React from 'react';
import { TabelaDoProf } from './tabela';
import { DADOS } from './colunas';
import { COLUNAS_AVALIACAO } from './colunas';
// import { Container } from './styles';

function TabelaProjetoProf() {
  return <>
        <section className="white">
        <div className="card">
            <div className="card">
                <div className="card-content">
                  <TabelaDoProf avaliacoes={DADOS} />
                </div>
            </div>
        </div>
        </section>
  </>;
}

export default TabelaProjetoProf;