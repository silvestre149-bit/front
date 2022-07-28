import { ALERTA_TYPES } from "./types";
/* import { toast } from 'react-toastify'; */

/* const { error, success, warn } = toast; */

const gerarMensagemAcao = (acao) => {
    /* let msg = "Ops, tivemos um imprevisto, por favor reinicie a página";
    let toastFunction = error; */

    switch (acao) {
        case ALERTA_TYPES.CADASTRAR:
          /*   msg = "cadastrado.";
            toastFunction = success; */
            break
        case ALERTA_TYPES.ALTERAR:
            /* msg = "alterado.";
            toastFunction = warn; */
            break
        case ALERTA_TYPES.EXCLUIR:
          /*   msg = "deletado.";
            toastFunction = error; */
            break
        default:
            break;
    }
    
    /* toastFunction(msg); */
    /* TODO - É necessário limpar o history */
}

export const gerarObjetoAlerta = (titulo, acao) => {
    return {
        titulo,
        acao: gerarMensagemAcao(acao)
    }
}

export const gerarObjetoAlertaErro = () => {
    return { acao: gerarMensagemAcao(ALERTA_TYPES.ERRO) };
}