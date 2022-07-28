import React, { useState } from 'react';
import { ProjetoIndisponivel } from '../Indisponivel';

export function ProjetoNovo() {
    const [cadproj] = useState(true);
    const [aluno] = useState({
        "tipo": "aluno",
        "_id": "6026bf7d8c893a001818eaa7",
        "cod": "41557913",
        "codaluno": "41557913",
        "nome": "AGATA RAIZA SANTOS LIMA",
        "participacao": [
          {
            "turma": [
              "07G11"
            ],
            "codcomp": [
    
            ],
            "etapa": 0,
            "_id": "6026bf7d8c893a001818eaa8",
            "ambostcc": false,
            "semestre": "6025b673a815ff04e530c7ff"
          }
        ],
        "codcurso": "51144",
        "escola": "051",
        "unidade": "011",
        "senha": "$2a$10$DCnk3ptZp1aQPTMoJ237J.QK1F/R.GaWrE7Dwsz.RXKKYXbZS/UqW",
        "createdAt": "2021-02-12T17:48:45.029Z",
        "__v": 0
      }
      );

    const tccDuplo = () => {
        return <>
            <div className="section">
                <h1 className="center">Bem-Vindo ao PPG-CFE</h1>
                <h5 className="center">{aluno.nome} - {aluno.matricula}</h5>
            </div>
            <br />
            <div className="row ">
                <div className=" col s10 offset-s1  " id="">
                    <div className="card center white-text ">
                        <div className="card-content  red accent-4 ">
                            <p className="flow-text">Novo Por Aqui?</p>

                            <h5 className="">
                                Verificamos que você está cadastrado em Tcc I e Tcc II
                            </h5>
                            <p className="center"><b> Aqui vai algumas informações sobre seu caso: </b></p>


                            <p>Você deve estar cadastrado em dois projetos de Tcc (Tcc I e Tcc II)</p>
                            <p>Você pode cadastrar os dois projetos ou pedir a um aluno que coloque você como integrante do
                                projeto</p>
                            <p>Fique atento para que não tenhamos problemas no futuro</p>

                        </div>
                        <div className="card-action  grey darken-1 ">
                            <a href="/aluno/projeto" className="white-text"><b>Clique aqui</b></a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    }

    const tccUnico = () => {
        return <>
            <div className="section">
                <h1 className="center">Bem-Vindo ao PPG-CFE</h1>
                <h5 className="center">{aluno.nome} - {aluno.codaluno}</h5>
            </div>
            <br />
            <div className="row ">
                <div className=" col s6 offset-s3  " id="">
                    <div className="card center white-text ">
                        <div className="card-content  red accent-4 ">
                            <p className="flow-text">Novo Por Aqui?</p>

                            <p className="">
                                Cadastre agora o seu projeto de TCC
                            </p>
                        </div>
                        <div className="card-action  grey darken-1 ">
                            <a href="/aluno/projeto" className="white-text"><b>Clique aqui</b></a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    }

    const apresentarTcc = () => {
        if (cadproj) {
            if (aluno.ambostcc) {
                return tccDuplo();
            } else {
                return tccUnico();
            }
        } else {
            return <ProjetoIndisponivel />
        }
    }

    return <section className="container">
        {apresentarTcc()}
    </section>
}
