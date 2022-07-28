import React, { useEffect, useState } from 'react';
import { pegarSemestreAberto } from '../../../../../api/semestre';
import VerTCC from '../../../../components/verTCC/index.jsx';
import { Carregando } from '../../../../components/Carregando/index.jsx';
import { useContext } from 'react';
import { AuthContext } from '../../../../context/Auth/index.jsx';
import FazerCadastroTCC from '../../../../components/CadastrarTCC';
import { pegarUsuario } from '../../../../../api/aluno.js';

export function HomeAluno() {
    const { usuario } = useContext(AuthContext);
    const [semestre, setSemestre] = useState();
    const [carregando, setCarregando] = useState(true);
    const [dadosUsuario, setDados] = useState();

    useEffect(() => {
        const buscarSemestre = async () => {
            const res = await pegarSemestreAberto();
            const resUsuario = await pegarUsuario(usuario._id);
            setDados(resUsuario.data);
            setSemestre(res.data);
            setCarregando(false)
        };

        buscarSemestre();
    }, [])

    if(carregando) return <Carregando />;
    
    return <>
        <div>
            {semestre[0].permissoes.cadastraProjeto ? (
                <div>
                    <h1 className="center">Bem-Vindo ao Oriente!</h1>
                    <p className="center">{usuario.nome} - {usuario.cod}</p>
                    {dadosUsuario.participacoes.length > 0 ? (
                        <VerTCC />
                    ) : (
                        <FazerCadastroTCC />
                    )}
                </div>
            ) : (
                <div class="col s12 m7">
                    {dadosUsuario.participacoes.length > 0 ? (
                        <div style={{ margin: "50px" }}>
                            <VerTCC />
                        </div>
                    ) : (
                        <div>
                            <div className="red accent-4 center">
                                <div style={{ padding: "50px", margin: "50px" }}>
                                    <h2 class="header white-text">Não é mais possível fazer cadastro de novos projetos.</h2>
                                    <p className="white-text">Você não possui nenhum projeto cadastrado.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    </>
}