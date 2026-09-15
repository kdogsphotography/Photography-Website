
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
}

const currentPage = document.body.dataset.page;
document.querySelectorAll('[data-nav]').forEach(link => {
  if (link.dataset.nav === currentPage) link.classList.add('active');
});

document.querySelectorAll('.photo-slot').forEach(slot => {
  const img = slot.querySelector('img');
  const markLoaded = () => slot.classList.add('loaded');

  if (img.complete && img.naturalWidth > 0) {
    markLoaded();
  } else {
    img.addEventListener('load', markLoaded);
    img.addEventListener('error', () => slot.classList.remove('loaded'));
  }
});

const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    portfolioItems.forEach(item => {
      const show = filter === 'all' || item.dataset.category === filter;
      item.classList.toggle('is-hidden', !show);
    });
  });
});
