import React from 'react';

export function ProjetoIndisponivel() {
  /*   const [aluno] = useState(); */

    return <>
        <div className="section">
            <h1 className="center">Bem-Vindo ao PPG-CFE</h1>
           {/*  <h5 className="center">{aluno.nome} - {aluno.matricula}</h5> */}
        </div>
        <br />
        <div className="row ">
            <div className=" col s6 offset-s3  " id="">
                <div className="card center white-text ">
                    <div className="card-content  red accent-4 ">
                        <h5 className="">
                            No momento não é possível cadastrar projetos, contate o coordenador para saber mais
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    </>;
}