import { get, post, del, patch } from './request';

export async function criarAluno(body) {
    try {
        const dados = await post('/usuario/alunos', body);
        return { ...dados };
    } catch (erro) {
        return { erro }
    }
}

export async function criarVariosAlunos(body) {
    try {
        const dados = await post('/usuario', body);
        return { ...dados };
    } catch (erro) {
        return { erro }
    }
}

export async function criarSemestre(body) {
    try {
        const dados = await post('/semestre', body);
        return { ...dados };
    } catch (erro) {
        return false
    }
}

export async function pegarSemestre() {
    try {
        const dados = await get('/semestre');
        return { ...dados };
    } catch (erro) {
        return { erro }
    }
}

export async function pegarSemestreAberto() {
    try {
        const dados = await get('/semestre/status/aberto');
        return { ...dados };
    } catch (erro) {
        return { erro }
    }
}

export async function buscarTurmas(id) {
    try {
        const dados = await get('/semestre/' + id + '/turmas');
        return { ...dados };
    } catch (erro) {
        return { erro }
    }
}

export async function atualizarSemestre(id, body) {
    try {
        const dados = await patch('/semestre/' + id, body);
        return { ...dados };
    } catch (erro) {
        return { erro }
    }
}

export async function adicionarTurmas(id, body) {
    try {
        const dados = await post('/semestre/' + id + '/turmas', body);
        return { ...dados };
    } catch (erro) {
        return { erro }
    }
}

export async function deletarSemestre(id) {
    try {
        const dados = await del('/semestre/' + id);
        return { ...dados };
    } catch (erro) {
        return false
    }
}

export async function fecharSemestre(id) {
    try {
        const dados = await patch('/semestre/' + id + '/finalizar');
        return dados;
    } catch (erro) {
        return { erro }
    }
}

export async function deletarAlunos() {
    try {
        const dados = await del('/usuario/deletar/alunos');
        return { ...dados };
    } catch (erro) {
        return { erro }
    }
}

export async function deletarProjetos() {
    try {
        const dados = await del('/projeto/');
        return { ...dados };
    } catch (erro) {
        return { erro }
    }
}



