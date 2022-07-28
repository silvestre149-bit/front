import Perfil from "../../../../pages/usuario/Perfil";
import { HomeProfessor } from "../../../../pages/usuario/professor/Home";
import { ProjetosProfessor } from "../../../../pages/usuario/professor/MeusProjetos";
import { NotificacaoProfessor } from "../../../../pages/usuario/profCoordenador/Notificacao";
import ProjetosProf from "../../../../pages/TabelaMeusProjetos/projeto";
import { ModalOrientadorAceitaConvite } from "../../../../components/novos-modais/ConviteModal/AceitarConvite";
import { ProjetoDetalhes } from "../../../../components/projeto/Detalhes";

/** @type { import("react-router-dom").RouteProps[] } */
export const ROTAS_PROFESSOR = [
    {
        path: '/',
        component: HomeProfessor
    },
    {
        path: '/perfil',
        component: Perfil
    },
    {
        path: '/meusprojetos',
        component: ProjetosProfessor
    },
    {
        path: '/meusprojetos/adm',
        component: ProjetosProf
    },
    {
        path: '/notificacoes',
        component: NotificacaoProfessor
    },
    {
        path: '/informacoes/projeto',
        component: ProjetoDetalhes
    }
]