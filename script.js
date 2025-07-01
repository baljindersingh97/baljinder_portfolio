

document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Smooth Scroll ---------- */
  const linkSelector = 'a.scroll-link, .navbar a.nav-link[href^="#"]';
  document.querySelectorAll(linkSelector).forEach(link => {
    link.addEventListener('click', event => {
      const targetID = link.getAttribute('href');
      if (targetID && targetID.startsWith('#')) {
        const target = document.querySelector(targetID);
        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  /* ---------- Animate Skill Bars ---------- */
  const bars = document.querySelectorAll('.progress-bar[data-progress]');
  if (bars.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          bar.style.width = bar.dataset.progress + '%';
          observer.unobserve(bar);          // animate only once
        }
      });
    }, { threshold: 0.6 });

    bars.forEach(bar => observer.observe(bar));
  }

  /* ---------- Contact-Form Validation ---------- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;

      ['name', 'email', 'message'].forEach(id => {
        const field = document.getElementById(id);
        if (!field) return;

        const value = field.value.trim();
        const isEmail = id === 'email';
        const emailOK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

        if (value === '' || (isEmail && !emailOK)) {
          field.classList.add('is-invalid');
          valid = false;
        } else {
          field.classList.remove('is-invalid');
        }
      });

      if (valid) {
        alert('Thank you! Your message has been sent (mock).');
        form.reset();
      }
    });
  }

  /* ---------- Dynamic Footer Year ---------- */
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});
