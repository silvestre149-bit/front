import React, { useContext, useEffect, useState } from 'react';

/* contexto */
import { AuthContext } from '../Auth';

/* componentes */
import Layout from '../../components/Layout';

const valorInicial = {
    tema: true, /* claro=true, escuro=false */
    definirTema: undefined
}

export const LayoutContext = React.createContext(valorInicial)

function LayoutProvider({ children }) {
    const [tema, definirTema] = useState(valorInicial.tema);
    const contexto = useContext(AuthContext);

    useEffect(() => {
        const body = document.getElementsByTagName('body')[0]
        if (contexto.usuario) {
            if (tema) {
                body.className = ' grey lighten-3 '
            } else {
                body.className = ' grey darken-4 '
            }
        }else{
            body.className = ' blue '
        }
    }, [tema, contexto])

    return <section style={{ transition: "1s" }}>

        <LayoutContext.Provider value={{ tema, definirTema }}>
            <Layout>
                {children}
            </Layout>
        </LayoutContext.Provider>
    </section>
}

export default LayoutProvider;