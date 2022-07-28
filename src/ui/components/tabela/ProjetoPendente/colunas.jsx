function ColunaAlunos(props){
    return <>
    {props.alunos.map((aluno,index)=> <div key={index}>{aluno.nome} <br /> <br /> </div>)}
    </>
}

/**@type {import('react-table').Column[]} */
export const COLUNAS_AVALIACAO = [
    {
        Header: 'Nome do projeto',
        accessor: 'titulo',
    },
    {
        Header: 'Alunos',
        Cell: props => <ColunaAlunos alunos={props.row.original.alunos}/>
    },
]

export const DADOS = [
    {
        titulo: "Projeto 1",
        descricao: "Descrição do projeto 1",
        linhaDePesquisa: "Linha de pesquisa do projeto 1",
        disciplina: "Disciplina do projeto 1",
        alunos: [
            {
                nome: "Aluno 1A",
                id: "Id do aluno 1A",
                codMatricula: "TIA do aluno 1A",
                turma: ["8A11,7A11"],
                status: "ativo",// "ativo" || "pendente"
            },
            {
                nome: "Aluno 1B",
                id: "Id do aluno 1B",
                codMatricula: "TIA do aluno 1B",
                turma: ["8A11,7A11"],
                status: "ativo",// "ativo" || "pendente"
            },
            {
                nome: "Aluno 1C",
                id: "Id do aluno 1C",
                codMatricula: "TIA do aluno 1C",
                turma: ["8A11,7A11"],
                status: "ativo",// "ativo" || "pendente"
            }
        ],
        professor: "Professor 1",
        idProfessor: "Id do professor 1",
        statusProfessor: "pendente",// "aceito" || "pendente" || "recusado"
        categoriaProfessor: "Orientador",// Orientador || Coorientador || Avaliador

        comentarios: [
            {
                msg: "Achei muito interessante, parabéns!",
            },
            {
                msg: "Gostaria que tivessem se aprofundado mais no tema X, mas no geral ficou ótimo!",
            },
        ],

        notageral: {
            nota: "9.9",
        },

        avaliacaoposter: {
            titulo: "Pôster 1",
            localdeapresentacao: "Universidade Presbiteriana Mackenzie",
            data: "14/08/2021",
            hora: "16:00",
            sessaoid: "ID da sessão 1",
        },

        avaliacaobanca: {
            titulo: "Banca 1",
            sala: "1A",
            data: "14/08/2021",
            hora: "17:00",
            bancaid: "ID da banca 1",
        },

        semestre: "2º Semestre - 2021",

        notaposter: [{
            tipoavaliador: "Avaliador",
            a1: "Avaliador 1",
            a2: "Avaliador 2",
            a3: "Avaliador 3",
            // Respostas da avaliação sobre: Conteúdo
            c4: "Bom",
            c5: "Bom",
            c6: "Regular",
            c7: "Bom",
            c8: "Regular",
            // Respostas da avaliação sobre: Disign
            d9: "Bom",
            d10: "Regular",
        }],

        situacao: "ativo", // ativo || aprovado || cancelado || reprovado

        createdAt: "06/2021",
    },
    {
        titulo: "Projeto 2",
        descricao: "Descrição do projeto 2",
        linhaDePesquisa: "Linha de pesquisa do projeto 2",
        disciplina: "Disciplina do projeto 2",
        alunos: [
            {
                nome: "Aluno 2A",
                id: "Id do aluno 2A",
                codMatricula: "TIA do aluno 2A",
                turma: ["8A11,7A11"],
                status: "ativo",// "ativo" || "pendente"
            },
            {
                nome: "Aluno 2B",
                id: "Id do aluno 2B",
                codMatricula: "TIA do aluno 2B",
                turma: ["8A11,7A11"],
                status: "ativo",// "ativo" || "pendente"
            },
            {
                nome: "Aluno 2C",
                id: "Id do aluno 2C",
                codMatricula: "TIA do aluno 2C",
                turma: ["8A11,7A11"],
                status: "ativo",// "ativo" || "pendente"
            }
        ],
        professor: "Professor 1",
        idProfessor: "Id do professor 1",
        statusProfessor: "pendente",// "aceito" || "pendente" || "recusado"
        categoriaProfessor: "Orientador",// Orientador || Coorientador || Avaliador

        comentarios: [
            {
                msg: "Achei muito interessante, parabéns!",
            },
            {
                msg: "Gostaria que tivessem se aprofundado mais no tema X, mas no geral ficou ótimo!",
            },
        ],

        notageral: {
            nota: "9.9",
        },

        avaliacaoposter: {
            titulo: "Pôster 2",
            localdeapresentacao: "Universidade Presbiteriana Mackenzie",
            data: "14/08/2021",
            hora: "16:00",
            sessaoid: "ID da sessão 2",
        },

        avaliacaobanca: {
            titulo: "Banca 2",
            sala: "2A",
            data: "14/08/2021",
            hora: "17:00",
            bancaid: "ID da banca 2",
        },

        semestre: "2º Semestre - 2021",

        notaposter: [{
            tipoavaliador: "Avaliador",
            a1: "Avaliador 1",
            a2: "Avaliador 2",
            a3: "Avaliador 3",
            // Respostas da avaliação sobre: Conteúdo
            c4: "Bom",
            c5: "Bom",
            c6: "Regular",
            c7: "Bom",
            c8: "Regular",
            // Respostas da avaliação sobre: Disign
            d9: "Bom",
            d10: "Regular",
        }],

        situacao: "ativo", // ativo || aprovado || cancelado || reprovado

        createdAt: "06/2021",
    },
    {
        titulo: "Projeto 3",
        descricao: "Descrição do projeto 3",
        linhaDePesquisa: "Linha de pesquisa do projeto 3",
        disciplina: "Disciplina do projeto 3",
        alunos: [
            {
                nome: "Aluno 3A",
                id: "Id do aluno 3A",
                codMatricula: "TIA do aluno 3A",
                turma: ["8A11,7A11"],
                status: "ativo",// "ativo" || "pendente"
            },
            {
                nome: "Aluno 3B",
                id: "Id do aluno 3B",
                codMatricula: "TIA do aluno 3B",
                turma: ["8A11,7A11"],
                status: "ativo",// "ativo" || "pendente"
            },
            {
                nome: "Aluno 3C",
                id: "Id do aluno 3C",
                codMatricula: "TIA do aluno 3C",
                turma: ["8A11,7A11"],
                status: "ativo",// "ativo" || "pendente"
            }
        ],
        professor: "Professor 1",
        idProfessor: "Id do professor 1",
        statusProfessor: "pendente",// "aceito" || "pendente" || "recusado"
        categoriaProfessor: "Orientador",// Orientador || Coorientador || Avaliador

        comentarios: [
            {
                msg: "Achei muito interessante, parabéns!",
            },
            {
                msg: "Gostaria que tivessem se aprofundado mais no tema X, mas no geral ficou ótimo!",
            },
        ],

        notageral: {
            nota: "9.9",
        },

        avaliacaoposter: {
            titulo: "Pôster 3",
            localdeapresentacao: "Universidade Presbiteriana Mackenzie",
            data: "14/08/2021",
            hora: "16:00",
            sessaoid: "ID da sessão 3",
        },

        avaliacaobanca: {
            titulo: "Banca 3",
            sala: "3A",
            data: "14/08/2021",
            hora: "17:00",
            bancaid: "ID da banca 3",
        },

        semestre: "2º Semestre - 2021",

        notaposter: [{
            tipoavaliador: "Avaliador",
            a1: "Avaliador 1",
            a2: "Avaliador 2",
            a3: "Avaliador 3",
            // Respostas da avaliação sobre: Conteúdo
            c4: "Bom",
            c5: "Bom",
            c6: "Regular",
            c7: "Bom",
            c8: "Regular",
            // Respostas da avaliação sobre: Disign
            d9: "Bom",
            d10: "Regular",
        }],

        situacao: "ativo", // ativo || aprovado || cancelado || reprovado

        createdAt: "06/2021",
    },
    {
        titulo: "Projeto 4",
        descricao: "Descrição do projeto 4",
        linhaDePesquisa: "Linha de pesquisa do projeto 4",
        disciplina: "Disciplina do projeto 4",
        alunos: [
            {
                nome: "Aluno 4A",
                id: "Id do aluno 4A",
                codMatricula: "TIA do aluno 4A",
                turma: ["8A11,7A11"],
                status: "ativo",// "ativo" || "pendente"
            },
            {
                nome: "Aluno 4B",
                id: "Id do aluno 4B",
                codMatricula: "TIA do aluno 4B",
                turma: ["8A11,7A11"],
                status: "ativo",// "ativo" || "pendente"
            },
            {
                nome: "Aluno 4C",
                id: "Id do aluno 4C",
                codMatricula: "TIA do aluno 4C",
                turma: ["8A11,7A11"],
                status: "ativo",// "ativo" || "pendente"
            }
        ],
        professor: "Professor 1",
        idProfessor: "Id do professor 1",
        statusProfessor: "pendente",// "aceito" || "pendente" || "recusado"
        categoriaProfessor: "Orientador",// Orientador || Coorientador || Avaliador

        comentarios: [
            {
                msg: "Achei muito interessante, parabéns!",
            },
            {
                msg: "Gostaria que tivessem se aprofundado mais no tema X, mas no geral ficou ótimo!",
            },
        ],

        notageral: {
            nota: "9.9",
        },

        avaliacaoposter: {
            titulo: "Pôster 4",
            localdeapresentacao: "Universidade Presbiteriana Mackenzie",
            data: "14/08/2021",
            hora: "16:00",
            sessaoid: "ID da sessão 4",
        },

        avaliacaobanca: {
            titulo: "Banca 4",
            sala: "4A",
            data: "14/08/2021",
            hora: "17:00",
            bancaid: "ID da banca 4",
        },

        semestre: "2º Semestre - 2021",

        notaposter: [{
            tipoavaliador: "Avaliador",
            a1: "Avaliador 1",
            a2: "Avaliador 2",
            a3: "Avaliador 3",
            // Respostas da avaliação sobre: Conteúdo
            c4: "Bom",
            c5: "Bom",
            c6: "Regular",
            c7: "Bom",
            c8: "Regular",
            // Respostas da avaliação sobre: Disign
            d9: "Bom",
            d10: "Regular",
        }],

        situacao: "ativo", // ativo || aprovado || cancelado || reprovado

        createdAt: "06/2021",
    },
    {
        titulo: "Projeto 5",
        descricao: "Descrição do projeto 5",
        linhaDePesquisa: "Linha de pesquisa do projeto 5",
        disciplina: "Disciplina do projeto 5",
        alunos: [
            {
                nome: "Aluno 5A",
                id: "Id do aluno 5A",
                codMatricula: "TIA do aluno 5A",
                turma: ["8A11,7A11"],
                status: "ativo",// "ativo" || "pendente"
            },
            {
                nome: "Aluno 5B",
                id: "Id do aluno 5B",
                codMatricula: "TIA do aluno 5B",
                turma: ["8A11,7A11"],
                status: "ativo",// "ativo" || "pendente"
            },
            {
                nome: "Aluno 5C",
                id: "Id do aluno 5C",
                codMatricula: "TIA do aluno 5C",
                turma: ["8A11,7A11"],
                status: "ativo",// "ativo" || "pendente"
            }
        ],
        professor: "Professor 1",
        idProfessor: "Id do professor 1",
        statusProfessor: "pendente",// "aceito" || "pendente" || "recusado"
        categoriaProfessor: "Orientador",// Orientador || Coorientador || Avaliador

        comentarios: [
            {
                msg: "Achei muito interessante, parabéns!",
            },
            {
                msg: "Gostaria que tivessem se aprofundado mais no tema X, mas no geral ficou ótimo!",
            },
        ],

        notageral: {
            nota: "9.9",
        },

        avaliacaoposter: {
            titulo: "Pôster 5",
            localdeapresentacao: "Universidade Presbiteriana Mackenzie",
            data: "14/08/2021",
            hora: "16:00",
            sessaoid: "ID da sessão 5",
        },

        avaliacaobanca: {
            titulo: "Banca 5",
            sala: "5A",
            data: "14/08/2021",
            hora: "17:00",
            bancaid: "ID da banca 5",
        },

        semestre: "2º Semestre - 2021",

        notaposter: [{
            tipoavaliador: "Avaliador",
            a1: "Avaliador 1",
            a2: "Avaliador 2",
            a3: "Avaliador 3",
            // Respostas da avaliação sobre: Conteúdo
            c4: "Bom",
            c5: "Bom",
            c6: "Regular",
            c7: "Bom",
            c8: "Regular",
            // Respostas da avaliação sobre: Disign
            d9: "Bom",
            d10: "Regular",
        }],

        situacao: "ativo", // ativo || aprovado || cancelado || reprovado

        createdAt: "06/2021",
    }
]

