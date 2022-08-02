
import { useContext, useState, useEffect } from 'react';
import { Collapsible, CollapsibleItem, Icon, Button } from 'react-materialize';
import { useHistory } from 'react-router-dom';
import { deletarConvite } from '../../../api/convites';
import { aceitarAvaliacao } from '../../../api/professor';
import { removerAvaliadorProjeto, removerParticipacaoProjeto } from '../../../api/projeto';
import { pegarSemestreAberto } from '../../../api/semestre';
import { AuthContext } from '../../context/Auth';


export default function NotificacaoAvaliacao({ remetente, titulo, projetoId, atualizar, convite }) {
    const history = useHistory();
    const { usuario } = useContext(AuthContext);

    const aceitarConvite = async () => {
        try {
            await aceitarAvaliacao(projetoId);
            await deletarConvite(convite);
            return atualizar(true);
        } catch(e) {
            return console.log(e);
        }
    };

    const recusarConvite = async () => {
        try {
            if (usuario.permissoes.avaliador) await removerAvaliadorProjeto(projetoId);
            await deletarConvite(convite);
            return atualizar(true);
        } catch(e) {
            return console.log(e);
        }
    };

    return <>
        <Collapsible accordion>
            <CollapsibleItem
                expanded={false}
                header={`O aluno ${remetente} convidou você para avaliar o projeto ${titulo}`}
                icon={<Icon>school</Icon>}
                node="div">
                <div className="row">
                    <div className="col s2">
                        <Button style={{
                            marginRight: '5px',
                            backgroundColor: 'red',
                        }}
                        onClick={(e) => {aceitarConvite()}}>Aceitar</Button>
                    </div>
                    <div className="col s2">
                        <Button style={{
                            marginRight: '5px',
                            backgroundColor: 'red',
                        }} 
                        onClick={(e) => {recusarConvite()}}>Recusar</Button>
                    </div>
                    <div className="col s1" />
                    <Button
                        onClick={() => { history.push('/informacoes/projeto', { projeto: projetoId, tipo: 'avaliacao', convite: convite, remetente: remetente }) }}
                        node="button"
                        style={{
                            marginRight: '5px',
                            backgroundColor: 'red',
                        }}
                        waves="light">
                        Ver o projeto
                    </Button>
                </div>
            </CollapsibleItem>
        </Collapsible>
    </>
}