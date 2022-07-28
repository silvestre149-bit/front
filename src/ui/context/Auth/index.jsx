import React, { useReducer, useMemo, useCallback } from 'react';
import * as jwt from 'jsonwebtoken';
import { COOKIE_TYPES, ERRO_TYPES, LOGIN_TYPES, PERFIL_TYPES } from '../../../utils/types';
import { validarToken } from '../../../utils/jwt';
import { buscarCookie, limparCookies } from '../../../utils/cookie';
import { setHeaderAuth } from '../../../api/request';
import { Carregando } from '../../components/Carregando';

const { decode } = jwt;

const valorInicial = Object.freeze({
    usuario: undefined,
    token: undefined,
    mensagemErro: undefined,
    perfil: PERFIL_TYPES.NENHUM
})

const retornaPerfil = (usuario) => {
    let tipo = undefined;
    Object.keys(PERFIL_TYPES).forEach(perfil => {
        if (usuario.tipo && usuario.tipo === PERFIL_TYPES[perfil]) {
            tipo = PERFIL_TYPES[perfil]
        }
    })
    return tipo || PERFIL_TYPES.NENHUM;
}

export const AuthContext = React.createContext({ ...valorInicial, dispatch: null })

function authReducer(state, action) {

    if (action.type === LOGIN_TYPES.OK) {
        const token = action.dados.token
        const usuario = decode(token)
        const perfil = retornaPerfil(usuario);
        setHeaderAuth()
        return { ...state, usuario, token, perfil }
    }

    /* Caso tenha algum erro ou Logout */

    limparCookies();

    switch (action.type) {
        case LOGIN_TYPES.LOGOUT:
            return { ...valorInicial, mensagemErro: undefined }
        case LOGIN_TYPES.PAGINA_NAO_ENCONTRADA:
            return { ...valorInicial, mensagemErro: ERRO_TYPES.PAGINA_NAO_ENCONTRADA.msg }
        case LOGIN_TYPES.USUARIO_SENHA_INVALIDO:
            return { ...valorInicial, mensagemErro: ERRO_TYPES.USUARIO_SENHA_INVALIDO.msg }
        case LOGIN_TYPES.JWT_NAO_DEFINIDA:
            return { ...valorInicial, mensagemErro: ERRO_TYPES.JWT_NAO_DEFINIDA.msg }
        case LOGIN_TYPES.JWT_TEMPO_EXPIRADO:
            return { ...valorInicial, mensagemErro: ERRO_TYPES.JWT_TEMPO_EXPIRADO.msg }
        case LOGIN_TYPES.JWT_NAO_AUTENTICADO:
            return { ...valorInicial, mensagemErro: ERRO_TYPES.JWT_NAO_AUTENTICADO.msg }
        default:
            return { ...valorInicial, mensagemErro: ERRO_TYPES.GENERICO.msg }
    }
}

export function AuthProvider({ children }) {

    /* states */
    const [dados, dispatch] = useReducer(authReducer, valorInicial);
    const resolverTokenInvalido = useCallback((erro) => {
        return authReducer(dados, { type: erro.id })
    }, [dados])

    const dadosCookie = useMemo(() => {
        const cookieToken = buscarCookie(COOKIE_TYPES.USUARIO)

        if (dados && dados.mensagemErro) {
            /* caso tenha mensagem de erro (ex: tempo expirado) */
            limparCookies();
            return { ...valorInicial, mensagemErro: dados.mensagemErro }
        } else if (dados && dados.token) {

            const tokenValidado = validarToken(dados.token);

            if (!tokenValidado.erro) {
                return dados
            }

            return resolverTokenInvalido(tokenValidado.erro);
        } else if (cookieToken) {
            /* Quando faz o login não tem estado pois se atualizar o estado irá renderizar tudo novamente
            então só existe o cookie. Então entra nesse caso */
            const tokenValidado = validarToken(cookieToken);
            if (!tokenValidado.erro) {
                return authReducer(dados, { type: LOGIN_TYPES.OK, dados: { token: cookieToken } })
            }

            return resolverTokenInvalido(tokenValidado);
        }

        return dados;
    }, [dados, resolverTokenInvalido]);

    if(!dadosCookie) return <Carregando />
    return <AuthContext.Provider value={{ ...dadosCookie, dispatch }}>
        {children}
    </AuthContext.Provider>;
}