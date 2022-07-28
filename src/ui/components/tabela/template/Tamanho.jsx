import React, { useEffect } from 'react';

import { FormSelect } from "materialize-css";
import './index.css'
/**
 * 
 * @param {{
 * tamanho: number,
 * definirTamanho: Function
 * }} props 
 * @returns 
 */
export function Tamanho({ tamanho, definirTamanho }) {

    /* iniciar Dropdown */
    useEffect(() => {
        FormSelect.init(document.querySelectorAll('#table-size'))
    }, [])

    return <>
        <div className="custom-select-small">
            <select
            style={{ fontSize: '1rem' }}
                id="table-size"
                className="browser-default select-options-small "
                value={tamanho}
                onChange={e => definirTamanho(Number(e.target.value))}>
                {[10, 25, 50, 100].map(tamanho => (
                    <option
                        value={tamanho}
                        key={tamanho}
                    >
                        Mostrar {tamanho}
                    </option>
                ))}
            </select>
            <span className="custom-arrow-small"></span>
        </div>
    </>
}