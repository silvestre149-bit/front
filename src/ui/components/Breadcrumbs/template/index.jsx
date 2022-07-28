import React from 'react';
import './index.css'
import { Link } from 'react-router-dom';
/**
 * @property {Object[]} dadosBreadcrumb
 * @property {String} pagAtual
 */

export function BreadcrumbTemplate({
    dadosBreadcrumb,
    pagAtual,
}) {
    return <>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
        <div className="nav-wrapper">
            <br />
            <div className="col s12">
                {dadosBreadcrumb.map((dadosBreadcrumb, index) => <Link key={index} to={dadosBreadcrumb.rota} className="breadcrumb grey-text rota">{dadosBreadcrumb.nome} </Link>)}
                <Link to="/" className="breadcrumb black-text disabled-link rota" >{pagAtual}</Link>
            </div>
        </div>
    </>
}