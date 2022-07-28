import React from 'react';
import { useLocation } from 'react-router-dom';
import { MdPersonOutline, MdFormatListBulleted, MdMenu, MdTimer } from 'react-icons/md'
import { BreadcrumbsMeusProjetosEspecificos } from '../../components/Breadcrumbs/MeusProjetosEspecificosBC';
function ProjetosProf() {

  const location = useLocation();

  const PROJETO = location.state.meusprojetos;

  return <>
    <div className="section">

    </div>
  </>
}

export default ProjetosProf;