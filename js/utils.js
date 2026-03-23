// ============================================================
// LR Doces Gourmet - Funções Utilitárias Globais
// ============================================================

// Formata valor monetário
function formatMoney(value) {
  return 'R$ ' + parseFloat(value || 0).toFixed(2).replace('.', ',');
}

// Formata data
function formatDate(dateStr) {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('pt-BR');
}

// Formata hora
function formatTime(timeStr) {
  if (!timeStr) return '-';
  return timeStr.slice(0, 5);
}

// Toast notification
function showToast(message, type = 'success') {
  const colors = {
    success: '#28a745',
    error: '#dc3545',
    warning: '#ffc107',
    info: '#00a5c2'
  };
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };
  const el = document.createElement('div');
  el.className = 'lr-toast';
  el.innerHTML = `
    <div style="background:${colors[type]};color:white;padding:14px 20px;border-radius:12px;
                box-shadow:0 4px 20px rgba(0,0,0,0.2);display:flex;align-items:center;gap:10px;
                font-family:'Nunito',sans-serif;font-weight:600;font-size:0.95rem;animation:slideIn 0.3s ease">
      <span style="font-size:1.1rem">${icons[type]}</span>
      <span>${message}</span>
    </div>
  `;
  document.body.appendChild(el);
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transition = 'opacity 0.3s';
    setTimeout(() => el.remove(), 300);
  }, 3000);
}

// Loading state
function setLoading(container, show) {
  if (show) {
    container.innerHTML = `
      <div class="lr-loading">
        <div class="lr-spinner"></div>
        <span>Carregando...</span>
      </div>`;
  }
}

// Dias da semana
const DIAS = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

// Verifica se loja está aberta agora
async function verificarStatusLoja() {
  try {
    const { data: status } = await db.from('loja_status').select('*').single();
    if (!status?.aberta) return { aberta: false, mensagem: status?.mensagem_fechamento };

    const agora = new Date();
    const diaSemana = agora.getDay();
    const horaAtual = agora.getHours() * 60 + agora.getMinutes();

    const { data: horario } = await db.from('horarios')
      .select('*').eq('dia_semana', diaSemana).single();

    if (!horario?.aberto) return { aberta: false, mensagem: 'Fechado hoje' };

    const [hAb, mAb] = horario.hora_abertura.split(':').map(Number);
    const [hFe, mFe] = horario.hora_fechamento.split(':').map(Number);
    const abertura = hAb * 60 + mAb;
    const fechamento = hFe * 60 + mFe;

    if (horaAtual >= abertura && horaAtual < fechamento) {
      return { aberta: true, mensagem: `Aberto até ${formatTime(horario.hora_fechamento)}` };
    }
    return { aberta: false, mensagem: `Abrimos às ${formatTime(horario.hora_abertura)}` };
  } catch {
    return { aberta: true, mensagem: '' };
  }
}

// Renderiza badge de status
async function renderStatusBadge(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const status = await verificarStatusLoja();
  container.innerHTML = `
    <span class="loja-status-badge ${status.aberta ? 'aberta' : 'fechada'}">
      <span class="dot"></span>
      ${status.aberta ? 'Aberta' : 'Fechada'} · ${status.mensagem}
    </span>`;
}

// Debounce
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Estilo slideIn para toast
const style = document.createElement('style');
style.textContent = `@keyframes slideIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}`;
document.head.appendChild(style);
