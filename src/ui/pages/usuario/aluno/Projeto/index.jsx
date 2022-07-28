import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../../context/Auth';
import MeuProjeto from '../MeuProjeto';
import CadastrarTCC from '../CadastrarTCC/index.jsx';
import { useEffect } from 'react';
import { pegarUsuario } from '../../../../../api/aluno';
import { Carregando } from '../../../../components/Carregando';
import { useState } from 'react';

export default function Projeto() {
  const { usuario } = useContext(AuthContext);
  const [dadosUsuario, setDados] = useState();
  const [atualizar, setAtualizar] = useState(false);

  const atualizarDados = () => setAtualizar(true);

  useEffect(() => {
    const atualizarUsuario = async () => {
      const res = await pegarUsuario(usuario._id);
      setDados(res.data);
      setAtualizar(false);
    }

    atualizarUsuario();
  }, [atualizar])
  
  if(!dadosUsuario) return <Carregando />
  return <>
    {dadosUsuario.participacoes.length > 0 ? (
      <MeuProjeto atualizar={atualizarDados} />
    ) : (
      <CadastrarTCC atualizar={atualizarDados} />
    )}
  </>
}