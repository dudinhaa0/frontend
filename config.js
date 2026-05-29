// Substitua pelas chaves reais do seu projeto no painel do Supabase
const SUPABASE_URL = "https://qxbhoxcqozyfwscylmvt.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_ZCUu5Xq3rvMWQQ3U3dFq-A_pC0UARHV";

// Esta é a função que o seu produtos.js estava tentando chamar!
async function supabaseFetch(endpoint, options = {}) {
    const url = `${SUPABASE_URL}/rest/v1/${endpoint}`;
    
    const headers = {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        ...options.headers
    };

    return fetch(url, { ...options, headers });
}