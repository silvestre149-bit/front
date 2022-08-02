
import { Collapsible, CollapsibleItem, Icon, Button } from 'react-materialize';
import { deletarConvite } from '../../../api/convites';
import { AuthContext } from '../../context/Auth';
import { useHistory } from 'react-router-dom';
import { aceitarSuplente } from '../../../api/professor';
import { useContext } from 'react';
import { removerSuplenteProjeto } from '../../../api/projeto';


export default function NotificacaoSuplente({ remetente, titulo, projetoId, atualizar, convite }) {
    const history = useHistory();
    const { usuario } = useContext(AuthContext);

    const aceitarConvite = async () => {
        try {
            await aceitarSuplente(projetoId);
            await deletarConvite(convite);
            return atualizar(true);
        } catch(e) {
            return console.log(e);
        }
    };

    const recusarConvite = async () => {
        try {
            if (usuario.permissoes.orientador) await removerSuplenteProjeto(projetoId);
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
                header={`O aluno ${remetente} convidou você para ser suplente no projeto ${titulo}`}
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
                        onClick={() => { history.push('/informacoes/projeto', { projeto: projetoId, tipo: 'suplente', convite: convite, remetente: remetente }) }}
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