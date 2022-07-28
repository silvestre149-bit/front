/**@type {import('react-table').Column[]} */
export const COLUNAS_RELATORIO_DOIS = [
    {
        Header: 'Nome do Aluno',
        accessor: 'aluno',
    },
    {
        Header: 'TIA',
        accessor: 'codMatricula',
    },
    {
        Header: 'Turma',
        accessor: 'turma',
    },
    {
        Header: 'Título do Projeto',
        accessor: 'titulo',
    },
    {
        Header: 'Professor Orientador',
        accessor: 'professorOrientador',
    },
    {
        Header: 'Avaliador 1',
        accessor: 'professorAvaliador1',
    },
    {
        Header: 'Avaliador 2',
        accessor: 'professorAvaliador2',
    },
    {
        Header: 'Sessão',
        accessor: 'sessao',
    },    
]

export const DADOS = [
    {
        titulo: "Projeto 1",
        descricao: "Descrição do projeto 1",
        linhaDePesquisa: "Linha de pesquisa do projeto 1",
        disciplina: "Disciplina do projeto 1",
        aluno: "Aluno 1",
        idAluno: "Id do aluno 1",
        codMatricula: "TIA do aluno 1",
        turma: "8A11,7A11",
        statusAluno: "ativo",// "ativo" || "pendente",
        professorOrientador: "Professor 1",
        idProfessorOrientador: "Id do professor 1",
        statusProfessorOrientador: "pendente",// "aceito" || "pendente" || "recusado"
        professorAvaliador1: "Professor 2",
        idProfessorAvaliador1: "Id do professor 2",
        statusProfessorAvaliador1: "pendente",// "aceito" || "pendente" || "recusado"
        professorAvaliador2: "Professor 3",
        idProfessorAvaliador2: "Id do professor 3",
        statusProfessorAvaliador2: "pendente",// "aceito" || "pendente" || "recusado"
        sessao: "18/12/2021 - 18:00",
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
        aluno: "Aluno 2",
        idAluno: "Id do aluno 2",
        codMatricula: "TIA do aluno 2",
        turma: "8A11,7A11",
        statusAluno: "ativo",// "ativo" || "pendente",
        professorOrientador: "Professor 1",
        idProfessorOrientador: "Id do professor 1",
        statusProfessorOrientador: "pendente",// "aceito" || "pendente" || "recusado"
        professorAvaliador1: "Professor 2",
        idProfessorAvaliador1: "Id do professor 2",
        statusProfessorAvaliador1: "pendente",// "aceito" || "pendente" || "recusado"
        professorAvaliador2: "Professor 3",
        idProfessorAvaliador2: "Id do professor 3",
        statusProfessorAvaliador2: "pendente",// "aceito" || "pendente" || "recusado"
        sessao: "19/12/2021 - 18:00",

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
        aluno: "Aluno 3",
        idAluno: "Id do aluno 3",
        codMatricula: "TIA do aluno 3",
        turma: "8A11,7A11",
        statusAluno: "ativo",// "ativo" || "pendente",
        professorOrientador: "Professor 1",
        idProfessorOrientador: "Id do professor 1",
        statusProfessorOrientador: "pendente",// "aceito" || "pendente" || "recusado"
        professorAvaliador1: "Professor 2",
        idProfessorAvaliador1: "Id do professor 2",
        statusProfessorAvaliador1: "pendente",// "aceito" || "pendente" || "recusado"
        professorAvaliador2: "Professor 3",
        idProfessorAvaliador2: "Id do professor 3",
        statusProfessorAvaliador2: "pendente",// "aceito" || "pendente" || "recusado"
        sessao: "20/12/2021 - 18:00",

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
        aluno: "Aluno 4",
        idAluno: "Id do aluno 4",
        codMatricula: "TIA do aluno 4",
        turma: "8A11,7A11",
        statusAluno: "ativo",// "ativo" || "pendente",
        professorOrientador: "Professor 1",
        idProfessorOrientador: "Id do professor 1",
        statusProfessorOrientador: "pendente",// "aceito" || "pendente" || "recusado"
        professorAvaliador1: "Professor 2",
        idProfessorAvaliador1: "Id do professor 2",
        statusProfessorAvaliador1: "pendente",// "aceito" || "pendente" || "recusado"
        professorAvaliador2: "Professor 3",
        idProfessorAvaliador2: "Id do professor 3",
        statusProfessorAvaliador2: "pendente",// "aceito" || "pendente" || "recusado"
        sessao: "21/12/2021 - 18:00",

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
        aluno: "Aluno 5",
        idAluno: "Id do aluno 5",
        codMatricula: "TIA do aluno 5",
        turma: "8A11,7A11",
        statusAluno: "ativo",// "ativo" || "pendente",
        professorOrientador: "Professor 1",
        idProfessorOrientador: "Id do professor 1",
        statusProfessorOrientador: "pendente",// "aceito" || "pendente" || "recusado"
        professorAvaliador1: "Professor 2",
        idProfessorAvaliador1: "Id do professor 2",
        statusProfessorAvaliador1: "pendente",// "aceito" || "pendente" || "recusado"
        professorAvaliador2: "Professor 3",
        idProfessorAvaliador2: "Id do professor 3",
        statusProfessorAvaliador2: "pendente",// "aceito" || "pendente" || "recusado"
        sessao: "22/12/2021 - 18:00",

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

