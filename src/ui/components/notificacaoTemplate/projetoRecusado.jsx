
import { Collapsible, CollapsibleItem, Icon, Button } from 'react-materialize';
import { deletarConvite } from '../../../api/convites';


export default function NotificacaoProjetoRecusado({ remetente, titulo, atualizar, convite }) {
    const marcarComoLido = async () => {
        try {
            await deletarConvite(convite);
            return atualizar();
        } catch(e) {
            return console.log(e);
        }
    };

    return <>
        <Collapsible accordion>
            <CollapsibleItem
                expanded={false}
                header={`O professor ${remetente} recusou seu pedido para orientar o projeto ${titulo}`}
                icon={<Icon>sentiment_very_dissatisfied</Icon>}
                node="div">
                    Convite outro professor para orientar o projeto!
                <div className="row">
                    <div className="col s2">
                        <Button style={{
                            marginRight: '5px',
                            backgroundColor: 'red',
                        }}
                        onClick={(e) => {marcarComoLido()}}>Excluir</Button>
                    </div>
                </div>
            </CollapsibleItem>
        </Collapsible>
    </>
}