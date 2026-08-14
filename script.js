const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const siteHeader = document.querySelector('.site-header');

if (siteHeader) {
  const updateHeader = () => siteHeader.classList.toggle('is-scrolled', window.scrollY > 16);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
}

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px' });

revealItems.forEach((item) => observer.observe(item));

const demoForm = document.querySelector('#demo-form');
if (demoForm) {
  demoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = event.currentTarget.querySelector('.form-status');
    status.textContent = 'Это демонстрация. В рабочей версии заявка будет отправлена менеджеру.';
  });
}

const servicePreview = document.querySelector('.service-preview');
const serviceRows = document.querySelectorAll('.service-row[data-image]');

if (servicePreview && serviceRows.length) {
  const previewImage = servicePreview.querySelector('img');
  const previewLabel = servicePreview.querySelector('figcaption b');
  const previewIndex = servicePreview.querySelector('figcaption span');

  serviceRows.forEach((row, index) => {
    const updatePreview = () => {
      if (row.classList.contains('is-active')) return;
      serviceRows.forEach((item) => item.classList.remove('is-active'));
      row.classList.add('is-active');
      servicePreview.classList.add('is-changing');

      const preload = new Image();
      preload.onload = () => {
        previewImage.src = row.dataset.image;
        previewImage.alt = row.dataset.label;
        previewLabel.textContent = row.dataset.label;
        previewIndex.textContent = `Направление ${String(index + 1).padStart(2, '0')}`;
        requestAnimationFrame(() => servicePreview.classList.remove('is-changing'));
      };
      preload.src = row.dataset.image;
    };

    row.addEventListener('mouseenter', updatePreview);
    row.addEventListener('focus', updatePreview);
  });
}
