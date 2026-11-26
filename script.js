const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeIcon.textContent = theme === 'dark' ? '☀' : '☾';
    themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
}

setTheme(localStorage.getItem('theme') || 'light');

themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', nextTheme);
    setTheme(nextTheme);
});

function setMenuOpen(isOpen) {
    navMenu.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
}

menuToggle.addEventListener('click', () => {
    setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => setMenuOpen(false));
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape') setMenuOpen(false);
});

const sections = document.querySelectorAll('main section[id]');
const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
            const isCurrent = link.getAttribute('href') === `#${entry.target.id}`;
            link.classList.toggle('active', isCurrent);
            if (isCurrent) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
    });
}, { rootMargin: '-30% 0px -60% 0px' });

sections.forEach(section => sectionObserver.observe(section));
document.getElementById('year').textContent = new Date().getFullYear();
