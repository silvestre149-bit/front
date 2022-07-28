
import { Collapsible, CollapsibleItem, Icon, Button } from 'react-materialize';


export default function NotificacaoCancelamento({ remetente, titulo, projetoId, descricao }) {
    return <>
        <Collapsible accordion>
            <CollapsibleItem
                expanded={false}
                header={`O aluno ${remetente} solicitou o cancelamento do projeto ${titulo}`}
                icon={<Icon>delete_sweep</Icon>}
                node="div">
                    <p>
                        <strong>Justificativa:</strong>
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
                        onClick={() => { }}>Recusar</Button>
                    </div>
                    <div className="col s5" />
                    <Button
                        href={`/projeto/${projetoId}`}
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