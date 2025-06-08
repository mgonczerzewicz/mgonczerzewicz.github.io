


        // const themeToggleIcon = document.getElementById('theme-toggle-icon');
        // const body = document.body;

        // // Sprawdź preferencje użytkownika lub zapisany stan
        // // Jeśli nie ma zapisanego stanu, lub jest 'light-mode', strona będzie w trybie jasnym.
        // // Jeśli jest 'dark-mode', strona będzie w trybie ciemnym.
        // if (localStorage.getItem('theme') === 'dark-mode') {
        //     body.classList.add('dark-mode');
        //     themeToggleIcon.classList.remove('fa-moon');
        //     themeToggleIcon.classList.add('fa-sun');
        // } else {
        //     // Domyślny stan, jeśli localStorage jest pusty lub 'light-mode'
        //     body.classList.remove('dark-mode');
        //     themeToggleIcon.classList.remove('fa-sun');
        //     themeToggleIcon.classList.add('fa-moon'); // Ikona księżyca dla trybu jasnego
        // }


        // themeToggleIcon.addEventListener('click', () => {
        //     if (body.classList.contains('dark-mode')) {
        //         // Przełącz na tryb jasny
        //         body.classList.remove('dark-mode');
        //         themeToggleIcon.classList.remove('fa-sun');
        //         themeToggleIcon.classList.add('fa-moon');
        //         localStorage.setItem('theme', 'light-mode');
        //     } else {
        //         // Przełącz na tryb ciemny
        //         body.classList.add('dark-mode');
        //         themeToggleIcon.classList.remove('fa-moon');
        //         themeToggleIcon.classList.add('fa-sun');
        //         localStorage.setItem('theme', 'dark-mode');
        //     }
        // });

        // const languageSelect = document.getElementById('language-select');
        // languageSelect.addEventListener('change', (event) => {
        //     console.log('Wybrano język:', event.target.value);
        //     // Tutaj dodasz logikę zmiany języka na stronie (np. wczytywanie treści z plików językowych)
        //     alert('Funkcja zmiany języka wymaga implementacji logiki po stronie serwera/JS!');
        // });