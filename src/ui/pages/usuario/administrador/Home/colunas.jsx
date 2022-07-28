
import { useHistory } from 'react-router';
import { AVALIACAO_TYPES } from '../../../../../utils/types'
/**
 * @param {import('react-table').CellProps} props 
 */
const StatusAvaliacao = ({ status, avaliacao }) => {

    const { push } = useHistory();


    const verAvaliacao = () => { push('/avaliacao', { avaliacao }) }


    return status === AVALIACAO_TYPES.ABERTO
        ? <span className={`white-text badge blue`}>Avaliar</span>
        : status === AVALIACAO_TYPES.CANCELADO
            ? <span className="white-text badge black">Cancelado</span>
            : <span onClick={verAvaliacao} className="white-text badge green">Avaliado</span>
}

/**@type {import('react-table').Column[]} */
export const COLUNAS_AVALIACAO = [
    {
        Header: 'Formulário',
        accessor: 'form.type'
    },
    {
        Header: 'Avaliador',
        accessor: 'examiner.name'
    },
    {
        Header: 'Avaliador',
        accessor: 'examinee.name'
    },
    {
        Header: 'Situação',
        accessor: 'status',
        Cell: props => <StatusAvaliacao status={props.cell.value} avaliacao={props.row.original} />
    }

]