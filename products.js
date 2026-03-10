// ── PRODUCT FILTER ──
const filterBtns = document.querySelectorAll('.filter-btn');
const cards      = document.querySelectorAll('.product-card');
const noResults  = document.getElementById('noResults');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    let visible = 0;

    cards.forEach((card, i) => {
      const match = filter === 'all' || card.dataset.category === filter;
      if (match) {
        card.classList.remove('hidden');
        card.style.animationDelay = `${visible * 0.07}s`;
        visible++;
      } else {
        card.classList.add('hidden');
      }
    });

    noResults.style.display = visible === 0 ? 'block' : 'none';
  });
});
