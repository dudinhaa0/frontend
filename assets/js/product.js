document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    // Comportamento do colapso da descrição
    let descButton = document.querySelector('.desc-header .btn-icon');
    let descBody = document.querySelector('.desc-body');
    if (descButton && descBody) {
        descButton.addEventListener('click', () => {
            descBody.style.display = descBody.style.display === 'none' ? 'block' : 'none';
        });
    }

    if (!id) return;

    try {
        const resposta = await supabaseFetch(`produtos?id=eq.${id}&select=*`);
        const dados = await resposta.json();
        if (!dados || dados.length === 0) return;

        const produto = dados[0];

        // Atualiza a Interface
        document.querySelector('.product .photo img').src = produto.imagem_url || 'assets/images/ui/logo-black.png';
        document.querySelector('.product .info .id').innerText = `CÓD. PRODUTO: ${produto.id}`;
        document.querySelector('.product .info .name').innerText = produto.nome;
        document.querySelector('.product .info .price').innerText = `R$ ${parseFloat(produto.preco).toFixed(2).replace('.', ',')}`;
        document.querySelector('.desc-body .desc-text').innerText = produto.descricao || 'Sem descrição.';

        // CONFIGURAÇÃO DO BOTÃO COMPRAR (Adicionar ao carrinho)
        const botaoComprar = document.querySelector('.product .info .buttons button, .btn-buy');
        if (botaoComprar) {
            botaoComprar.addEventListener('click', () => {
                Carrinho.adicionar(produto.id, produto.nome, produto.preco, produto.imagem_url);
                alert('🛒 Produto adicionado ao carrinho!');
                window.location.href = 'checkout.html';
            });
        }

    } catch (erro) {
        console.error('Erro ao renderizar produto:', erro);
    }
});