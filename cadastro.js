// Configure suas chaves do Supabase
const SUPABASE_URL = "https://qxbhoxcqozyfwscylmvt.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_ZCUu5Xq3rvMWQQ3U3dFq-A_pC0UARHV";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById('cadastroForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // 1. Cria a conta na área de Autenticação (para funcionar o Login)
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email,
        password: password,
    });

    if (authError) {
        console.error('Erro na autenticação:', authError.message);
        alert('Erro ao criar conta: ' + authError.message);
        return; // Para o código aqui se der erro
    }

    // 2. Se a conta foi criada com sucesso, envia os dados para a sua tabela "usuarios"
    const { data: dbData, error: dbError } = await supabase
        .from('usuarios') // <--- Coloque aqui o nome exato da tabela no seu Supabase
        .insert([
            { email: email } // Coluna : Valor que veio do formulário
        ]);

    if (dbError) {
        console.error('Erro ao salvar na tabela usuarios:', dbError.message);
        alert('Conta autenticada, mas houve um erro ao salvar os dados na tabela.');
    } else {
        alert('Conta criada e dados salvos com sucesso!');
        window.location.href = 'login.html'; 
    }
});