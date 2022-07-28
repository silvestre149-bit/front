import React, { useState, useEffect } from 'react';
import MessageTemplate from '../../errorMessageTemplate';
import { MdAddBox as Add, MdClose as Close } from "react-icons/md";
import { adicionarTurmas, atualizarSemestre, criarSemestre, pegarSemestreAberto } from '../../../../api/semestre';
import { criarVariosAlunos } from '../../../../api/aluno';
import * as XLSX from "xlsx";
import M from 'materialize-css';

export function ModalAdicionarSemestre({atualizar}) {
    const data = new Date();
    const [semestre, setSemestre] = useState({
        titulo: "",
        dataAbertura: data.toLocaleDateString("pt-BR")
    });
    const [semestreAtivo, setSemestreAtivo] = useState([]);
    const [alunos, setAlunos] = useState([]);
    const [feedback, setFeedback] = useState({
        status: "",
        descricao: ""
    });
    var novaLista = [];

    useEffect(() => {
        const buscarSemestre = async() => {
            const res = await pegarSemestreAberto();
            setSemestreAtivo(res.data);
        };

        buscarSemestre();
    }, [atualizar]);

    useEffect(() => {
        var elemsModal = document.querySelectorAll(".modal");
        M.Modal.init(elemsModal, {
            opacity: 0.5,
            preventScrolling: true,
            dismissible: false,
        });
    }, []);

    const lerExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = (e) => {
                const bufferArray = e.target.result;
                const wb = XLSX.read(bufferArray, { type: "buffer" });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws);

                resolve(data);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });

        promise.then((d) => {
            setAlunos(d);
        });
    };

    alunos.forEach(function (e) {
        let listaDeTurmas = [];
        listaDeTurmas.push(e.turma);
        for (var i = 0; i < listaDeTurmas.length; i++)
            if (novaLista.indexOf(listaDeTurmas[i]) === -1) novaLista.push(listaDeTurmas[i]);

    });

    const listaDeAlunos = alunos.map((e) => {
        let aluno = {};
        let verificarTurma = e.turma.slice(0, 2);
        aluno.nome = e.nome;
        aluno.cod = JSON.stringify(e.cod);
        if (verificarTurma === '07') {
            aluno.turma = e.turma;
            aluno.etapa = 1
        } else {
            aluno.turmaDois = e.turma;
            aluno.etapa = 2
        }
        let alunoTurmas = {
            "turmaUm": aluno.turma,
            "turmaDois": aluno.turmaDois
        };
        aluno.turmas = alunoTurmas;
        aluno.campus = JSON.stringify(e.campus);
        aluno.unidade = JSON.stringify(e.unidade);
        aluno.componente = e.componente;
        aluno.curso = JSON.stringify(e.curso);
        aluno.tipo = e.tipo;
        return aluno;
    });

    const pegarDadosSemestre = (e, form) => {
        const { name, value } = e.target;

        setSemestre({ ...form, [name]: value });
    };

    const criarNovoSemestre = async (e) => {
        e.preventDefault();
        
        if (semestre.titulo === "" || !semestre.titulo) {
            return setFeedback({
                status: "falha",
                descricao: "Preencha o título do semestre"
            });
        } if (semestreAtivo.length != 0) {
            return setFeedback({
                status: "falha",
                descricao: "Erro, já existe um semestre aberto!"
            });
        }

        try {
            setFeedback({
                status: "sucesso",
                descricao: "Estamos processando os dados, por favor, aguarde!"
            });
            const semestreCriado = await criarSemestre(semestre);
            await atualizarSemestre(semestreCriado.data._id, { $set: { turmas: novaLista }});
            await criarVariosAlunos(listaDeAlunos);
            atualizar(1);

            return setFeedback({
                status: "sucesso",
                descricao: "Semestre criado com sucesso!"
            });
        } catch (e) {
            console.log(e);

            return setFeedback({
                status: "falha",
                descricao: "Erro ao criar o semestre, tente mais tarde!"
            });
        }
    };

return <>
        <div>
            <div className="row">
                <div className="col s12">
                    <a href="#adicionarSemestre" className="btn red accent-4 modal-trigger">
                        <Add style={{
                            verticalAlign: "middle", marginRight: "0.5em"
                        }} />adicionar semestre
                    </a>
                </div>
            </div>

            <div id="adicionarSemestre" className="modal">
                <div className="modal-content">
                    <a href="#!" className="modal-close btn-flat" style={{ float: "right" }}><Close className="grey-text" style={{ width: '100%', height: '100%' }} /></a>
                    <div className="container">
                        <h4 style={{ marginTop: '1em', fontSize: '1.8em' }}><b>Adicionar semestre</b></h4>
                        <form className="col s12" onSubmit={criarNovoSemestre}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input name="titulo" id="titulo" type="text" value={semestre.titulo} onChange={e => pegarDadosSemestre(e, semestre)} />
                                    <label for="titulo">Nome do semestre</label>
                                </div>
                            </div>
                            <div class="file-field input-field">
                                <div class="btn red accent-4">
                                    <span>Selecionar arquivo</span>
                                    <input type="file" onChange={(e) => {
                                        const file = e.target.files[0];
                                        lerExcel(file);
                                    }} />
                                </div>
                                <div class="file-path-wrapper">
                                    <input class="file-path validate" type="text" placeholder="Selecione o seu arquivo aqui" />
                                </div>
                            </div>
                            <button type="submit" id="addSemestre" className="btn red accent-4 center">Salvar alterações</button>
                            <MessageTemplate mensagem={feedback} />
                        </form>
                    </div>
                </div>
                <div className="modal-footer" style={{
                    display: "flex", justifyContent: "center", marginBottom: "1.5em"
                }}>
                </div>
            </div>
        </div>
    </>
}
