import { buscarCookie } from "./cookie";
import { validarToken } from "./jwt";
import { COOKIE_TYPES } from "./types";

export function informarUsuario(){
    const token = buscarCookie(COOKIE_TYPES.USUARIO);
    const dados = validarToken(token);

    return dados?.user?.name || undefined;
}


