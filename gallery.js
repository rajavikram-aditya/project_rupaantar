// ── GALLERY FILTER ──
const filterBtns = document.querySelectorAll('.filter-btn');
const items      = document.querySelectorAll('.gallery-item');
const noResults  = document.getElementById('noResults');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    let visible = 0;

    items.forEach((item, i) => {
      const match = filter === 'all' || item.dataset.category === filter;
      if (match) {
        item.classList.remove('hidden');
        item.style.animationDelay = `${visible * 0.06}s`;
        visible++;
      } else {
        item.classList.add('hidden');
      }
    });

    noResults.style.display = visible === 0 ? 'block' : 'none';
  });
});

// ── LIGHTBOX ──
const lightbox        = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightboxContent');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose   = document.getElementById('lightboxClose');

items.forEach(item => {
  item.addEventListener('click', () => {
    const img     = item.querySelector('.gallery-img').cloneNode(true);
    const caption = item.querySelector('.gallery-overlay p')?.textContent || '';

    lightboxContent.innerHTML = '';
    lightboxContent.appendChild(img);
    lightboxContent.style.background = item.querySelector('.gallery-img').style.background;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});
