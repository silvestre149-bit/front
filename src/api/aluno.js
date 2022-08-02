import { post, get, del, patch } from './request';

export async function cadastrarAluno(body) {
    try {
        const dados = await post('/usuario', body);
        return { ...dados };
    } catch (erro) {
        throw new Error(erro);
    }
};

export async function criarVariosAlunos(body) {
    try {
        const dados = await post('/usuario', body);
        return { ...dados };
    } catch (erro) {
        throw new Error(erro);
    }
};

export async function pegarTodosAlunos() {
    try {
        const dados = await get("/usuario?tipo=aluno");
        return { ...dados };
    } catch (erro) {
        throw new Error(erro);
    }
};

export async function pegarTodosUsuarios() {
    try {
        const dados = await get('/usuario');
        return { ...dados };
    } catch (erro) {
        throw new Error(erro);
    }
};

export async function buscarCoordenadores() {
    try {
        const dados = await get('/usuario?tipo=professor&coordenador=true');
        return { ...dados };
    } catch (erro) {
        throw new Error(erro);
    }
};

export async function pegarUsuario(id) {
    try {
        const dados = await get('/usuario/' + id);
        return { ...dados };
    } catch (erro) {
        throw new Error(erro);
    }
};


export async function pegarParticipacao(id) {
    try {
        const dados = await get('/participacao/' + id);
        return { ...dados };
    } catch (erro) {
        throw new Error(erro);
    }
};

export async function inserirParticipacaoUsuario(id, body) {
    try {
        const dados = await post('/usuario/' + id + '/participacao', body);
        return { ...dados };
    } catch (erro) {
        throw new Error(erro);
    }
};

export async function removerParticipacaoUsuario(id, body) {
    try {
        const dados = await patch('/usuario/' + id + '/remover/participacao', body);
        return { ...dados };
    } catch (erro) {
        throw new Error(erro);
    }
};

export async function atualizarAluno(id, body) {
    try {
        const dados = await patch('/usuario/' + id, body);
        return { ...dados };
    } catch (erro) {
        return { erro }
    }
};

export async function atualizarTurmas(id, body) {
    try {
        const dados = await patch('/usuario/' + id + '/turmas', body);
        return { ...dados };
    } catch (erro) {
        return { erro }
    }
};

export async function deletandoAluno(id) {
    try {
        const dados = await del('/usuario/' + id);
        return { ...dados };
    } catch (erro) {
        return { erro }
    }
};

export async function resetarSenhaAluno(id, body) {
    try {
        const dados = await patch('/usuario/' + id, body);
        return { ...dados };
    } catch (erro) {
        return { erro }
    }
};



