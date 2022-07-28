import { post, patch, get } from './request';

export async function cadastrarProjeto(projetoInput) {
    try {
        const dados = await post('/projeto/', projetoInput);
        return { erro: undefined, ...dados };
    } catch (erro) {
        return { erro }
    }
}

export async function cadastrarAlunoNoTCC(id, body) {
    try {
        const dados = await patch('/usuario/' + id, body);
        return { ...dados };
    } catch (erro) {
        return { erro }
    }
}

export async function criarParticipacao(body) {
    try {
        const dados = await post('/participacao/', body);
        return { ...dados }
    } catch (erro) {
        return { erro }
    }
}

export async function verificarAluno(id) {
    try {
        const dados = await get('/usuario/' + id);
        return { ...dados };
    } catch (erro) {
        return { erro }
    }
}

export async function verificarTodos() {
    try {
        const dados = await get('/usuario');
        return { ...dados }
    } catch (erro) {
        return { erro }
    }
}

export async function adicionarParticipantes(id) {
    try {
        const dados = await patch('/projeto/' + id);
        return { ...dados }
    } catch (erro) {
        return { erro }
    }
}

export async function adicionarParticipacao(id, body) {
    try {
        const dados = await post('/projeto/' + id, body);
        return { ...dados }
    } catch (erro) {
        return { erro }
    }
}

export async function adicionarParticipanteProjeto(id, body) {
    try {
        const dados = await post('/projeto/' + id + '/projeto', body);
        return { ...dados }
    } catch (erro) {
        return { erro }
    }
}

export async function adicionarParticipacaoUsuario(id, body) {
    try {
        const dados = await post('/usuario/' + id, body);
        return { ...dados }
    } catch (erro) {
        return { erro }
    }
}