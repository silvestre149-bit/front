import React, { useCallback, useMemo } from 'react';
import { useTable, usePagination, useSortBy, useGlobalFilter } from "react-table";
import { useHistory } from "react-router-dom";

/* estilos */
import { MdKeyboardArrowUp as Up, MdKeyboardArrowDown as Down, MdAddBox as Add, MdClose as Close } from "react-icons/md";

/* componentes */
import { Filtro } from './Filtro';
import { Tamanho } from './Tamanho';
import { Mensagem } from '../../Mensagem';

/**
 * Props do componente Tabela
 * @typedef  TabelaProps
 * @property {Object[]} colunas
 * @property {Object[]} dados
 * @property {String} nomeRecurso - recurso que será administrado, ex dimensao, questao
 * @property {Bool} botaonovo
 */

/**
 * @param {TabelaProps} props 
 * @returns 
 */

export function Tabela({
    nomeRecurso,
    botaonovo,
    dados,
    colunas
}) {
    const memoDados = useMemo(() => dados, [dados])
    const memoColunas = useMemo(() => colunas, [colunas])
    return (<MemoTabela
        data={memoDados}
        columns={memoColunas}
        nomeRecurso={nomeRecurso}
        botaonovo={botaonovo}
    />)
}

function MemoTabela({
    /* onClickRow = defaultPropGetter, */
    nomeRecurso,
    botaonovo,
    data,
    columns
}) {

    const history = useHistory();

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        /* paginação */
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        /* linha da tabela */
        prepareRow,
        state,
        /* filtro */
        setGlobalFilter,
    } = useTable(
        { columns, data },
        /* hooks */
        useGlobalFilter,
        useSortBy,
        usePagination,
    )

    const { globalFilter, pageIndex, pageSize } = state;

    const irParaPagina = useCallback((row) => {
        let dados = {};
        dados[nomeRecurso] = row.original;
        history.push(nomeRecurso + `/adm`, dados);
        /* history.push(linkAlterar + '/' + row.original.id) */
    }, [history, nomeRecurso])

    return <>

        <Mensagem
            descricao="Atenção! Clique na coluna para ordenar as linhas"
            fechar
        />

        {nomeRecurso &&
            <Mensagem
                cor="azul"
                descricao="Clique na linha da tabela para alterar ou excluir"
            />}

        {botaonovo && <div style={{ marginBottom: '15px' }}>
            <div class="row">
                <div class="col s12">
                    <a href="#meu-modal" class="btn green   modal-trigger" style={{ float: "right" }}>
                        <Add style={{ verticalAlign: "middle", marginRight: "0.5em" }} />Novo
                    </a>
                </div>
            </div>
        </div>
        }

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

            <div style={{ flexGrow: 2, marginRight: '50px' }}>
                <Filtro filtro={globalFilter} definirFiltro={setGlobalFilter} />
            </div>

            <div style={{ flexGrow: 0 }}>
                <Tamanho tamanho={pageSize} definirTamanho={setPageSize} />
            </div>
        </div>


        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <table className='highlight responsive-table' {...getTableProps()} >

                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr style={{ fontSize: '2vmin' }} {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <i>{column.isSorted ? (column.isSortedDesc ? <Down /> : <Up />) : ''}</i>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row)

                        /* definindo para cada tr o evento de clique */
                        return <tr style={{ fontSize: '2vmin' }} {...row.getRowProps({ onClick: () => !nomeRecurso ? undefined : irParaPagina(row) })}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>
                                    {cell.render('Cell')}
                                </td>
                            })}
                        </tr>
                    })}
                </tbody>

            </table>
        </div>

        <section style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            {/* Paginação */}
            <div className="flow-text btn red accent-4" style={{ marginTop: '20px', borderRadius: '2em' }}>
                <button className="btn-flat" style={{ backgroundColor: 'transparent', color: 'white', borderRight: '1px solid white', padding: '0em 0.5em 0em 0em' }} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<'}</button>
                <span style={{ margin: '1em', fontSize: '2vmin' }}>
                    <b>Página{' '} {pageIndex + 1} de {pageOptions.length}</b>
                </span>
                <button className="btn-flat" style={{ backgroundColor: 'transparent', color: 'white', borderLeft: '1px solid white', padding: '0em 0em 0em 0.5em' }} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} >{'>'}</button>
            </div>
        </section>

    </>
}