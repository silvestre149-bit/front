
import { Collapsible, CollapsibleItem, Icon, Button } from 'react-materialize';


export default function NotificacaoAvaliacao({ remetente, titulo, projetoId }) {
    return <>
        <Collapsible accordion>
            <CollapsibleItem
                expanded={false}
                header={`O aluno ${remetente} convidou você para avaliar o projeto ${titulo}`}
                icon={<Icon>notifications</Icon>}
                node="div">
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