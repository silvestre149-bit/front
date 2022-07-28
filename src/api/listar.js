import { get } from "./request";

export async function buscarProfessor() {
    try {
        const dados = await get('/usuario');
        return { ...dados };
    } catch (erro) {
        return { erro }
    }
}