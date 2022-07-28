import React from 'react';
import { TabelaDePosteres, TabelaNotificacoes } from './tabela';
import { DADOS } from './colunas';
// import { Container } from './styles';

function TabelaPosteres() {
  return <>
    <section className="container">
      <div className="section">
        <TabelaDePosteres posteres={DADOS} />
      </div>
    </section>
  </>;
}

export default TabelaPosteres;