import React from 'react';
import RelatorioUm from '../../../../components/tabela/RelatorioUm';
import RelatorioDois from '../../../../components/tabela/RelatorioDois';
import RelatorioTres from '../../../../components/tabela/RelatorioTres';
import { BreadcrumbsRelatorios } from '../../../../components/Breadcrumbs/RelatoriosBC';
export function RelatorioProfCoordenador() {
  return <>
    <BreadcrumbsRelatorios/>
    <h2 className="center">Relatórios</h2>
    <br />
    <RelatorioUm />
    <br />
    <hr />
    <RelatorioDois />
    <br />
    <hr />
    <RelatorioTres />
    <br />
  </>
}