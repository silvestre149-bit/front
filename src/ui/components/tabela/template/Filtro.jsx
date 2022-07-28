import React from 'react';

import { MdSearch as Pesquisa } from "react-icons/md";

/**
 * @param {String} filtro 
 * @param {Function} definirFiltro 
 */
export function Filtro({ filtro, definirFiltro }) {
    return <span>

        <div className="input-field">
            <label htmlFor="filtro" style={{ fontSize: '1rem' }}>
                Buscar...
            </label>

            <input
                type="text"
                id="filtro"
                value={filtro || ''}
                onChange={e => definirFiltro(e.target.value)}
            />

        </div>

    </span>;
}