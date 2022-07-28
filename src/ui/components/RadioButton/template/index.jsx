import React from 'react';

/**
 * @property {Object[]} dadosRB
 */

export function RadioButtonTemplate({
    dadosRB
}) {
    return <>
        <form action="#">
                <div className="row">
                {dadosRB.map((dadosRB, index) => <p> <label> <input name="group1" type="radio" checked/><span key={index}>{dadosRB.nome} </span></label></p>)}
                </div>
        </form>
    </>
}
