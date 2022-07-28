import { get, patch } from './request.js';

export async function verificarUsuario(id) {
    try {
        const dados = await get('/usuario/' + id);
        return { ...dados };
    } catch (erro) {
        return { erro }
    }
}

export async function mudarUsuario(id, body) {
    try {
        const dados = await patch('/usuario/' + id, body);
        return { ...dados };
    } catch (erro) {
        return { erro }
    }
}

export async function resetarSenha(id, body) {
    try {
        const dados = await patch('/usuario/' + id + '/senha' , body);
        return { ...dados };
    } catch (erro) {
        return { erro }
    }
} 