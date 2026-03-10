// ── BLOG SEARCH ──
const searchInput   = document.getElementById('searchInput');
const searchClear   = document.getElementById('searchClear');
const searchCount   = document.getElementById('searchCount');
const blogCards     = document.querySelectorAll('.blog-card');
const featuredCard  = document.querySelector('.featured-card');
const featuredSection = document.getElementById('featuredSection');
const noResults     = document.getElementById('noResults');

const totalCards = blogCards.length + 1; // +1 for featured

function updateCount(n) {
  searchCount.textContent = `Showing ${n} article${n !== 1 ? 's' : ''}`;
}

function runSearch(query) {
  const q = query.trim().toLowerCase();

  // Toggle clear button
  searchClear.classList.toggle('visible', q.length > 0);

  if (q === '') {
    // Reset — show everything
    blogCards.forEach(card => card.classList.remove('hidden'));
    featuredSection.style.display = '';
    noResults.style.display = 'none';
    updateCount(totalCards);
    return;
  }

  let visible = 0;

  // Check featured post
  const ftTitle    = featuredCard.dataset.title.toLowerCase();
  const ftCategory = featuredCard.dataset.category.toLowerCase();
  const ftAuthor   = featuredCard.dataset.author.toLowerCase();
  const ftExcerpt  = featuredCard.dataset.excerpt.toLowerCase();
  const ftMatch    = [ftTitle, ftCategory, ftAuthor, ftExcerpt].some(v => v.includes(q));
  featuredSection.style.display = ftMatch ? '' : 'none';
  if (ftMatch) visible++;

  // Check grid cards
  blogCards.forEach(card => {
    const title    = card.dataset.title.toLowerCase();
    const category = card.dataset.category.toLowerCase();
    const author   = card.dataset.author.toLowerCase();
    const excerpt  = card.dataset.excerpt.toLowerCase();
    const match    = [title, category, author, excerpt].some(v => v.includes(q));

    if (match) {
      card.classList.remove('hidden');
      visible++;
    } else {
      card.classList.add('hidden');
    }
  });

  updateCount(visible);
  noResults.style.display = visible === 0 ? 'flex' : 'none';
}

searchInput.addEventListener('input', e => runSearch(e.target.value));

searchClear.addEventListener('click', () => {
  searchInput.value = '';
  searchInput.focus();
  runSearch('');
});

// Keyboard shortcut: press "/" to focus search
document.addEventListener('keydown', e => {
  if (e.key === '/' && document.activeElement !== searchInput) {
    e.preventDefault();
    searchInput.focus();
    searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  if (e.key === 'Escape' && document.activeElement === searchInput) {
    searchInput.blur();
  }
});

// Init count
updateCount(totalCards);
