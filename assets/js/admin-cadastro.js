// assets/js/admin-cadastro.js

// CONFIGURAÇÃO DO SEU SUPABASE (Preencha com os seus dados do projeto)
const SUPABASE_URL = "https://qxbhoxcqozyfwscylmvt.supabase.co"; 
const SUPABASE_ANON_KEY = "sb_publishable_ZCUu5Xq3rvMWQQ3U3dFq-A_pC0UARHV";

document.addEventListener('DOMContentLoaded', () => {
    const formElement = document.querySelector('form');
    const btnSubmit = document.getElementById('btnSubmit');

    if (!formElement) return;

    formElement.addEventListener('submit', async (evento) => {
        evento.preventDefault(); 

        if (btnSubmit) {
            btnSubmit.disabled = true;
            btnSubmit.innerText = 'A guardar produto... ⏳';
        }

        // Captura os dados digitados nos campos do HTML
        const nome = document.getElementById('nome').value;
        const precoRaw = document.getElementById('preco').value; 
        const categoria = document.getElementById('categoria').value;
        const imagem_url = document.getElementById('imagem_url').value;
        const descricao = document.getElementById('descricao').value;

        // --- TRATAMENTO DO PREÇO ---
        // Remove "R$", espaços vazios e troca vírgula por ponto decimal
        let precoLimpo = precoRaw.replace('R$', '').replace(/\s/g, '').replace(',', '.');
        let precoFinal = parseFloat(precoLimpo);

        if (isNaN(precoFinal)) {
            alert('❌ Por favor, insira um preço válido (ex: 89,90)');
            if (btnSubmit) {
                btnSubmit.disabled = false;
                btnSubmit.innerText = 'Salvar Produto no Supabase';
            }
            return;
        }

        try {
            // Faz a requisição POST diretamente para a tabela 'produtos' do Supabase
            const resposta = await fetch(`${SUPABASE_URL}/rest/v1/produtos`, {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=minimal' 
                },
                body: JSON.stringify({
                    nome: nome,
                    preco: precoFinal, 
                    categoria: categoria,
                    imagem_url: imagem_url || 'assets/images/ui/logo-black.png', // Fallback caso não insira imagem
                    descricao: descricao
                })
            });

            if (resposta.ok) {
                alert(`✅ Sucesso! O produto "${nome}" foi salvo no Supabase.`);
                formElement.reset(); 
                window.location.href = 'produtos.html'; // Redireciona de volta para a vitrine
            } else {
                const erroServidor = await resposta.json();
                throw new Error(erroServidor.message || 'Erro ao salvar no Supabase.');
            }

        } catch (erro) {
            console.error('💥 Erro no cadastro:', erro);
            alert(`❌ Erro do Banco: ${erro.message}`);
        } finally {
            if (btnSubmit) {
                btnSubmit.disabled = false;
                btnSubmit.innerText = 'Salvar Produto no Supabase';
            }
        }
    });
});