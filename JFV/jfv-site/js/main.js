document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());

  /* ---------- Menú móvil ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', open);
      navToggle.setAttribute('aria-expanded', open);
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', false);
    }));
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          entry.target.style.setProperty('--i', i);
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Carrusel de galería (drag + botones) ---------- */
  const track = document.getElementById('galleryTrack');
  const prevBtn = document.getElementById('galPrev');
  const nextBtn = document.getElementById('galNext');

  if (track) {
    const scrollAmount = () => Math.min(320, track.clientWidth * 0.8);
    nextBtn && nextBtn.addEventListener('click', () => track.scrollBy({ left: scrollAmount(), behavior: 'smooth' }));
    prevBtn && prevBtn.addEventListener('click', () => track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' }));

    let isDown = false, startX, scrollLeft;
    track.addEventListener('pointerdown', (e) => {
      isDown = true;
      track.classList.add('is-dragging');
      startX = e.clientX;
      scrollLeft = track.scrollLeft;
      track.setPointerCapture(e.pointerId);
    });
    track.addEventListener('pointermove', (e) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      track.scrollLeft = scrollLeft - dx;
    });
    const stopDrag = () => { isDown = false; track.classList.remove('is-dragging'); };
    track.addEventListener('pointerup', stopDrag);
    track.addEventListener('pointerleave', stopDrag);
  }
});
