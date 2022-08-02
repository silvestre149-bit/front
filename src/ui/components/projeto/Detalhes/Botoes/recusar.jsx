import { useHistory } from "react-router-dom";
import { removerAvaliadorProjeto, removerSuplenteProjeto, removerOrientadorProjeto } from "../../../../../api/projeto";
import { deletarConvite } from "../../../../../api/convites";
import { Button } from "react-materialize";

export default function RecusarConvite({ projeto, tipo, convite }) {
    const history = useHistory();
    const recusarConvite = async (e) => {
        e.preventDefault();

        try {
            if (tipo === 'orientador') await removerOrientadorProjeto(projeto);
            if (tipo === 'avaliador') await removerAvaliadorProjeto(projeto);
            if (tipo === 'suplente') await removerSuplenteProjeto(projeto);
            await deletarConvite(convite);

            return history.push('/notificacoes');
        } catch (e) {
            return console.log(e);
        }
    }
    return <>
        <Button style={{
            backgroundColor: 'red',
        }}
            onClick={(e) => { recusarConvite(e) }}>Recusar</Button>
    </>
}