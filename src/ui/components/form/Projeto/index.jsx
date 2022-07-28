import React, { useEffect, useState } from 'react';
import { FormSelect, } from "materialize-css";

import { Send } from "@material-ui/icons";

function RowForm({ children }) {
    return <div className="row">
        <div className="input-field col s12">
            {children}
        </div>
    </div>
}

function SectionForm({ children }) {
    return <section className="container">
        <div className="section">
            <h1 className="center">Novo Projeto</h1>
        </div>
        <div className="section">
            <div className="card ">
                <div className="card-content ">
                    {children}
                </div>
            </div>
        </div>
    </section>;
}

function FormProjeto() {

    /* states */
    const [alunoTCC1] = useState(true);
    const [alunoTCC2] = useState();
    const [professorList] = useState([
        {
            "ecoordenador": true,
            "eorientador": true,
            "eavaliador": true,
            "tipo": "professor",
            "_id": "5d56de5786bdf40011326594",
            "nome": "MARIA AMELIA ELISEO",
            "codprofessor": "1118057",
            "cod": "1118057",
            "senha": "$2a$10$USDXjDAbUTJ8wCJsRABuE.12NTySnwGHheW8vyyOJTzlqjai41n.y",
            "cursos": [

            ],
            "__v": 0,
            "createdAt": "2021-08-25T12:35:26.776Z"
        },
        {
            "ecoordenador": false,
            "eorientador": true,
            "eavaliador": true,
            "tipo": "professor",
            "_id": "5d56de6a86bdf40011326595",
            "nome": "ABILIO RIBEIRO COELHO",
            "codprofessor": "1098820",
            "cod": "1098820",
            "senha": "$2a$10$tBMXLF9RRP40Ipf67yoSuerPxRnkNTdafC.5nLnf4GHAR.KZPycCe",
            "cursos": [

            ],
            "__v": 0,
            "createdAt": "2021-08-25T12:35:26.777Z"
        },
    ]);

    useEffect(() => {
        const select = document.querySelector('select');
        FormSelect.init(select);
    })

    const renderRadioTcc = (numTcc = 1, checked = false, required = true) => {
        let radioValue;

        radioValue = numTcc === 1 ? 'TCC I' : 'TCC II'

        return <label className="">
            <input
                value={radioValue}
                required={required}
                defaultChecked={checked}
                id="disciplina"
                name="disciplina"
                type="radio"
            />
            <span>{radioValue}</span>
        </label>

    }

    const renderDisciplina = () => {
        const titulo = <RowForm><h5><b>Disciplina: </b></h5><br /></RowForm>;

        if (!alunoTCC1 && !alunoTCC2) {
            throw new Error('aluno não inserido no cadastro de projeto')
        }

        /* caso seja aluno de tcc duplo */
        if (alunoTCC1 && alunoTCC2) {
            return <>
                {titulo}
                {renderRadioTcc(1, false, true)}
                {renderRadioTcc(2, false, true)}
            </>
        } else if (alunoTCC1) {
            return <>
                {titulo}
                {renderRadioTcc(1, true, true)}
            </>
        } else {
            /* caso seja aluno de TCC 2 */
            return <>

                {titulo}
                {renderRadioTcc(2, true, true)}
            </>
        }


    }

    const renderProfessores = () => {
        return <RowForm>
            <h5><b> Professor Orientador </b></h5>
            <div className="section">
                <select name="orientador" id="orientador" required>
                    {!professorList && <option value="0" disabled>Nenhum professor localizado</option>}
                    {professorList && <option value="-1" defaultChecked>Selecione seu professor</option>}
                    {professorList &&
                        professorList.map((professor) => {
                            return <option key={professor._id} value={professor._id}>{professor.nome}</option>
                        })
                    }
                </select>
            </div>

        </RowForm>
    }

    const renderAvisoCadastro = () => {
        return <RowForm>
            <div className="card yellow lighten-3 center-align">
                <div className="card-content">
                    <span className="card-title">
                        <h3>Atenção</h3>
                    </span>
                    <h5>Após submeter o projeto você: </h5>
                    <h5> - Enviará um convite para o orientador</h5>
                    <h5> - Poderá incluir outros alunos na sua equipe, até que seu orientador aceite
                        o convite</h5>
                </div>
            </div>
        </RowForm>
    }

    const renderForm = () => {
        return <form id="addprojeto">
            <div className="section">

                <div className="row">
                    <div className="col s12">
                        <h5><b>Dados do Projeto </b> </h5>
                    </div>
                </div>

                <RowForm>
                    <input
                        name="titulo"
                        id="titulo"
                        type="text"
                        className="validate"
                        required />
                    <label htmlFor="titulo">Título: </label>
                </RowForm>

                <RowForm>
                    <textarea
                        name="descricao"
                        id="descricao"
                        className="materialize-textarea"
                        data-length="500"
                        required>
                    </textarea>
                    <label htmlFor="descricao">Descrição:</label>
                </RowForm>

                {renderDisciplina()}
                {renderProfessores()}
                {renderAvisoCadastro()}

                <RowForm>
                    <button className="btn red center"
                        type="submit"
                        name="action"
                        id="btnAddProjeto"
                    >
                        <a href="/"
                            style={{ color: "white" }}
                        >
                            Submeter projeto  <i className="right"><Send /></i>
                        </a>
                    </button>
                </RowForm>


            </div>
        </form >
    }


    return <SectionForm>
        {renderForm()}
    </SectionForm>
}

export default FormProjeto;