/* ══════════════════════════════════════════════
   ADDON DETAIL PAGE LOGIC
   Halaman ini cuma SATU file (addon.html) yang dipakai
   ulang untuk semua addon. Bedanya cuma parameter di URL:
     addon.html?id=deep-creatures
     addon.html?id=tidal-arsenal
   dst. Fungsi getAddonId() membaca id itu dari URL,
   lalu dicari datanya di ADDONS (addons-data.js).
══════════════════════════════════════════════ */

function getAddonId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function renderPxArt(container, pattern) {
  pattern.forEach(row => {
    const rowEl = document.createElement('div');
    rowEl.className = 'row';
    row.forEach(v => {
      const c = document.createElement('div');
      c.className = 'c' + (v === 1 ? ' v' : v === 2 ? ' d' : '');
      rowEl.appendChild(c);
    });
    container.appendChild(rowEl);
  });
}

function renderNotFound(wrap) {
  wrap.innerHTML = `
    <div class="detail-not-found">
      <p>Addon tidak ditemukan.</p>
      <a href="index.html#addons" class="btn btn-ghost" style="margin-top:1rem; display:inline-block;">← kembali ke daftar addon</a>
    </div>
  `;
}

function renderAddonDetail() {
  const wrap = document.getElementById('detailWrap');
  const id = getAddonId();
  const addon = ADDONS.find(a => a.id === id);

  // kalau id kosong / tidak cocok data manapun -> tampilkan halaman "tidak ditemukan"
  if (!addon) {
    renderNotFound(wrap);
    return;
  }

  wrap.innerHTML = `
    <a href="index.html#addons" class="detail-back">← back to addons</a>

    <div class="detail-head">
      <div class="detail-thumb">
        ${addon.image
          ? `<img src="${addon.image}" alt="${addon.name}" class="detail-thumb-img">`
          : `<div class="px-art" id="detailPxArt"></div>`
        }
      </div>
      <div>
        <h1 class="detail-title">${addon.name}</h1>
        <div class="detail-meta">${addon.categoryLabel} · ${addon.version} · ${addon.mcVersion}</div>
      </div>
    </div>

    <p class="detail-desc">${addon.longDesc}</p>

    <div class="detail-section-title">features</div>
    <ul class="card-features">${addon.features.map(f => `<li>${f}</li>`).join('')}</ul>

    <div class="detail-actions">
      <a href="${addon.downloadUrl}" class="btn btn-primary">download</a>
      <a href="#changelog" class="btn btn-ghost">view changelog</a>
    </div>

    <div class="detail-section-title" id="changelog">changelog</div>
    ${addon.changelog.map(e => `
      <div class="cl-entry">
        <div class="cl-ver">${e.ver}</div>
        <ul>${e.notes.map(n => `<li>${n}</li>`).join('')}</ul>
      </div>
    `).join('')}
  `;

  const pxArtEl = document.getElementById('detailPxArt');
  if (pxArtEl) renderPxArt(pxArtEl, addon.pxPattern);

  // update judul tab browser sesuai addon yang dibuka
  document.title = `${addon.name} — Oceanst`;
}

/* ── cursor + logo, disalin dari script.js supaya nav tetap konsisten ── */
(function cursorAndLogo() {
  const cur = document.getElementById('cursor');
  document.addEventListener('mousemove', e => {
    cur.style.left = e.clientX + 'px';
    cur.style.top  = e.clientY + 'px';
  });
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cur.classList.add('hover'));
    el.addEventListener('mouseleave', () => cur.classList.remove('hover'));
  });

  const shape = [
    [0,0,0,0,0,0,0,0],
    [0,1,1,0,0,1,1,0],
    [0,1,1,0,0,1,1,0],
    [0,1,1,0,0,1,1,0],
    [0,1,1,0,0,1,1,0],
    [0,1,1,0,0,1,1,0],
    [0,1,1,0,0,1,1,0],
    [0,0,0,0,0,0,0,0],
  ];
  const px = document.getElementById('logoPx');
  shape.forEach(row => row.forEach(v => {
    const s = document.createElement('span');
    if (v === 1) s.classList.add('on');
    px.appendChild(s);
  }));
})();

renderAddonDetail();
