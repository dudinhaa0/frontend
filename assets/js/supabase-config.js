// assets/js/supabase-config.js
const SUPABASE_URL = "SUA_SUPABASE_URL_AQUI"; 
const SUPABASE_ANON_KEY = "SUA_SUPABASE_ANON_KEY_AQUI";

async function supabaseFetch(endpoint, options = {}) {
    const headers = {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        ...options.headers
    };
    return fetch(`${SUPABASE_URL}/rest/v1/${endpoint}`, { ...options, headers });
}

// LÓGICA DO CARRINHO GLOBAL (LocalStorage)
const Carrinho = {
    obter() {
        return JSON.parse(localStorage.getItem('b7store_cart')) || [];
    },
    salvar(dados) {
        localStorage.setItem('b7store_cart', JSON.stringify(dados));
        this.atualizarBadge();
    },
    adicionar(id, nome, preco, imagem, qtde = 1) {
        let itens = this.obter();
        let index = itens.findIndex(item => item.id == id);
        if (index > -1) {
            itens[index].qtde += qtde;
        } else {
            itens.push({ id, nome, preco: parseFloat(preco), imagem, qtde });
        }
        this.salvar(itens);
    },
    remover(id) {
        let itens = this.obter().filter(item => item.id != id);
        this.salvar(itens);
    },
    mudarQtde(id, novaQtde) {
        let itens = this.obter();
        let index = itens.findIndex(item => item.id == id);
        if (index > -1 && novaQtde > 0) {
            itens[index].qtde = novaQtde;
            this.salvar(itens);
        }
    },
    atualizarBadge() {
        // Atualiza a bolinha do carrinho se houver um elemento com classe ou id correspondente
        const badge = document.querySelector('.header-right .btn-icon span, .cart-badge');
        if (badge) {
            const total = this.obter().reduce((sum, item) => sum + item.qtde, 0);
            badge.innerText = total;
            badge.style.display = total > 0 ? 'flex' : 'none';
        }
    }
};

// Executa automaticamente ao carregar para manter a bolinha atualizada
document.addEventListener('DOMContentLoaded', () => Carrinho.atualizarBadge());