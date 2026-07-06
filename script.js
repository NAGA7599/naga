/* ══════════════════════════════
   CURSOR
══════════════════════════════ */
const cur = document.getElementById('cursor');
let cx = -100, cy = -100;

document.addEventListener('mousemove', e => {
  cx = e.clientX; cy = e.clientY;
  cur.style.left = cx + 'px';
  cur.style.top  = cy + 'px';
});

document.querySelectorAll('a, button, .pill, .addon-card').forEach(el => {
  el.addEventListener('mouseenter', () => cur.classList.add('hover'));
  el.addEventListener('mouseleave', () => cur.classList.remove('hover'));
});

/* ══════════════════════════════
   PIXEL LOGO MARK
══════════════════════════════ */
(function buildLogo() {
  // 8x8 two-bar shape: 0=off, 1=on(violet)
  const shape = [
    [1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,1],
    [1,0,1,0,0,1,0,1],
    [1,0,1,0,0,1,0,1],
    [1,0,1,0,0,1,0,1],
    [1,0,1,0,0,1,0,1],
    [1,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1],
  ];
  const px = document.getElementById('logoPx');
  shape.forEach(row => {
    row.forEach(v => {
      const s = document.createElement('span');
      if (v === 1) s.classList.add('on');
      px.appendChild(s);
    });
  });

  // random pixel shimmer
  const ons = px.querySelectorAll('.on');
  setInterval(() => {
    const el = ons[Math.floor(Math.random() * ons.length)];
    el.style.opacity = '0.4';
    setTimeout(() => el.style.opacity = '', 300);
  }, 800);
})();

/* ══════════════════════════════
   HERO CANVAS — animated pixel grid
══════════════════════════════ */
(function heroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  const ctx    = canvas.getContext('2d');
  const SZ     = 32; // cell size px
  let cols, rows, cells = [], t = 0;

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    cols  = Math.ceil(canvas.width  / SZ) + 1;
    rows  = Math.ceil(canvas.height / SZ) + 1;
    cells = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        cells.push({ r, c, phase: (r + c) * 0.3 });
      }
    }
  }

  window.addEventListener('resize', resize);
  resize();

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cells.forEach(cell => {
      const v = (Math.sin(t * 0.6 + cell.phase) + 1) / 2;
      // grid line
      ctx.strokeStyle = `rgba(0,0,100,${0.04 + v * 0.22})`;
      ctx.lineWidth = 1;
      ctx.strokeRect(cell.c * SZ, cell.r * SZ, SZ, SZ);
      // dot at corner
      const dotAlpha = 0.04 + v * 0.22;
      ctx.fillStyle = `rgba(0,0,100,${dotAlpha})`;
      ctx.fillRect(cell.c * SZ - 2, cell.r * SZ - 2, 4, 4);
    });
    t += 0.012;
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ══════════════════════════════
   RENDER ADDON CARDS + FILTER PILLS
   (dibaca dari ADDONS di addons-data.js)
══════════════════════════════
   Cara kerja:
   1. Ambil semua kategori unik dari ADDONS -> jadi tombol pill.
   2. Loop setiap addon -> bikin elemen card, isi dari data.
   3. Klik area card -> pindah ke addon.html?id=...
   4. Klik tombol "changelog"/"download" di dalam card ->
      stopPropagation supaya tidak ikut memicu klik card.
══════════════════════════════ */
function renderPills() {
  const bar = document.getElementById('filterBar');
  const cats = [{ id: 'all', label: 'all' }];
  ADDONS.forEach(a => {
    if (!cats.find(c => c.id === a.category)) {
      cats.push({ id: a.category, label: a.categoryLabel });
    }
  });
  bar.innerHTML = cats.map((c, i) =>
    `<button class="pill${i === 0 ? ' active' : ''}" onclick="doFilter('${c.id}',this)">${c.label}</button>`
  ).join('');
}

