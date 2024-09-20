// navbar를 로드하고 초기화하는 함수
async function loadNavbarAndInitialize() {
  try {
    const response = await fetch('/components/navbar.html');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.text();
    document.getElementById('navbar').innerHTML = data;
    console.log(data)

    await initializeNavbar();
  } catch (error) {
    console.error('Failed to load or initialize navbar:', error);
  }
}

// navbar 초기화 함수
async function initializeNavbar() {
  setupThemeToggle();
  setupMobileMenu();
}

function setupMobileMenu() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (!mobileMenuButton || !mobileMenu) {
    console.error('Mobile menu elements not found. Button:', mobileMenuButton, 'Menu:', mobileMenu);
    return;
  }

  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const isExpanded = mobileMenu.classList.contains('hidden');
    mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
  });
}

function setupThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
  const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

  if (!themeToggleBtn || !themeToggleDarkIcon || !themeToggleLightIcon) {
    console.error('Theme toggle elements not found');
    return;
  }

  function setTheme(isDark) {
    document.documentElement.classList.toggle('dark', isDark);
    themeToggleDarkIcon.classList.toggle('hidden', isDark);
    themeToggleLightIcon.classList.toggle('hidden', !isDark);
    localStorage.setItem('color-theme', isDark ? 'dark' : 'light');
  }

  const isDarkMode = localStorage.getItem('color-theme') === 'dark' || 
    (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  setTheme(isDarkMode);

  themeToggleBtn.addEventListener('click', () => {
    setTheme(!document.documentElement.classList.contains('dark'));
  });
}

document.addEventListener('DOMContentLoaded', loadNavbarAndInitialize);