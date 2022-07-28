/**@type {import('react-table').Column[]} */

export const COLUNAS_LISTA = [
    {
        Header: 'Título',
        accessor: 'titulo',
    },
    {
        Header: 'Data de início',
        accessor: 'dataAbertura',
    },
    {
        Header: 'Status',
        accessor: 'status'
    }
]

export const DADOS = [
    {
        titulo: '1º semestre - 2021',
        dataInicio: '14/02/21'
    },
    {
        titulo: '2º semestre - 2021',
        dataInicio: '14/08/21'
    },
    {
        titulo: '1º semestre - 2022',
        dataInicio: '14/02/22'
    },
    {
        titulo: '2º semestre - 2022',
        dataInicio: '14/08/22'
    }
]