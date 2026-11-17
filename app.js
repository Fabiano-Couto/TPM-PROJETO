const statusNode = document.getElementById('copy-status');

async function copiarTexto(texto) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    await navigator.clipboard.writeText(texto);
    return;
  }
  const area = document.createElement('textarea');
  area.value = texto;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  document.execCommand('copy');
  document.body.removeChild(area);
}

for (const botao of document.querySelectorAll('.copy-btn')) {
  const textoOriginal = botao.querySelector('.copy-btn-text')?.textContent ?? 'Copiar';
  let timer = 0;

  botao.addEventListener('click', async () => {
    const valor = botao.getAttribute('data-copy');
    const nome = botao.getAttribute('data-label') ?? 'conteúdo';
    if (!valor) return;

    try {
      await copiarTexto(valor);
      const labelEl = botao.querySelector('.copy-btn-text');
      if (labelEl) labelEl.textContent = 'Copiado';
      botao.setAttribute('data-copied', 'true');
      if (statusNode) statusNode.textContent = `${nome} copiado para a área de transferência.`;

      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (labelEl) labelEl.textContent = textoOriginal;
        botao.removeAttribute('data-copied');
      }, 2000);
    } catch {
      if (statusNode) statusNode.textContent = `Não foi possível copiar ${nome}. Selecione o texto manualmente.`;
    }
  });
}
