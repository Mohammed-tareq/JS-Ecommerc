//  btn for dark and light mode
(() => {
    'use strict';
    const storedTheme = localStorage.getItem('theme');
    const getPreferredTheme = () => {
        if (storedTheme) {
            return storedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };
    const setTheme = function (theme) {
        if (theme === 'auto') {
            document.documentElement.setAttribute('data-bs-theme', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        } else {
            document.documentElement.setAttribute('data-bs-theme', theme);
        }
    };
    setTheme(getPreferredTheme());
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (getPreferredTheme() === 'auto') {
            setTheme('auto');
        }
    });
    window.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('[data-bs-theme-value]').forEach(toggle => {
            toggle.addEventListener('click', () => {
                const theme = toggle.getAttribute('data-bs-theme-value');
                localStorage.setItem('theme', theme);
                setTheme(theme);
                document.querySelectorAll('[data-bs-theme-value]').forEach(el => {
                    el.setAttribute('aria-pressed', 'false');
                    el.classList.remove('active');
                });
                toggle.setAttribute('aria-pressed', 'true');
                toggle.classList.add('active');
            });
        });
    });
})();



// 