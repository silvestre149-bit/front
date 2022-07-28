const gerarStringMensagemErro = (errosObj) => {
    let msg = "";
    const nomeErros = Object.keys(errosObj);

    for (const nomeErro of nomeErros) {
        /* errosObj[nomeErro].ref.className = "invalid" */
        msg += errosObj[nomeErro].message + ", "
    }

    return msg;

}

export const gerarMensagemErro = (erros, e) => {

    let msg = "Atenção, favor preencher os campos: ";
    let msgDeLista = "";
    let msgFinal = "";
    const nomeErros = Object.keys(erros);
    const matrizErro = [];

    /* remover os erros cujo valor é uma lista,ex {erro1: []} */
    for (const nomeErro of nomeErros) {
        const valorErro = erros[nomeErro];
        if (Array.isArray(valorErro)) {
            matrizErro.push(...valorErro);
            delete erros[nomeErro];
        }
    }

    for (const errosObj of matrizErro) {
        msgDeLista += gerarStringMensagemErro(errosObj);
    }

    msg += gerarStringMensagemErro(erros);

    msgFinal = msg + msgDeLista + "para finalizar.";


    return msgFinal;
}

export const ErroForm = ({ erro }) => {
    if (!erro) {
        return <></>
    }

    return <div
        className="yellow lighten-4"
        style={{ marginTop: "25px" }}
    >
        <span
            style={{ color: 'red', padding: "15px", textAlign: 'center' }}
        >
            <h5>
                {erro}
            </h5>
        </span>
    </div>
}