import { Cookies } from "react-cookie";
import { COOKIE_TYPES } from "./types";

export const limparCookies = () => {
    const cookie = new Cookies();
    for (let nomeCookie of Object.values(COOKIE_TYPES)) {
        cookie.remove(nomeCookie, { path: '/' })
    }
}

export const buscarCookie = (nomeCookie) => {
    const cookie = new Cookies();
    return cookie.get(nomeCookie);
}

export const criarCookie = (nomeCookie, dados) => {
    const cookie = new Cookies();
    return cookie.set(nomeCookie, dados, localStorage.setItem(cookie, 'token'));
}

export const removerCookie = (nomeCookie) => {
    const cookie = new Cookies();
    return cookie.remove(nomeCookie);
}