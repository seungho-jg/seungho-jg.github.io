fetch('/components/navbar.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('navbar').innerHTML = data;
  });

// 테마 토글 기능
function setupThemeToggle(buttonId, darkIconId, lightIconId) {
    const themeToggleBtn = document.getElementById(buttonId);
    const themeToggleDarkIcon = document.getElementById(darkIconId);
    const themeToggleLightIcon = document.getElementById(lightIconId);
  
    // 테마 변경 함수
    function setTheme(isDark) {
      if (isDark) {
        document.documentElement.classList.add('dark');
        themeToggleLightIcon.style.display = 'inline-block';
        themeToggleDarkIcon.style.display = 'none';
      } else {
        document.documentElement.classList.remove('dark');
        themeToggleLightIcon.style.display = 'none';
        themeToggleDarkIcon.style.display = 'inline-block';
      }
    }
  
    // 초기 테마 설정
    const isDarkMode = localStorage.getItem('color-theme') === 'dark' || 
      (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setTheme(isDarkMode);
  
    // 버튼 클릭 이벤트
    themeToggleBtn.addEventListener('click', function() {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(!isDark);
      localStorage.setItem('color-theme', isDark ? 'light' : 'dark');
    });
  }
  
  // 모바일 메뉴 토글
  const mobileMenuButton = document.querySelector('button[aria-controls="mobile-menu"]');
  const mobileMenu = document.getElementById('mobile-menu');
  
  mobileMenuButton.addEventListener('click', () => {
    const expanded = mobileMenuButton.getAttribute('aria-expanded') === 'true' || false;
    mobileMenuButton.setAttribute('aria-expanded', !expanded);
    mobileMenu.classList.toggle('hidden');
  });
  
  // 페이지 로드 시 테마 토글 설정
  document.addEventListener('DOMContentLoaded', function() {
    // 데스크톱 테마 토글 설정
    setupThemeToggle('theme-toggle', 'theme-toggle-dark-icon', 'theme-toggle-light-icon');
  
    // 모바일 테마 토글 설정
    setupThemeToggle('mobile-theme-toggle', 'mobile-theme-toggle-dark-icon', 'mobile-theme-toggle-light-icon');
  });