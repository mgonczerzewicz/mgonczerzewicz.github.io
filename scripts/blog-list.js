// scripts/blog-list.js

document.addEventListener('DOMContentLoaded', () => {
    // Znajdź kontener, do którego będziemy dodawać wpisy blogowe
    // Zgodnie z Twoim HTML, jest to div z klasą 'blog-list'.
    // Upewnij się, że w blog.html usunąłeś ręcznie dodane <a class="blog-item">
    const blogListContainer = document.querySelector('.blog-list');

    // Sprawdź, czy kontener istnieje na stronie (dla bezpieczeństwa)
    if (!blogListContainer) {
        console.error('Container .blog-list not found on this page.');
        return; // Przerwij działanie skryptu, jeśli kontenera nie ma
    }

    // Funkcja do pobierania danych i wyświetlania wpisów
    async function loadBlogPosts() {
        try {
            // Ścieżka do Twojego pliku JSON z danymi wpisów
            // Domyślnie zakładamy, że plik posts.json znajduje się w folderze 'data'
            // obok folderu 'scripts' i 'styles'. Dostosuj ścieżkę '/data/posts.json',
            // jeśli plik znajduje się gdzie indziej.
            const response = await fetch('/data/posts.json');

            // Sprawdź, czy odpowiedź jest poprawna (status 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Pobierz dane jako JSON
            const posts = await response.json();

            // Opcjonalnie: Wyczyść kontener na wypadek, gdyby były tam jakieś stare treści lub placeholder
             blogListContainer.innerHTML = '';

            // Przejdź przez każdy wpis w tablicy posts
            posts.forEach(post => {
                // Stwórz nowy element <a> dla wpisu
                const postElement = document.createElement('a');
                postElement.href = post.url; // Link do strony pojedynczego wpisu (z JSON)
                postElement.classList.add('blog-item'); // Dodaj klasę do stylizacji

                // Ustaw wewnętrzny HTML elementu <a>, korzystając z danych z obiektu 'post'
                postElement.innerHTML = `
                    <div class="blog-item-image">
                        <img src="${post.image}" alt="${post.imageAlt}">
                    </div>
                    <div class="blog-item-content">
                        <h4>${post.title}</h4>
                        <p class="blog-item-excerpt">${post.excerpt}</p>
                        <div class="blog-item-meta">
                            <span>${post.date}</span> | <span>${post.readTime}</span>
                        </div>
                    </div>
                `;
                // Upewnij się, że Twój plik posts.json zawiera pola:
                // title, excerpt, date, readTime, image, imageAlt, url

                // Dodaj stworzony element wpisu do kontenera na stronie
                blogListContainer.appendChild(postElement);
            });

        } catch (error) {
            // W przypadku błędu podczas pobierania lub przetwarzania danych, wyświetl komunikat
            console.error('Error loading blog posts:', error);
            blogListContainer.innerHTML = '<p>Wystąpił błąd podczas ładowania wpisów blogowych.</p>';
        }
    }

    // Uruchom funkcję ładowania wpisów po załadowaniu DOM
    loadBlogPosts();
});