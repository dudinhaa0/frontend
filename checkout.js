document.addEventListener('DOMContentLoaded', () => {
    renderizarCarrinho();

    // Botão de finalizar compra
    const btnFinalizar = document.querySelector('.checkout .totals button');
    if (btnFinalizar) {
        btnFinalizar.addEventListener('click', () => {
            if (Carrinho.obter().length === 0) {
                alert('O seu carrinho está vazio! 🛒');
                return;
            }
            alert('🎉 Compra finalizada com sucesso! Obrigado por comprar na B7Store.');
            localStorage.removeItem('b7store_cart');
            window.location.href = 'index.html';
        });
    }
});

function renderizarCarrinho() {
    const container = document.querySelector('.checkout .products-area') || document.querySelector('.checkout .products');
    if (!container) return;

    const itens = Carrinho.obter();
    container.innerHTML = '';

    if (itens.length === 0) {
        container.innerHTML = '<p style="padding: 32px; text-align: center; color: #7F7F7F;">O seu carrinho está vazio.</p>';
        atualizarResumoTotais(0);
        return;
    }

    let subtotalGeral = 0;

    itens.forEach(item => {
        subtotalGeral += item.preco * item.qtde;
        const itemHTML = `
            <div class="product" style="display: flex; gap: 16px; padding: 24px; border-bottom: 1px solid #D9D9D9;">
                <div class="product-photo" style="width: 96px; height: 96px; border: 1px solid #D9D9D9; display: flex; justify-content: center; align-items: center;">
                    <img src="${item.imagem || 'assets/images/ui/logo-black.png'}" alt="${item.nome}" style="max-width: 100%; max-height: 100%;">
                </div>
                <div class="product-info" style="flex: 1;">
                    <div class="product-name" style="font-size: 1.4rem; font-weight: bold;">${item.nome}</div>
                    <div class="product-qt" style="display: flex; align-items: center; gap: 8px; margin-top: 14px;">
                        <button onclick="alterarQuantidade(${item.id}, ${item.qtde - 1})" style="cursor:pointer; padding: 4px 10px; border: 1px solid #D9D9D9; background:#FFF;">-</button>
                        <span class="product-qt-text">${item.qtde}</span>
                        <button onclick="alterarQuantidade(${item.id}, ${item.qtde + 1})" style="cursor:pointer; padding: 4px 10px; border: 1px solid #D9D9D9; background:#FFF;">+</button>
                    </div>
                </div>
                <div class="product-info2" style="display: flex; flex-direction: column; align-items: flex-end; justify-content: space-between;">
                    <div class="product-price" style="color: #1D4FFE; font-weight: bold; font-size: 1.8rem;">R$ ${(item.preco * item.qtde).toFixed(2).replace('.', ',')}</div>
                    <button onclick="removerDoCarrinho(${item.id})" style="color: red; background: none; border: none; cursor: pointer; font-size: 1.2rem;">Remover</button>
                </div>
            </div>
        `;
        container.innerHTML += itemHTML;
    });

    atualizarResumoTotais(subtotalGeral);
}

function alterarQuantidade(id, novaQtde) {
    if (novaQtde <= 0) {
        Carrinho.remover(id);
    } else {
        Carrinho.mudarQtde(id, novaQtde);
    }
    renderizarCarrinho();
}

function removerDoCarrinho(id) {
    Carrinho.remover(id);
    renderizarCarrinho();
}

function atualizarResumoTotais(subtotal) {
    const subtotalTxt = document.querySelector('.totals .total-item:nth-child(1) span:last-child');
    const totalTxt = document.querySelector('.totals .total-item.grand-total span:last-child') || document.querySelector('.totals .total-item:last-child span:last-child');

    if (subtotalTxt) subtotalTxt.innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    if (totalTxt) totalTxt.innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
}