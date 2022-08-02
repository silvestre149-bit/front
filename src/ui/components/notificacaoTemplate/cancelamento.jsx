
import { Collapsible, CollapsibleItem, Icon, Button } from 'react-materialize';
import { deletarConvite } from '../../../api/convites';
import { useHistory } from 'react-router-dom';


export default function NotificacaoCancelamento({ remetente, titulo, projetoId, descricao, convite, atualizar }) {
    const history = useHistory();

    const recusarConvite = async (e) => {
        e.preventDefault();

        try {
            await deletarConvite(convite);

            return atualizar(true);
        } catch (e) {
            return console.log(e);
        }
    }
    return <>
        <Collapsible accordion>
            <CollapsibleItem
                expanded={false}
                header={`O aluno ${remetente} solicitou o cancelamento do projeto ${titulo}`}
                icon={<Icon>delete_sweep</Icon>}
                node="div">
                <p>
                    <strong>Justificativa: </strong>
                    {descricao}
                </p>

                <div className="row">
                    <div className="col s2">
                        <Button style={{
                            marginRight: '5px',
                            backgroundColor: 'red',
                        }}
                            onClick={() => { }}>Aceitar</Button>
                    </div>
                    <div className="col s2">
                        <Button style={{
                            marginRight: '5px',
                            backgroundColor: 'red',
                        }}
                            onClick={(e) => { recusarConvite(e)}}>Recusar</Button>
                    </div>
                    <div className="col s1" />
                    <Button
                        onClick={() => {
                            history.push('/informacoes/projeto', {
                                projeto: projetoId,
                                tipo: 'cancelamento',
                                descricao: descricao,
                                convite: convite,
                                remetente: remetente
                            })
                        }}
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