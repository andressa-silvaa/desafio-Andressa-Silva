import { tabela } from './tabela.js';
class CaixaDaLanchonete {
    calcularValorDaCompra(metodoDePagamento, itens) {
        const itensCardapio = ['cafe', 'suco', 'sanduiche', 'salgado', 'combo1', 'combo2', 'chantily', 'queijo'];

        let valorTotal = 0;
        let partesItem = [];
        let nome = [];
        let quantidade = [];


        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }


        for (let item of itens) {
            partesItem = item.split(',');
            nome.push(partesItem[0].trim().toLowerCase());
            quantidade.push(parseInt(partesItem[1]));
            if (!itensCardapio.includes(partesItem[0]) || !isNaN(Number(partesItem[0]))) {
                return "Item inválido!";
            }
            if (isNaN(Number(partesItem[1])) || Number(partesItem[1]) <= 0) {
                return "Quantidade inválida!";
            }
        }

        for (let item of nome) {
            if (item === 'chantily') {
                const temPrincipal = nome.find((principal) => {
                    return principal === 'cafe';
                })
                if (!temPrincipal) {
                    return "Item extra não pode ser pedido sem o principal";
                }

            }
            if (item === 'queijo') {
                const temPrincipal = nome.find((principal) => {
                    return principal === 'sanduiche';
                })
                if (!temPrincipal) {
                    return "Item extra não pode ser pedido sem o principal";
                }
            }

        }


        for (let i = 0; i < nome.length; i++) {
            const itemEncontrado = tabela.find((item) => item.codigo === nome[i]);
            if (itemEncontrado) {
                valorTotal += parseFloat(itemEncontrado.valor.replace('R$', '').replace(',', '.')) * quantidade[i];
            } else {
                return "Item inválido!";
            }
        }
        switch (metodoDePagamento) {
            case 'credito':
                valorTotal = valorTotal + (valorTotal * 0.03);
                return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
            case 'debito':
                return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
            case 'dinheiro':
                valorTotal = valorTotal - (valorTotal * 0.05);
                return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
            default:
                return "Forma de pagamento inválida!";
        }

    }

}




export { CaixaDaLanchonete };
