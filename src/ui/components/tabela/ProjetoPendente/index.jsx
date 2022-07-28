import React, { useState, useEffect } from 'react';
import { BreadcrumbsControle } from '../../Breadcrumbs/ControleBC';
import axios from 'axios';

function TabelaProjetoPendente() {
  // const [notificacoes, setNotificacoes] = useState([]);
  // const id = "";

  // useEffect(() => {
  //   axios.get('http://localhost:3031/notificacoes/' + id)
  //     .then(res => setNotificacoes(res.data))
  //     .then(console.log(200))
  // })


  return <>
    <BreadcrumbsControle/>
    <div className="section">
      <h2 className="center">Convites para orientação de projetos</h2>
      <section className="white">
        <div className="card">
          <div className="card">
            <div className="card-content">
            </div>
          </div>
        </div>
      </section>
    </div>
  </>;
}

export default TabelaProjetoPendente;