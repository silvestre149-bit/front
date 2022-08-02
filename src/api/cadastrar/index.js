import { get } from 'mongoose';
import { post } from '../request';

export async function cadastroTCC() {
    const requisicao = await post('/projeto').then(requisicao => requisicao.data)
    return requisicao;
}