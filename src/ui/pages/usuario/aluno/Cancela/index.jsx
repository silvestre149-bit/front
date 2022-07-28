import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdFormatListBulleted, MdPersonOutline, MdTimer } from 'react-icons/md';
import jwt from 'jwt-decode'
import { tokenId } from '../../../../../utils/usuario.id.js';
import { ModalExcluirProjeto } from '../../../../components/novos-modais/AlunoModal/DelProjeto';

export function CancelaAluno() {
    const [lista, setLista] = useState([]);
    const [listaProj, setListaProj] = useState([]);
    const [projeto, setProjeto] = useState([]);
    const idUsu = jwt(tokenId);

    useEffect(() => {
      axios.get('http://localhost:3031/usuario/' + idUsu._id)
      .then(res => {
          console.log(res);
          setLista(res.data);
      })
      .catch(error => console.log(error))
    }, [])

    return <>
    <h1 className="center">Protocolo de cancelamento do projeto</h1>
    <div className="section">
      <section className="white">
        <div className="card">
          <div className="card">
            <div className="card-content">
            <h2 className="center" >Explique-nos o porquê</h2>
            <strong><h6>Observação</h6></strong>
            <p>O projeto só poderá ser cancelado caso não tenha sido aceito pelo orientador.</p>
            <form>
                <label style={{padding: "4px"}}>Justificativa</label>
                <input id="justificativa" type="text"/>
                <div className="center">
                    <ModalExcluirProjeto />
                </div>
            </form>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
}