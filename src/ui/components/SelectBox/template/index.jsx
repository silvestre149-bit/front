import React from 'react';
import './index.css'
import M from 'materialize-css';
/**
 * @property {Object[]} dadosSelect
 * @property {String} nomeSelect
 * @property {String} textoSelect
 */

export function SelectBox({
    dadosSelect,
    nomeSelect,
    textoSelect
}) {
    var elemsSelect = document.querySelectorAll('select');
    M.FormSelect.init(elemsSelect);
    return <>
        <div class="row">
            <label>{nomeSelect}</label>
            <div className="custom-select">
                <select class="browser-default select-options">
                    <option disabled selected>{textoSelect}</option>
                    {dadosSelect.map((dadosSelect,index)=> <option key={index}>{dadosSelect.titulo} </option>)}
                </select>
                <span className="custom-arrow"></span>
            </div>
        </div>
    </>
}