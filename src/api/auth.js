import { get, post } from "./request";

export async function logarUsuario(loginInput) {
    try {
        const dados = await post('/auth/login', loginInput);
        return dados;
    } catch (erro) {
        return { erro }
    }
}

export async function buscarUsuarioTia(tia){
    try{
        const data = await get('/usuario/' + tia + '/tia')
        return {data}
    } catch(erro){
        return{erro}
    }
}