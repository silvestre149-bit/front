import { useEffect, useState } from "react";
import { MdAddBox as Add, MdClose as Close } from "react-icons/md";
import { buscarProfessores, buscarUmProfessor, buscarCod, editarProfessor } from '../../../../api/professor.js';
import MessageTemplate from "../../errorMessageTemplate/index.jsx";
import M from 'materialize-css';

const form = {
    nome: String,
    cod: String,
    email: String,
    tipo: "professor",
    permissoes: Object
};

export default function EditarProfessor({ atualizar }) {

    const [formValores, setFormValores] = useState(form);
    const [feedback, setFeedback] = useState({
        status: "",
        descricao: ""
    });
    const [professor, setProfessor] = useState("");
    const [profInfo, setInfo] = useState("");
    const [data, setData] = useState();
    const [carregado, setCarregado] = useState(false);
    const [carrega, setCarrega] = useState(null);

    useEffect(() => {
        const pegarProfessores = async () => {
            const res = await buscarProfessores()
            setData(res.data);
            setCarregado(true);
        }
        pegarProfessores();
    }, [])

    useEffect(() => {
        const pegarDadosProf = async () => {
            const res = await buscarUmProfessor(professor)
            setInfo(res.data);
        }
        pegarDadosProf();
    }, []);

    useEffect(() => {
        var elemsModalProfessor = document.querySelectorAll(".modal");
        M.Modal.init(elemsModalProfessor, {
            opacity: 0.5,
            preventScrolling: true,
            dismissible: false,
        });
    }, []);

    const isChecked = (permissao) => {
        if (permissao) return false;

        if (!permissao) return true;
    }

    const pegarValores = (e) => {
        const { name, value } = e.target;

        setFormValores({ ...formValores, [name]: value });
    }

    const pegarPermissoes = (name, value) => {

        setFormValores({
            ...formValores, permissoes: {
                ...formValores.permissoes, [name]: value
            }
        });
    }

    const pegarDadosProf = async (id) => {
        const res = await buscarUmProfessor(id)
        delete res.data.permissoes._id
        setInfo(res.data);
        setFormValores({ ...formValores, permissoes: { ...res.data.permissoes } })
        setCarrega(true)
    }

    const editarProf = async (e) => {
        e.preventDefault();

        let resultado = await buscarCod(formValores.cod);

        if (resultado.data)
            return setFeedback({
                status: "falha",
                descricao: "Erro, o DRT inserido já está sendo utilizado, tente novamente!"
            });

        try {
            await editarProfessor(professor, formValores);
            setFeedback({
                status: "sucesso",
                descricao: "Professor editado com sucesso!"
            });
            atualizar(1);

        } catch (e) {
            setFeedback({
                stauts: "falha",
                descricao: "Erro no sistema, tente mais tarde."
            })
            return console.error(e);
        }

    }

    const resetarCampos = async(e) => {
        e.preventDefault();

        setFormValores(form);
        setFeedback({
            status: "",
            descricao: ""
        });
        setProfessor("");
        setInfo("");
    };
    return <>

        <div>
            <div className="row">
                <div className="col s12">
                    <a href="#editarProfessor" className="btn red accent-4 modal-trigger">
                        <Add style={{
                            verticalAlign: "middle", marginRight: "0.5em"
                        }} />Editar Professor
                    </a>
                </div>
            </div>
            <div id="editarProfessor" className="modal">
                <div className="modal-content">
                    <a onClick={resetarCampos} href="#!" className="modal-close btn-flat">
                        <Close className="grey-text" style={{ width: '100%', height: '100%' }} />
                    </a>
                    <div className="container">
                        <h4 style={{ marginTop: '1em', fontSize: '1.8em' }}><b>Editar Professor</b></h4>
                        <select class="browser-default select-options" value={professor} onChange={e => { pegarDadosProf(e.target.value); setProfessor(e.target.value) }}>
                            <option value="" disabled selected>Selecione um professor</option>
                            {carregado ? (
                                data.filter((professor) => {
                                    return professor.tipo === "professor"
                                }).map((professor) => {
                                    return <option value={professor._id}>{professor.nome}</option>
                                })
                            ) : (
                                <p>Carregando...</p>
                            )}
                        </select>
                        <form className="col s12" onSubmit={editarProf}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="name" name="nome" type="text" onChange={pegarValores} value={formValores.nome} />
                                    <label for="name">Nome: {profInfo.nome}</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="cod" name="cod" type="number" onChange={pegarValores} value={formValores.cod} />
                                    <label for="cod">D.R.T. {profInfo.cod}</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                    <input id="email" name="email" type="email" onChange={pegarValores} value={formValores.email} />
                                    <label for="email">E-mail: {profInfo.email}</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="row">
                                    {carrega ? (
                                        <>
                                            <div role="group" onChange={_e => pegarPermissoes("coordenador", isChecked(formValores.permissoes.coordenador))}>
                                                <p>
                                                    <label>
                                                        <input name="coordenador" type="checkbox" class="filled-in" checked={formValores.permissoes.coordenador} />
                                                        <span>Professor Coordenador</span>
                                                    </label>
                                                </p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div>
                                                <label>
                                                    <input disabled="disabled" name="coordenador" type="checkbox" class="filled-in" checked={formValores.permissoes.coordenador} />
                                                    <span>Professor Coordenador</span>
                                                </label>
                                            </div>
                                        </>
                                    )}
                                    <hr className="grey-text" style={{ marginTop: '2em' }} />
                                </div>
                            </div>
                            <form>
                                <div className="row">
                                    <div className="row">
                                        {carrega ? (
                                            <>
                                                <div role="group" onChange={_e => pegarPermissoes("orientador", isChecked(formValores.permissoes.orientador))}>
                                                    <p>
                                                        <label>
                                                            <input name="orientador" type="checkbox" class="filled-in" checked={formValores.permissoes.orientador} />
                                                            <span>Professor Orientador</span>
                                                        </label>
                                                    </p>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div>
                                                    <label>
                                                        <input disabled="disabled" name="coordenador" type="checkbox" class="filled-in" checked={formValores.permissoes.coordenador} />
                                                        <span>Professor Orientador</span>
                                                    </label>
                                                </div>
                                            </>
                                        )}
                                        <hr className="grey-text" style={{ marginTop: '2em' }} />
                                    </div>
                                </div>
                            </form>
                            <form>
                                <div className="row">
                                    <div className="row">
                                        {carrega ? (
                                            <>
                                                <div role="group" onChange={_e => pegarPermissoes("avaliador", isChecked(formValores.permissoes.avaliador))}>
                                                    <p>
                                                        <label>
                                                            <input name="avaliador" type="checkbox" class="filled-in" checked={formValores.permissoes.avaliador} />
                                                            <span>Professor Avaliador</span>
                                                        </label>
                                                    </p>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div>
                                                    <label>
                                                        <input disabled="disabled" name="coordenador" type="checkbox" class="filled-in" checked={formValores.permissoes.coordenador} />
                                                        <span>Professor Avaliador</span>
                                                    </label>
                                                </div>
                                            </>
                                        )}
                                        <hr className="grey-text" style={{ marginTop: '2em' }} />
                                    </div>
                                </div>
                            </form>
                            <MessageTemplate mensagem={feedback} />
                            <div className="modal-footer" style={{
                                display: "flex", justifyContent: "center", marginBottom: "1.5em"
                            }}>
                                <button type="submit" id="addProf" className="btn red accent-4">Salvar alterações</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}

