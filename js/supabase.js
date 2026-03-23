// ============================================================
// CONFIGURAÇÃO SUPABASE - LR Doces Gourmet
// ============================================================
// 1. Acesse https://supabase.com e faça login
// 2. Crie um novo projeto chamado "lr-doces"
// 3. Vá em Project Settings > API
// 4. Copie a "Project URL" e a "anon public key"
// 5. Cole abaixo substituindo os valores

const SUPABASE_URL = 'https://ngvxhpcdonxriwmjahtt.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ndnhocGNkb254cml3bWphaHR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyODg4MjIsImV4cCI6MjA4OTg2NDgyMn0.CnTu8U4muYo84XD26_mK5rfJPiEAZ82ETSQ0uX5vRBs';

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_KEY);

export default db;
