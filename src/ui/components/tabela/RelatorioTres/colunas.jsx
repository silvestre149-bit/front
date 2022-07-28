/**@type {import('react-table').Column[]} */
export const COLUNAS_RELATORIO_TRES = [
    {
        Header: 'Nome do Aluno',
        accessor: 'nome',
    },
    {
        Header: 'TIA',
        accessor: 'cod',
    },
    {
        Header: '1º Turma',
        accessor: 'turma1',
    },
    {
        Header: '2º Turma',
        accessor: 'turma2',
    },
]

export const DADOS = [
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
]
