async function carregarVitrine() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const termoBusca = urlParams.get('search');
        
        // Constrói query para o Supabase
        let endpoint = 'produtos?select=*&order=id.desc';
        if (termoBusca) {
            endpoint += `&nome=ilike.*${termoBusca}*`;
        }

        const resposta = await supabaseFetch(endpoint);
        if (!resposta.ok) throw new Error('Erro ao buscar dados do servidor.');

        const produtos = await resposta.json();
        const container = document.querySelector('.products-grid');
        const qtdeSpan = document.querySelector('.product-qt span');

        if (!container) return;
        container.innerHTML = '';

        if (qtdeSpan) qtdeSpan.innerText = `${produtos.length} produtos`;

        if (produtos.length === 0) {
            container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #7F7F7F;">Nenhum produto encontrado. 📦</p>';
            return;
        }

        produtos.forEach(produto => {
            const itemHTML = `
                <div class="product-item">
                    <a href="product.html?id=${produto.id}">
                        <div class="product-photo">
                            <img src="${produto.imagem_url || 'assets/images/ui/logo-black.png'}" alt="${produto.nome}" onerror="this.src='assets/images/ui/logo-black.png'">
                        </div>
                        <div class="product-name">${produto.nome}</div>
                        <div class="product-price">R$ ${parseFloat(produto.preco).toFixed(2).replace('.', ',')}</div>
                        <div class="product-info">${produto.categoria}</div>
                    </a>
                    <div class="product-fav" onclick="adicionarAosFavoritos(${produto.id}, this)">
                        <img src="assets/images/ui/heart-3-line.png" alt="Favoritar" />
                    </div>
                </div>
            `;
            container.innerHTML += itemHTML;
        });

    } catch (erro) {
        console.error(erro);
        alert("O erro real é: " + erro.message); 
        
        const container = document.querySelector('.products-grid');
        if (container) container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: red;">Erro ao carregar os produtos.</p>';
    }
} // <--- CHAVE QUE FALTAVA FECHANDO A FUNÇÃO PRINCIPAL

function adicionarAosFavoritos(id, elemento) {
    elemento.classList.toggle('favoritado');
    const img = elemento.querySelector('img');
    if(elemento.classList.contains('favoritado')) {
        img.src = 'assets/images/ui/heart-fill.png'; 
    } else {
        img.src = 'assets/images/ui/heart-line.png';
    }
}

document.addEventListener('DOMContentLoaded', carregarVitrine);