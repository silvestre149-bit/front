import React, { useState } from 'react';
import { ProjetoDetalhes } from '../Detalhes';

export function ProjetoCadastrado() {

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
  },
  );
  const [projeto] = useState({
    "avaliacaoposter": {
      "titulo": "20/04/2021 - 07:00 às 23:00",
      "localdeapresentacao": "YouTube",
      "data": "20/04/2021",
      "hora": "07:00 às 23:00",
      "sessaoid": "6079075830a5e5001c724341"
    },
    "situacao": "aprovado",
    "_id": "6033bcc4aee2c90018e9f2cf",
    "titulo": "O USO DE SOFTWARE DE CÓDIGO ABERTO NA CONSTRUÇÃO DE SOFTWARE PROPRIETÁRIO",
    "descricao": "No universo corporativo as buscas por modelos de negócios mais rentáveis às empresas são constantes, os softwares de código aberto se mostram como uma boa solução em relação a custo e eficiência, no entanto, esse retorno pode não ser o como o esperado se não for corretamente implementado, este projeto tem como objetivo entender como as empresas podem utilizar softwares de código aberto de forma estratégica na criação de softwares proprietários, analisando questões ligadas a manutenção, gerenciamento e tipos de licenças, vantagens e desvantagens desse modelo de negócio em diferentes tipos de empresa e os riscos que essa utilização pode oferecer através de pesquisas aprofundadas em modelos de negócios utilizados por medias e grandes empresas e artigos relacionados a este assunto.",
    "disciplina": "TCC II",
    "alunos": [
      {
        "turma": [
          "08R11"
        ],
        "_id": "6033bcc4aee2c90018e9f2d0",
        "nome": "LEONARDO GOMES PORTELLA",
        "codMatricula": "41504968"
      }
    ],
    "professor": [
      {
        "_id": "607f5bfda98dff001827927e",
        "nome": "CHARLES BOULHOSA RODAMILANS",
        "id": "5f60ecad8c9c9d0018d4c247",
        "status": "Recusado",
        "categoria": "Avaliador"
      },
      {
        "_id": "607f5bfda98dff001827927d",
        "nome": "TOMAZ MIKIO SASAKI",
        "id": "5d56e5bb86bdf400113265cb",
        "status": "Aceito",
        "categoria": "Avaliador"
      },
      {
        "_id": "607f5bfda98dff001827927c",
        "nome": "MARIO OLIMPIO DE MENEZES",
        "id": "5d56e2e786bdf400113265b1",
        "status": "Aceito",
        "categoria": "Avaliador Suplente"
      }
    ],
    "semestre": "6025b673a815ff04e530c7ff",
    "comentarios": [

    ],
    "notaposter": [

    ],
    "createdAt": "2021-02-22T14:16:36.816Z",
    "__v": 0
  },
  );

  return <>
    <section className="container">
    
      <div className="section">
        <h1 className="center">Meu Projeto </h1>
        <p className="center">{aluno.nome} - {aluno.cod}</p>
      </div>

      {!projeto.unicoAluno &&
        <button
          className="btn red accent-4 center modal-trigger"
          href="#sairProjeto"
          name="action">Sair do Projeto
        </button>
      }

      {!projeto.notaposter &&
        <button className="btn red accent-4 center modal-trigger" href="#gerarNota" name="action">Gerar nota do pôster</button>
      }

      {/* section de erros */}
      <div className="row" hidden>
        <div className="card-panel red darken-1">
          <p className="white-text text-darken-2" id="erroAluno"></p>
        </div>
      </div>

      <ProjetoDetalhes />
    
    </section>


  </>;
}

