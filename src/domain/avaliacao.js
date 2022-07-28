
export class AvaliacaoTotal {

    constructor(respostasComQuestao, dimensoes) {
        this.dimensoes = this.agruparRespostasNaDimensao(dimensoes, respostasComQuestao);
        this.avaliacao_em_porcentagem = this.calcularAvaliacao()
    }

    agruparRespostasNaDimensao(dimensoes, respostasComQuestao) {
        let questao = undefined;

        for (const dimensao of dimensoes) {
            dimensao.questoes = [];
            for (const respostaComQuestao of respostasComQuestao) {
                const { question, ...resposta } = respostaComQuestao;
                questao = question;
                questao.resposta = resposta;

                if (questao.dimensionId === dimensao.id) {
                    dimensao.questoes.push(questao)
                }
            }
        }

        return dimensoes;
    }

    calcularNotaIdeal() {
        let nota_ideal_questao = 0,
            nota_ideal_maxima_por_dimensao = 0;

        /* questão */
        for (const dimensao of this.dimensoes) {
            for (const questao of dimensao.questoes) {
                nota_ideal_questao = questao.max_value * questao.score;
                questao.nota_ideal_questao = nota_ideal_questao;

                nota_ideal_maxima_por_dimensao += nota_ideal_questao;
            }
            dimensao.nota_ideal_maxima_por_dimensao = nota_ideal_maxima_por_dimensao;
            nota_ideal_maxima_por_dimensao = 0;
        }
    }

    calcularSomaIdeal() {
        let soma_ideal = 0;
        for (const dimensao of this.dimensoes) {
            soma_ideal += dimensao.nota_ideal_maxima_por_dimensao;
        }
        return soma_ideal;
    }

    calcularPontuacaoDimensao() {
        const porcentagem = 100;
        let pontuacao_por_dimensao = 0, nota_da_dimensao = 0;

        for (const dimensao of this.dimensoes) {
            for (const questao of dimensao.questoes) {
                pontuacao_por_dimensao += questao.resposta.total;
            }

            dimensao.pontuacao_por_dimensao = pontuacao_por_dimensao;
            nota_da_dimensao = porcentagem * (pontuacao_por_dimensao / dimensao.nota_ideal_maxima_por_dimensao)
            dimensao.nota_da_dimensao_em_porcentagem = Math.round(nota_da_dimensao)

            pontuacao_por_dimensao = 0;
        }
    }

    calcularPontuacaoTotal() {
        const porcentagem = 100;
        const soma_ideal = this.calcularSomaIdeal(this.dimensoes);

        let soma_dos_produtos = 0, avaliacao_em_porcentagem = 0;

        for (const dimensao of this.dimensoes) {
            soma_dos_produtos += dimensao.pontuacao_por_dimensao;
        }

        avaliacao_em_porcentagem = porcentagem * (soma_dos_produtos / soma_ideal);
        return Math.round(avaliacao_em_porcentagem);

    }

    calcularAvaliacao() {
        this.calcularNotaIdeal();
        this.calcularPontuacaoDimensao();
        return this.calcularPontuacaoTotal();
    }

}