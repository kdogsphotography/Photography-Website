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

// Placeholder photo slots still work as fallbacks if an image path is ever missing.
document.querySelectorAll('.photo-slot').forEach(slot => {
  const img = slot.querySelector('img');
  if (!img) return;
  const markLoaded = () => slot.classList.add('loaded');
  if (img.complete && img.naturalWidth > 0) markLoaded();
  else {
    img.addEventListener('load', markLoaded);
    img.addEventListener('error', () => slot.classList.remove('loaded'));
  }
});

// Portfolio category filtering.
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioAlbums = document.querySelectorAll('.portfolio-album');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    portfolioAlbums.forEach(album => {
      const show = filter === 'all' || album.dataset.category === filter;
      album.classList.toggle('is-hidden', !show);
    });
  });
});

// Horizontal gallery arrow controls.
document.querySelectorAll('.gallery-control').forEach(button => {
  button.addEventListener('click', () => {
    const album = button.closest('.portfolio-album, .mini-gallery-wrap');
    const track = album?.querySelector('.gallery-track');
    if (!track) return;
    const direction = Number(button.dataset.direction) || 1;
    track.scrollBy({ left: direction * Math.max(track.clientWidth * 0.78, 320), behavior: 'smooth' });
  });
});

// Click-to-enlarge lightbox for gallery photos.
const lightbox = document.querySelector('#photo-lightbox');
const lightboxImage = lightbox?.querySelector('img');
const lightboxCaption = lightbox?.querySelector('.lightbox-caption');
const lightboxClose = lightbox?.querySelector('.lightbox-close');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const image = item.querySelector('img');
    if (!lightbox || !lightboxImage || !image) return;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    if (lightboxCaption) lightboxCaption.textContent = image.alt;
    lightbox.showModal();
  });
});

lightboxClose?.addEventListener('click', () => lightbox?.close());
lightbox?.addEventListener('click', event => {
  if (event.target === lightbox) lightbox.close();
});
