import { HomeAluno } from "../../../../pages/usuario/aluno/Home";
import Perfil from "../../../../pages/usuario/Perfil";
import { CancelaAluno } from '../../../../pages/usuario/aluno/Cancela/index.jsx';
import { NotificacoesAluno } from "../../../../pages/usuario/aluno/Notificacoes";
import Projeto from "../../../../pages/usuario/aluno/Projeto/index.jsx";

/** @type { import("react-router-dom").RouteProps[] } */
export const ROTAS_ALUNO = [
    {
        path: '/',
        component: HomeAluno
    },
    {
        path: '/perfil',
        component: Perfil
    },
    {
        path: '/aluno/projeto',
        component: Projeto
    },
    {
        path: '/notificacoes',
        component: NotificacoesAluno
    },
    {
        path: '/cancelar',
        component: CancelaAluno
    }
]