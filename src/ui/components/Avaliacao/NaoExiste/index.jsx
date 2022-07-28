import React from 'react';
import { Mensagem } from '../../Mensagem';

export function AvaliacaoNaoExiste() {
    return <section>
        <Mensagem
            descricao="Atenção, no momento não existe avaliações"
            cor="vermelho"
        />
    </section>;
}