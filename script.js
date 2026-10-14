const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Tutup menu' : 'Buka menu');
    menuToggle.textContent = isOpen ? '×' : '☰';
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Buka menu');
      menuToggle.textContent = '☰';
    });
  });
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('visible'));
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    const data = new FormData(contactForm);
    const emailTujuan = 'emailkamu@example.com'; // Ganti dengan email tujuan kamu
    const subject = `Penawaran proyek dari ${data.get('name')}`;
    const body = [
      `Nama: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      `Layanan: ${data.get('service')}`,
      '',
      'Pesan:',
      data.get('message')
    ].join('\\n');
    const feedback = document.getElementById('formFeedback');
    if (feedback) feedback.textContent = 'Draft email sedang disiapkan. Jika aplikasi email tidak terbuka, periksa pengaturan email di perangkatmu.';
    window.location.href = `mailto:${emailTujuan}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
