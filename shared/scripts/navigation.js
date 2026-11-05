export function initializeNavigation(selector) {
  const links = document.querySelectorAll(selector);

  function updateActiveLink() {
    const hash = window.location.hash;
    const current = hash || links[0]?.getAttribute('href');

    links.forEach(link => {
      const active = link.getAttribute('href') === current;

      link.classList.toggle('active', active);

      if (active) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  links.forEach(link => {
    link.addEventListener('click', () => {
      const target = document.querySelector(link.getAttribute('href'));

      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  window.addEventListener('hashchange', updateActiveLink);
  updateActiveLink();
}
