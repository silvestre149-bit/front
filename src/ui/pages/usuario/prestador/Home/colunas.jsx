import { useHistory } from 'react-router';
import { AVALIACAO_TYPES } from '../../../../../utils/types'
/**
 * @param {import('react-table').CellProps} props 
 */
const StatusAvaliacao = ({ status, id }) => {

    const { push } = useHistory();


    const verAvaliacao = () => { push('/avaliacao', { idAvaliacao: id }) }


    return status === AVALIACAO_TYPES.ABERTO
        ? <span onClick={verAvaliacao} className={`white-text badge blue`}>Avaliar</span>
        : status === AVALIACAO_TYPES.CANCELADO
            ? <span className="white-text badge black">Cancelado</span>
            : <span onClick={verAvaliacao} className="white-text badge green">Avaliado</span>
}

/**@type {import('react-table').Column[]} */
export const COLUNAS_AVALIACAO = [
    {
        Header: 'Cliente',
        accessor: 'examinee.name',
    },
    {
        Header: 'Situação',
        accessor: 'status',
        Cell: props => <StatusAvaliacao status={props.cell.value} id={props.row.original.id} avaliado={props.row.original.evaluated} />
    }
]