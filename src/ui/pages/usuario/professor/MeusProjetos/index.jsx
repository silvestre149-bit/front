import React from 'react';
import { Mensagem } from '../../../../components/Mensagem';
import TabelaProjetoProf from '../../../../components/tabela/ProjetosDoProfessor';
import { BreadcrumbsMeusProjetos } from '../../../../components/Breadcrumbs/MeusProjetosBC';
export function ProjetosProfessor() {
    return <>
       <BreadcrumbsMeusProjetos/>
        <div className="section">
            <h2 className="center">Meus Projetos</h2>
        </div>
        <div className="section">
            <Mensagem className="center" descricao="Atenção! Clique em um título, na aba vermelha abaixo, para visualizar projetos" cor="amarelo" />
        </div>
        <TabelaProjetoProf />
    </>
}