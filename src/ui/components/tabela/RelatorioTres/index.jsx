import React, { useState, useEffect } from 'react';
import { TabelaRelatorioTres } from './tabela';
import { DADOS } from './colunas';
import axios from 'axios';

// import { Container } from './styles';

function RelatorioTres() {
  const [alunos, setAlunos] = useState([]);
  useEffect(() =>{
    axios.get('http://localhost:3031/usuario')
      .then(res => setAlunos(res.data))
      .then(console.log('Deu certo'))
  }, [])

  const listaAlunos = alunos.filter((aluno) => {
    const particiLista = JSON.stringify(aluno.participacoes);
    return aluno.tipo === 'aluno' && particiLista === '[]'
  }).map((aluno) => {
    const alunos = {};
    alunos.nome = aluno.nome;
    alunos.cod = aluno.cod;
    alunos.turma1 = aluno.turma1;
    alunos.turma2 = aluno.turma2;
    return alunos;
  })

  return <>
    <div className="section">
      <section className="white">
        <div className="card">
            <div className="card">
                <div className="card-content">
                  <h3 className="center">Relatório #03</h3>
                  <p className='center'>Alunos que não cadastraram projeto</p>
                  <TabelaRelatorioTres avaliacoes={listaAlunos} />
                </div>
            </div>
        </div>
      </section>
    </div>
  </>;
}

export default RelatorioTres;