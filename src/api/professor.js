import {get, patch, post } from "./request";

export async function buscarProfessores() {
    try {
        const dados = await get('/usuario/buscar/professores');
        return {...dados };
    } catch (erro) {
        return { erro }
    }
}

export async function buscarUmProfessor(id) {
    try {
        const dados = await get('/usuario/' + id);
        return {...dados };
    } catch (erro) {
        return { erro }
    }
}

export async function buscarCod(cod) {
    try {
        const dados = await get('/usuario/cod/' + cod);
        return {...dados };
    } catch (erro) {
        return { erro }
    }
}

export async function cadastrarProfessor(body) {
    try {
        const dados = await post('/usuario', body);
        return {...dados };
    } catch (erro) {
        return { erro }
    }
}

export async function editarProfessor(id, body) {
    try {
        const dados = await patch('/usuario/' + id, body);
        return {...dados };
    } catch (erro) {
        return { erro }
    }
}

export async function aceitarOrientacao(id) {
    try {
        const dados = await patch('/projeto/orientador/' + id);
        return {...dados };
    } catch (erro) {
        return { erro }
    }
}

export async function aceitarAvaliacao(id) {
    try {
        const dados = await patch('/projeto/avaliador/' + id);
        return {...dados };
    } catch (erro) {
        return { erro }
    }
}

export async function aceitarSuplente(id) {
    try {
        const dados = await patch('/projeto/suplente/' + id);
        return {...dados };
    } catch (erro) {
        return { erro }
    }
}

