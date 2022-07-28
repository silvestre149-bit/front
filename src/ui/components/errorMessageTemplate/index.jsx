export default function MessageTemplate({ mensagem }) {
    return <>
        {mensagem.status === 'falha' ?
            <div className="collection" >
                <a href="#!" class="collection-item" style={{ backgroundColor: '#d50000', color: 'white' }}> <i class="material-icons" style={{ verticalAlign: 'middle' }}>error</i> {mensagem.descricao} </a>
            </div> :
            <div></div>
        }

        {mensagem.status === 'sucesso' ?

            <div className="collection" >
                <a href="#!" class="collection-item" style={{ display: "flex", backgroundColor: '#3EC70B', color: 'white' }}> <i class="material-icons" style={{ verticalAlign: 'middle' }}>error</i> {mensagem.descricao}</a>
            </div> :
            <div></div>
        }
    </>
}
