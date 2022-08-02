import React, { useEffect, useState, useContext } from 'react';
import './styles.css'
import loginLogo from '../../assets/img/loginLogo.png'
import { FormLogin } from '../../components/form/Login';
import { Mensagem } from '../../components/Mensagem/index.jsx';
import { pegarSemestre, pegarSemestreAberto } from '../../../api/semestre';

/* estilos e icones */
import './styles.css'
import { MdCheck as Check } from "react-icons/md";

/* api */
import {
    logarUsuario
} from '../../../api/auth.js';
/* contexto */
import { AuthContext } from '../../context/Auth/index.jsx';

/* tipos */
import { COOKIE_TYPES, ERRO_TYPES, LOGIN_TYPES } from '../../../utils/types';
import { criarCookie, limparCookies } from '../../../utils/cookie';
import { Carregando } from '../../components/Carregando';

export function Login() {
    const [semestre, setSemestre] = useState();

    useEffect(() => {
        const verificarSemestre = async () => {
            const res = await pegarSemestreAberto();
            setSemestre(res.data);
        }

        verificarSemestre();
    }, []);
   

    /* context */
    const contexto = useContext(AuthContext);

    /* states */
    const [erro, setErro] = useState(() => {
        if (contexto.mensagemErro) return contexto.mensagemErro
    });

    const [usuario, setUsuario] = useState();
    const [senha, setSenha] = useState();

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const login = await logarUsuario({ usuario, senha });

            if (login.erro && login.erro.isAxiosError) {
                if (!login.erro.response) {
                    /* caso o back-end caiu */
                    return setErro(ERRO_TYPES.GENERICO.msg);
                } else if (login.erro.response.status === 401) {
                    return setErro(ERRO_TYPES.USUARIO_SENHA_INVALIDO.msg);
                } else if (login.erro.response.status === 400) {
                    return setErro(ERRO_TYPES.JWT_NAO_AUTENTICADO.msg);
                } else {
                    return setErro(ERRO_TYPES.GENERICO.msg);
                }
            }


            const token = login.data.access_token;

            criarCookie(COOKIE_TYPES.USUARIO, token);

            contexto.dispatch({ type: LOGIN_TYPES.OK, dados: { token } })

            localStorage.setItem('token', token);
        } catch (e) {
            return console.log(e);
        }
    }

    const mensagemErro = () => {
        return <article id="login-erro">
            <h4 style={{ color: 'red' }}>{erro}</h4>
        </article>
    }

    if(!semestre) return <Carregando />
    return <>
        <section id="section-login" className="card hoverable">
            <section id="section-login-conteudo" className="card-content">
                <article id="article-login-img" >
                    <img src={loginLogo} alt="Simbolo do Mackenzie" />
                    <br />
                </article>
                <div className="section">
                    <form>
                        <div className="row">
                            <div className="input-field col s12">
                                {/*Input TIA/DRT*/}
                                <input
                                    onChange={(event) => setUsuario(event.target.value)}
                                    type="number"
                                    name="usuario"
                                    id="tia"
                                    className="validate"
                                    required
                                />
                                <label htmlFor="tia" className="black-text">TIA/DRT</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                {/*Input password*/}
                                <input
                                    onChange={(event) => setSenha(event.target.value)}
                                    type="password"
                                    name="senha"
                                    id="password"
                                    className="validate"
                                    required
                                />
                                <label htmlFor="password" className="black-text">Password</label>
                            </div>
                        </div>

                        {erro && mensagemErro()}


                        <div className="row">
                            <div className="input-field col s12">
                                <div className="col s12 center">
                                    {/*Botão entrar*/}
                                    <button onClick={onSubmit} className=" btn-large center red accent-4">
                                        <i className="left">
                                            <Check />
                                        </i>
                                        Entrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </section>

    </>;
}