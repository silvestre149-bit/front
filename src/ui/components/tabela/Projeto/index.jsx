import React, { useEffect, useState } from 'react';
import { TabelaComProjetos } from './tabela';
import { buscarProjetos } from '../../../../api/projeto';

function TabelaProjeto() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    const buscarDados = async () => {
      const res = await buscarProjetos();
      setDados(res.data);
    }

    buscarDados();
  }, [])
  
  return <>
        <section className="white">
        <div className="card">
            <div className="card">
                <div className="card-content">
                  <TabelaComProjetos projetos={dados} />
                </div>
            </div>
        </div>
        </section>
  </>;
}

export default TabelaProjeto;