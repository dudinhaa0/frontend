// assets/js/login.js

// 1. Configurações do seu Supabase (Mude pelos dados obtidos no painel do seu projeto)
const SUPABASE_URL = "https://qxbhoxcqozyfwscylmvt.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_ZCUu5Xq3rvMWQQ3U3dFq-A_pC0UARHV";

// Inicializa o cliente global do Supabase
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Captura os elementos necessários da DOM do HTML
const loginForm = document.getElementById('loginForm');
const errorBox = document.getElementById('error-box');

// Executa a lógica assim que o formulário tenta ser enviado
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede o recarregamento automático da página

    // Limpa erros visuais anteriores e altera o texto do botão para feedback visual
    errorBox.classList.add('hidden');
    const submitBtn = loginForm.querySelector('.btn-login');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = "Entrando...";
    submitBtn.disabled = true;

    // Pega os valores atualizados dos inputs de e-mail e senha
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Envia a requisição de login para o Supabase Auth
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        // Caso as credenciais estejam erradas, joga para o bloco 'catch'
        if (error) throw error;

        // Se o usuário foi autenticado com sucesso, redireciona para a home
        if (data && data.user) {
            window.location.href = 'index.html';
        }

    } catch (err) {
        // Trata os erros e exibe na caixa de erro do formulário
        console.error("Erro na autenticação:", err.message);
        
        // Exibe uma mensagem amigável no HTML
        errorBox.textContent = "E-mail ou senha incorretos. Por favor, tente novamente.";
        errorBox.classList.remove('hidden');

        // Restaura o botão para o estado inicial
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }
});