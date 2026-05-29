// 1. Configure suas chaves do Supabase aqui (Substitua com os dados do seu projeto)
const SUPABASE_URL = "https://SEU_PROJETO.supabase.co";
const SUPABASE_ANON_KEY = "SUA_CHAVE_ANON_AQUI";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Impede o recarregamento da página

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorBox = document.getElementById('error-box');

    // 2. Tenta fazer o login real usando a autenticação do Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        // Se der erro (senha errada, usuário não existe), mostra o alerta vermelho
        console.error('Erro ao logar:', error.message);
        errorBox.classList.remove('hidden');
    } else {
        // Se der certo, esconde o erro, salva o token e redireciona
        errorBox.classList.add('hidden');
        localStorage.setItem('usuarioLogado', 'true');
        
        alert('Login efetuado com sucesso!');
        window.location.href = 'index.html'; 
    }
});