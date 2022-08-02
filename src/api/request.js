import { buscarCookie, limparCookies } from '../utils/cookie';
import { COOKIE_TYPES, ERRO_TYPES } from '../utils/types';
import api from './request-config';

export const setHeaderAuth = () => {
    const userCookie = buscarCookie(COOKIE_TYPES.USUARIO);
    const authToken = `Bearer ${userCookie}`;
    api.defaults.headers.common.Authorization = authToken;
}

setHeaderAuth()

/**
 * @param {Promise<import('axios').AxiosResponse<any>>} requisicao 
 */
const tratarRequisicao = async (requisicao) => {
    setHeaderAuth()
    return requisicao.then(respostaHttp => {
        if (respostaHttp.status === ERRO_TYPES.JWT_NAO_AUTENTICADO) {
            limparCookies()
        }
        return requisicao;
    })
}

export const get = async (link) => {
    return tratarRequisicao(api.get(link))
}
export const
    post = async (link, body) => {
        return tratarRequisicao(api.post(link, body))
    }
export const put = async (link, body) => {
    return tratarRequisicao(api.put(link, body))
}
export const patch = async (link, body) => {
    return tratarRequisicao(api.patch(link, body))
}
export const del = async (link) => {
    return tratarRequisicao(api.delete(link))
}