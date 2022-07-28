import { mudarUsuario } from "../../../../api/alterarPerfil";

export async function mudarUsuarioRequest(id, nome, senha){
    await mudarUsuario(id, {nome: nome, senha: senha})
}