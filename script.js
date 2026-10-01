// Render grid cover lagu berdasarkan data di songs/songs-data.js

function applyCover(el, cover) {
  // Kalau "cover" berupa path/url gambar, pakai background-image.
  // Kalau masih gradasi (placeholder), pakai background biasa.
  if (cover.startsWith('linear-gradient')) {
    el.style.background = cover;
  } else {
    el.style.backgroundImage = `url('${cover}')`;
  }
}

function renderSections(sections) {
  const rowsEl = document.getElementById('rows');

  sections.forEach((section, si) => {
    const row = document.createElement('div');
    row.className = 'row';

    const head = document.createElement('div');
    head.className = 'row-head';
    head.innerHTML = `
      <h2>${section.title}</h2>
      <div class="row-nav">
        <button class="nav-btn" data-dir="-1" data-row="${si}">&#8592;</button>
        <button class="nav-btn" data-dir="1" data-row="${si}">&#8594;</button>
      </div>`;

    const track = document.createElement('div');
    track.className = 'track';
    track.id = `track-${si}`;

    section.items.forEach((it, i) => {
      const card = document.createElement('button');
      card.className = 'card';
      card.type = 'button';
      card.setAttribute('aria-label', `Putar ${it.t}`);
      card.innerHTML = `
        <div class="cover">
          <div class="art"></div>
          ${it.badge ? `<span class="badge">${it.badge}</span>` : ''}
          <div class="play-btn">
            <svg viewBox="0 0 16 16" fill="currentColor"><path d="M3 2l11 6-11 6V2z"/></svg>
          </div>
        </div>
        <div class="meta">
          <p class="title">${it.t}</p>
          <p class="subtitle">${it.sub}</p>
        </div>`;

      applyCover(card.querySelector('.art'), it.cover);

      card.addEventListener('click', () => {
        // Integrasi: trigger event agar Bar Pemutar Musik (bagian Rasya)
        // bisa menangkap lagu yang dipilih.
        window.dispatchEvent(new CustomEvent('song:select', {
          detail: { title: it.t, sub: it.sub, cover: it.cover, section: section.title, index: i }
        }));
      });

      track.appendChild(card);
    });

    row.appendChild(head);
    row.appendChild(track);
    rowsEl.appendChild(row);
  });

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const track = document.getElementById(`track-${btn.dataset.row}`);
      track.scrollBy({ left: 200 * Number(btn.dataset.dir), behavior: 'smooth' });
    });
  });
}

renderSections(sections);
