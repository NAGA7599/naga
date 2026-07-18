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
        ${(addon.image || addon.image)
          ? `<img src="${addon.image || addon.image}" alt="${addon.name}" class="detail-thumb-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">`
          : ''
        }
        <div class="px-art" id="detailPxArt" style="${(addon.thumbnail || addon.image) ? 'display:none;' : ''}"></div>
      </div>
      <div>
        <h1 class="detail-title">${addon.name}</h1>
        <div class="detail-meta">${addon.categoryLabel} · ${addon.version} · ${addon.mcVersion}</div>
      </div>
    </div>

    <p class="detail-desc">${addon.longDesc}</p>

    <div class="detail-section-title">features</div>
    <ul class="card-features">${addon.features.map(f => `<li>${f}</li>`).join('')}</ul>


    

    ${addon.gallery && addon.gallery.length > 0 ? `
      <div class="detail-section-title">gallery</div>
      <div class="gallery-slider" id="gallerySlider">
        <div class="gallery-viewer">
          <div class="gallery-track" id="galleryTrack"></div>
          <button class="gallery-nav prev" id="galleryPrev" aria-label="Foto sebelumnya">‹</button>
          <button class="gallery-nav next" id="galleryNext" aria-label="Foto berikutnya">›</button>
          <div class="gallery-counter"><span id="galleryNow">1</span>/<span id="galleryTotal">${addon.gallery.length}</span></div>
        </div>
        <div class="gallery-thumbs" id="galleryThumbs"></div>
      </div>
    ` : ''}

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
  if (pxArtEl) renderPxArt(pxArtEl, addon.pxPattern); // selalu diisi, siap tampil kalau foto gagal load

  // tutorial & gallery: 1 foto tampil, sisanya bisa di-slide (swipe/drag/panah/thumbnail)
  if (addon.tutorial && addon.tutorial.length > 0) initGallerySlider(addon.tutorial, addon.name, 'tutorial');
  if (addon.gallery && addon.gallery.length > 0) initGallerySlider(addon.gallery, addon.name, 'gallery');

  // update judul tab browser sesuai addon yang dibuka
  document.title = `${addon.name} — NAGA Studio`;
}

/* ── slider galeri/tutorial: satu foto tampil, sisanya di filmstrip bawah ──
   prefix: 'gallery' atau 'tutorial', supaya id elemen tidak bentrok
   ketika kedua slider tampil sekaligus di satu halaman ── */
function initGallerySlider(images, altBase, prefix) {
  prefix = prefix || 'gallery';
  const root = document.getElementById(`${prefix}Slider`);
  if (!root) return;

  const viewer = root.querySelector('.gallery-viewer');
  const track = document.getElementById(`${prefix}Track`);
  const thumbs = document.getElementById(`${prefix}Thumbs`);
  const nowEl = document.getElementById(`${prefix}Now`);
  let current = 0;

  images.forEach((src, i) => {
    const slide = document.createElement('div');
    slide.className = 'gallery-slide';
    slide.innerHTML = `<img src="${src}" alt="${altBase || 'Screenshot'} ${i + 1}" loading="${i === 0 ? 'eager' : 'lazy'}">`;
    track.appendChild(slide);

    const th = document.createElement('div');
    th.className = 'gallery-thumb';
    th.innerHTML = `<img src="${src}" alt="">`;
    th.addEventListener('click', () => goTo(i));
    thumbs.appendChild(th);
  });

  function render() {
    track.style.transform = `translateX(-${current * 100}%)`;
    nowEl.textContent = current + 1;
    [...thumbs.children].forEach((t, i) => {
      t.classList.toggle('active', i === current);
      if (i === current) t.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });
  }

  function goTo(i) {
    current = (i + images.length) % images.length;
    render();
  }

  root.querySelector(`#${prefix}Prev`).addEventListener('click', () => goTo(current - 1));
  root.querySelector(`#${prefix}Next`).addEventListener('click', () => goTo(current + 1));

  document.addEventListener('keydown', e => {
    if (document.body.contains(root)) {
      if (e.key === 'ArrowLeft') goTo(current - 1);
      if (e.key === 'ArrowRight') goTo(current + 1);
    }
  });

  let startX = 0, dragging = false, deltaX = 0;
  viewer.addEventListener('pointerdown', e => {
    dragging = true;
    startX = e.clientX;
    track.style.transition = 'none';
  });
  viewer.addEventListener('pointermove', e => {
    if (!dragging) return;
    deltaX = e.clientX - startX;
    const pct = (deltaX / viewer.clientWidth) * 100;
    track.style.transform = `translateX(calc(-${current * 100}% + ${pct}%))`;
  });
  window.addEventListener('pointerup', () => {
    if (!dragging) return;
    dragging = false;
    track.style.transition = '';
    if (Math.abs(deltaX) > viewer.clientWidth * 0.18) {
      goTo(current + (deltaX < 0 ? 1 : -1));
    } else {
      render();
    }
    deltaX = 0;
  });
  viewer.addEventListener('pointerleave', () => {
    if (dragging) window.dispatchEvent(new Event('pointerup'));
  });

  render();
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
  shape.forEach(row => row.forEach(v => {
    const s = document.createElement('span');
    if (v === 1) s.classList.add('on');
    px.appendChild(s);
  }));
})();

renderAddonDetail();