import React from 'react';

export function Carregando() {
    return <section style={{ textAlign: 'center' }}>
        <h2>Carregando</h2>
        <div className="progress">
            <div className="indeterminate"></div>
        </div>
    </section>
}