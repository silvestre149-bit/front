import React, { useEffect } from 'react';
import { useQuery } from "react-query";
import { useHistory, useLocation } from 'react-router';

/* componentes */
import { Collapsible } from "materialize-css";
import FormFormulario from '../../../../components/form/Formulario';
import { Mensagem } from '../../../../components/Mensagem';

/* estilos */
import './styles.css';

/* tipos */
import { CACHE_TYPES, FORM_TYPES } from '../../../../../utils/types';
import { CACHE_CONFIGURACAO } from '../../../../../utils/cache';
import { get } from '../../../../../api/request';
import { Carregando } from '../../../../components/Carregando';

function QuestoesFormulario({ questoes }) {
    return questoes.map(questao => {
        return <div className="card card-formulario">
        <h5 href="#!" className='collection-item active teal accent-4'>{questao.title}</h5>
    </div>

    })
}

function InformacoesFormulario({ formulario }) {
    const { push } = useHistory()
    const { pathname } = useLocation()

    const LINK_ALTERAR = pathname + '/adm';

    return <div className="collection">

        <div className="card card-formulario">
            <h5 href="#!" className='collection-item active blue'>Feedback nota baixa</h5>
            <h6 href="#!" className='collection-item'>{formulario.feedback.minFeedback}</h6>
        </div>

        <div className="card card-formulario">
            <h5 href="#!" className='collection-item active blue'>valor nota baixa</h5>
            <h6 href="#!" className='collection-item'>{formulario.feedback.minScore}</h6>
        </div>


        <div className="card card-formulario">
            <h5 href="#!" className='collection-item active blue'>Feedback nota média</h5>
            <h6 href="#!" className='collection-item'>{formulario.feedback.midFeedback}</h6>
        </div>

        <div className="card card-formulario">
            <h5 href="#!" className='collection-item active blue'>valor nota média</h5>
            <h6 href="#!" className='collection-item'>{formulario.feedback.midScore}</h6>
        </div>


        <div className="card card-formulario">
            <h5 href="#!" className='collection-item active blue'>Feedback nota alta</h5>
            <h6 href="#!" className='collection-item'>{formulario.feedback.maxFeedback}</h6>
        </div>

        <br />
        <hr />
        <h4 style={{ textAlign: 'center' }}>Questões</h4>
        <hr />
        <br />

        {formulario.questions && <QuestoesFormulario questoes={formulario.questions} />}

        <div style={{ display: 'flex', justifyContent: 'right' }}>
            <button
                className="waves-effect waves-light btn modal-trigger yellow black-text"
                onClick={() => push(LINK_ALTERAR, { tipo: formulario.type })}
                disabled
            >
                Revisar
            </button>
        </div>

    </div>
}

function Formularios({ prestador, contratante }) {


    /* iniciar componente */
    useEffect(() => {
        Collapsible.init(document.querySelector('.collapsible'))
    })

    return <>

        {/* PRESTADOR */}
        <ul className="collapsible popout" >
            <li style={{ marginBottom: "10px", backgroundColor: "#fff" }}>
                <div className="collapsible-header" style={{ justifyContent: 'center' }}>
                    <h3>Prestador de serviço</h3>
                </div>
                <div className="collapsible-body">

                    <InformacoesFormulario formulario={prestador} />
                </div>
            </li>

            {/* CONTRATANTE */}
            <li style={{ marginBottom: "10px", backgroundColor: "#fff" }}>
                <div className="collapsible-header" style={{ justifyContent: 'center' }}>
                    <h3>Contratante</h3>
                </div>
                <div className="collapsible-body">

                    <InformacoesFormulario formulario={contratante} />


                </div>
            </li>

        </ul>

    </>;
}

const buscarFormularios = async () => {
    return await get('/form').then(request => request.data)
}

const FormularioEmFalta = ({ tipo }) => {
    return <>
        <Mensagem descricao="Atenção, é necessário cadastrar o formulário abaixo" />
        <Mensagem cor="azul" descricao="Os valores de porcentagem podem ser de 0 a 100" />
        <FormFormulario tipo={tipo} />
    </>
}

export default function Formulario() {

    const { data } = useQuery(CACHE_TYPES.FORMULARIO, buscarFormularios, CACHE_CONFIGURACAO);
    const formCadastrados = Array.isArray(data) ? data.length : undefined;

    switch (formCadastrados) {
        case 0:
            return <FormularioEmFalta tipo={FORM_TYPES.PRESTADOR_SERVICO} />
        case 1:
            return <FormularioEmFalta tipo={FORM_TYPES.CLIENTE} />
        case 2:
            if (data[0].type === FORM_TYPES.PRESTADOR_SERVICO) {
                return <Formularios prestador={data[0]} contratante={data[1]} />
            }
            return <Formularios prestador={data[1]} contratante={data[0]} />
        default:
            return <Carregando />
    }

}

