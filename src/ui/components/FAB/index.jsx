import React, { useEffect } from 'react';
import M from 'materialize-css';

function HomeProf() {
    useEffect(() => {
        var elemsFAB = document.querySelectorAll('.fixed-action-btn');
        M.FloatingActionButton.init(elemsFAB, {
            direction: 'left',
            hoverEnabled: false,

        });
    }, []);
    return <>
            <div style={{position: "relative"}}>
            <div class="fixed-action-btn" style={{position: "absolute", height: "0px"}}>
                <button class="btn-floating btn-large red accent-4">
                    Ações
                </button>
                <ul>
                    <li>
                        <a class="btn-floating red accent-4"><i class="material-icons">insert_chart</i></a>
                    </li>
                </ul>
            </div>
        </div>
    </>
}

export default HomeProf;
