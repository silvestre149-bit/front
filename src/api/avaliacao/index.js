import { get } from "../request";

export async function buscarAvaliacoes() {
    const requisicao = await get('/avaliation').then(requisicao => requisicao.data)
    return requisicao;
}

export async function buscarAvaliacaoPorId(id) {
    const requisicao = await get('/avaliation/' + id).then(requisicao => requisicao.data)
    return requisicao;
}