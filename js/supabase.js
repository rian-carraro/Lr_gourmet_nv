// ============================================================
// CONFIGURAÇÃO SUPABASE - LR Doces Gourmet
// ============================================================
// 1. Acesse https://supabase.com e faça login
// 2. Crie um novo projeto chamado "lr-doces"
// 3. Vá em Project Settings > API
// 4. Copie a "Project URL" e a "anon public key"
// 5. Cole abaixo substituindo os valores

const SUPABASE_URL = 'https://SEU_PROJECT_ID.supabase.co';
const SUPABASE_KEY = 'SUA_ANON_KEY_AQUI';

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_KEY);

export default db;