function renderCards() {
  const grid = document.getElementById('grid');
  grid.innerHTML = ADDONS.map(a => `
    <div class="addon-card" data-category="${a.category}" data-id="${a.id}" onclick="goToAddon('${a.id}')">
      <div class="card-thumb">
        ${a.image
          ? `<img src="${a.image}" alt="${a.name}" class="card-thumb-img">`
          : `<div class="px-art" id="pxa-${a.id}"></div>`
        }
        <div class="card-cat-tag">${a.categoryLabel}</div>
      </div>
      <div class="card-body">
        <div class="card-title">${a.name}</div>
        <div class="card-desc">${a.desc}</div>
        <div class="card-features-wrap">
          <ul class="card-features">${a.features.map(f => `<li>${f}</li>`).join('')}</ul>
        </div>
        <div class="card-footer">
          <div class="card-ver">${a.version} · ${a.mcVersion}</div>
          <div class="card-btns">
            <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation(); openLog('${a.id}')">changelog</button>
            <a href="${a.downloadUrl}" class="btn btn-primary btn-sm" onclick="event.stopPropagation()">download</a>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // gambar pixel-art tiap card, setelah elemen-nya benar-benar ada di DOM
  ADDONS.forEach(a => {
    const el = document.getElementById('pxa-' + a.id);
    if (!el) return;
    a.pxPattern.forEach(row => {
      const rowEl = document.createElement('div');
      rowEl.className = 'row';
      row.forEach(v => {
        const c = document.createElement('div');
        c.className = 'c' + (v === 1 ? ' v' : v === 2 ? ' d' : '');
        rowEl.appendChild(c);
      });
      el.appendChild(rowEl);
    });
  });

  // aktifkan scroll-stagger animation untuk card yang baru dibuat
  document.querySelectorAll('.addon-card').forEach(el => cardObs.observe(el));
}

function goToAddon(id) {
  window.location.href = `addon.html?id=${id}`;
}

/* ══════════════════════════════
   MARQUEE
══════════════════════════════ */
(function buildMarquee() {
  const items = [
    'Deep Creatures', 'Tidal Arsenal', 'Abyssal Biomes',
    'HUD+', 'Apex Predators', 'Sunken Kingdoms',
    'Mob Addons', 'Item Addons', 'World Generation', 'UI Utility',
    'Bedrock Edition', 'Free to Download', 'Oceanst Studio',
  ];
  const track = document.getElementById('mqTrack');
  // duplicate for seamless loop
  [...items, ...items].forEach(item => {
    const s = document.createElement('span');
    s.innerHTML = `<b>✦</b> ${item} `;
    track.appendChild(s);
  });
})();

/* ══════════════════════════════
   SCROLL REVEAL
══════════════════════════════ */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ══════════════════════════════
   STAT UNDERLINE on scroll
══════════════════════════════ */
const statObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-cell').forEach(el => statObs.observe(el));

/* ══════════════════════════════
   COUNT-UP ANIMATION
══════════════════════════════ */
const countObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el  = e.target;
    const end = parseInt(el.dataset.count);
    const sfx = el.dataset.suffix || '';
    if (!end) return;
    let start = 0;
    const dur = 900;
    const step = 16;
    const inc = end / (dur / step);
    const timer = setInterval(() => {
      start = Math.min(start + inc, end);
      el.textContent = Math.floor(start) + sfx;
      if (start >= end) clearInterval(timer);
    }, step);
    countObs.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => countObs.observe(el));

/* ══════════════════════════════
   CARD STAGGER ON SCROLL
══════════════════════════════ */
const cardObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => {
        e.target.classList.add('card-visible');
        e.target.style.animationDelay = (i * 0.07) + 's';
      }, i * 70);
      cardObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

/* (observe dilakukan di dalam renderCards(), setelah card benar-benar dibuat) */

/* ══════════════════════════════
   FILTER
══════════════════════════════ */
function doFilter(cat, btn) {
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.addon-card').forEach(c => {
    const show = cat === 'all' || c.dataset.category === cat;
    c.setAttribute('data-hidden', show ? 'false' : 'true');
    if (show && !c.classList.contains('card-visible')) {
      c.classList.add('card-visible');
    }
  });
}

/* ══════════════════════════════
   CHANGELOG MODAL (data dari ADDONS)
══════════════════════════════ */
function openLog(id) {
  const d = ADDONS.find(a => a.id === id);
  if (!d) return;
  document.getElementById('mTitle').textContent = d.name + ' — changelog';
  document.getElementById('mBody').innerHTML = d.changelog.map(e =>
    `<div class="cl-entry"><div class="cl-ver">${e.ver}</div><ul>${e.notes.map(n=>`<li>${n}</li>`).join('')}</ul></div>`
  ).join('');
  document.getElementById('modal').classList.add('open');
}

function closeModal() { document.getElementById('modal').classList.remove('open'); }
function closeOut(e) { if (e.target.id === 'modal') closeModal(); }

/* Sekarang semua yang dibutuhkan (cardObs, doFilter, openLog) sudah
   ada, baru aman untuk benar-benar menggambar pill + card ke halaman. */
renderPills();
renderCards();
