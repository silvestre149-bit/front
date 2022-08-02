import { get, post, del } from './request';


export async function enviarConvite(body) {
    try {
        const dados = await post('/notificacoes/', body);
        return { ...dados };
    } catch (erro) {
        return { erro }
    }
}

export async function enviarConvitesAosParticipantes(body) {
    try {
        const dados = await post('/notificacoes/participantes', body);
        return { ...dados };
    } catch (erro) {
        return { erro }
    }
}

export async function buscarNotificacoes(id) {
    try {
        const dados = await get('/notificacoes/' + id);
        return { ...dados };
    } catch (erro) {
        return { erro }
    }
}

export async function buscarTodasNotificacoes() {
    try {
        const dados = await get('/notificacoes');
        return { ...dados };
    } catch (erro) {
        return { erro }
    }
}

export async function buscarPedidoAberto(id) {
    try {
        const dados = await get('/notificacoes/pedido/aberto/' + id);
        return { ...dados };
    } catch (erro) {
        return { erro }
    }
}

export async function buscarPedidoDeCancelamento() {
    try {
        const dados = await get('/notificacoes?tipo=cancelamento');
        return { ...dados };
    } catch (erro) {
        return { erro }
    }
}

export async function deletarConvite(id) {
    try {
        const dados = await del('/notificacoes/' + id)
        return { ...dados };
    } catch (erro) {
        return { erro }
    }
}