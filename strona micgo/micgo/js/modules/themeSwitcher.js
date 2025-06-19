export const initializeThemeSwitcher = () => {
  const body = document.body;

  const themeToggleBtnHorizontal = document.querySelector('.theme-switcher-slider.horizontal');
  const themeToggleBtnDefault = document.querySelector('.theme-toggle-button.theme-switcher-slider');

  const updateThemeIcon = () => {
    const currentTheme = body.getAttribute('data-theme');

    const updateBtnIcons = (btn) => {
      if (!btn) return;
      const sliderHandle = btn.querySelector('.slider-handle');
      const darkIcon = sliderHandle?.querySelector('.dark-icon');
      const lightIcon = sliderHandle?.querySelector('.light-icon');

      if (currentTheme === 'dark') {
        if (darkIcon) darkIcon.style.opacity = '1';
        if (lightIcon) lightIcon.style.opacity = '0';
        btn.setAttribute('aria-checked', 'false');
      } else {
        if (darkIcon) darkIcon.style.opacity = '0';
        if (lightIcon) lightIcon.style.opacity = '1';
        btn.setAttribute('aria-checked', 'true');
      }
    };

    updateBtnIcons(themeToggleBtnHorizontal);
    updateBtnIcons(themeToggleBtnDefault);
  };

  const loadTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      body.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      body.setAttribute('data-theme', 'dark');
    } else {
      body.setAttribute('data-theme', 'light');
    }
    updateThemeIcon();
  };

  const toggleTheme = () => {
    if (body.getAttribute('data-theme') === 'dark') {
      body.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    } else {
      body.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
    updateThemeIcon();
  };

  if (themeToggleBtnHorizontal) {
    themeToggleBtnHorizontal.addEventListener('click', toggleTheme);
  }

  if (themeToggleBtnDefault) {
    themeToggleBtnDefault.addEventListener('click', toggleTheme);
  }

  loadTheme();

  console.log('MICGO: theme switcher initialized.');
};
