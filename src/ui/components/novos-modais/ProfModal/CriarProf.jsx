import { useState, useEffect } from "react";
import { cadastrarProfessor, buscarCod, buscarUmProfessor } from "../../../../api/professor.js";
import { MdAddBox as Add, MdClose as Close } from "react-icons/md";
import MessageTemplate from "../../errorMessageTemplate/index.jsx";
import M from 'materialize-css';


const form = {
    nome: String,
    cod: String,
    email: String,
    tipo: "professor",
    permissoes: Object
};

export default function CriarProfessor({atualizar}) {
    const [formValores, setFormValores] = useState(form);
    const [professor, setProfessor] = useState();
    const [feedback, setFeedback] = useState({
        status: "",
        descricao: ""
    });

    useEffect(() => {
        const pegarDadosProf = async () => {
            const res = await buscarUmProfessor(professor);
            setProfessor(res.data);
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

    const isChecked = (permissao) => {
        if (permissao) return false;
        return true;
    }

    const adicionarProfessor = async (e) => {
        e.preventDefault();
        const res = await buscarCod(formValores.cod);

        if (res.data) {
            return setFeedback({
                status: "falha",
                descricao: "Erro, o código informado já existe!"
            });
        }

        try {
            await cadastrarProfessor(formValores);
            setFeedback({
                status: "sucesso",
                descricao: "Professor cadastrado com sucesso!"
            });
            atualizar(1);
        } catch (e) {
            setFeedback({
                stauts: "falha",
                descricao: "Erro no sistema, tente mais tarde."
            });
            
            return console.log(e);

        }
    }

    const resetarCampos = async(e) => {
        e.preventDefault();

        setFormValores(form);
        setFeedback({
            status: "",
            descricao: ""
        });
    };

    return <>
        <div>
            <div className="row">
                <div className="col s12">
                    <a href="#adicionarProfessor" className="btn red accent-4 modal-trigger">
                        <Add style={{
                            verticalAlign: "middle", marginRight: "0.5em"
                        }} />adicionar professor
                    </a>
                </div>
            </div>
            <div id="adicionarProfessor" className="modal">
                <div className="modal-content">
                    <a onClick={resetarCampos} href="#!" className="modal-close btn-flat">
                        <Close className="grey-text" style={{ width: '100%', height: '100%' }} />
                    </a>
                    <div className="container">
                        <h4 style={{ marginTop: '1em', fontSize: '1.8em' }}><b>Cadastrar Professor</b></h4>
                        <form className="col s12" onSubmit={adicionarProfessor}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="name" name="nome" type="text" value={formValores.nome} onChange={pegarValores} />
                                    <label for="name">Nome</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="cod" name="cod" type="number" onChange={pegarValores} value={formValores.cod} />
                                    <label for="cod">D.R.T.</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                    <input id="email" name="email" type="email" class="validate" onChange={pegarValores} value={formValores.email} />
                                    <label for="email">E-mail</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="row">
                                    <><div role="group" onChange={e => pegarPermissoes("coordenador", isChecked(formValores.permissoes.coordenador))}><p>
                                        <label>
                                            <input name="group" type="checkbox" class="filled-in" checked={formValores.permissoes.coordenador} />
                                            <span>Professor Coordenador</span>
                                        </label>
                                    </p>
                                    </div>
                                    </>
                                    <hr className="grey-text" style={{ marginTop: '2em' }} />
                                </div>
                            </div>
                            <form>
                                <div className="row">
                                    <div className="row">
                                        <><div role="group" onChange={e => pegarPermissoes("orientador", isChecked(formValores.permissoes.orientador))}><p>
                                            <label>
                                                <input name="group" type="checkbox" class="filled-in" checked={formValores.permissoes.orientador} />
                                                <span>Professor orientador</span>
                                            </label>
                                        </p>
                                        </div>
                                        </>
                                        <hr className="grey-text" style={{ marginTop: '2em' }} />
                                    </div>
                                </div>
                            </form>
                            <form>
                                <div className="row">
                                    <div className="row">
                                        <><div role="group" onChange={e => pegarPermissoes("avaliador", isChecked(formValores.permissoes.avaliador))}><p>
                                            <label>
                                                <input name="group" type="checkbox" class="filled-in" checked={formValores.permissoes.avaliador} />
                                                <span>Professor avaliador</span>
                                            </label>
                                        </p></div></>
                                        <hr className="grey-text" style={{ marginTop: '2em' }} />
                                    </div>
                                </div>
                            </form>
                            <MessageTemplate mensagem={feedback} />
                            <div className="modal-footer" style={{
                                display: "flex", justifyContent: "center", marginBottom: "1.5em"
                            }}>
                                <button type="submit" id="addProf" className="btn red accent-4">adicionar professor</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>;
}
