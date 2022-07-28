
/**@type {import("react-table").ColumnGroup[]} */
export const COLUNAS_DIMENSAO = [
    {
        Header: 'Título',
        accessor:'title'
    },
    {
        Header:'Nota Mínima',
        accessor: 'feedback.minScore'
    },
    {
        Header:'Nota média',
        accessor: 'feedback.midScore'
    }
]