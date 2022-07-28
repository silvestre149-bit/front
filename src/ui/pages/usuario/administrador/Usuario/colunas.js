import { PERFIL_TYPES } from "../../../../../utils/types";


function traduzirTipoUsuario(tipo) {
    switch (tipo) {
        case PERFIL_TYPES.PRESTADOR_SERVICO:
            return 'Prestador';

        case PERFIL_TYPES.CLIENTE:
            return 'Cliente';

        default:
            return 'Administrador'
    }
}

/**@type {import("react-table").Column[]} */
export const COLUNAS_USUARIO = [
    {
        Header: 'Nome',
        accessor: 'name'
    },
    {
        Header: 'E-mail',
        accessor: 'cod'
    },
    {
        Header: 'Tipo',
        accessor: 'type',
        Cell: props => traduzirTipoUsuario(props.cell.value)
    },

]