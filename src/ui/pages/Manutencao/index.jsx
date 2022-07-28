import React from 'react';

import './styles.css';
import { MdWarning as Warning } from "react-icons/md";


function Manutencao() {
    return <div id="manutencao">
        <div className="card blue-text waves-effect waves-light">
            <div className="card-content">
                <h3>
                    <i className="right"  >
                        <Warning id="manutencao-icone" />
                    </i>
                    Ops, estamos em manutenção.Volte mais tarde, por favor.

                </h3>

            </div>
        </div>

    </div>;
}

export default Manutencao;