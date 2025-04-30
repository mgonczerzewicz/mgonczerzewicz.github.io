// window.addEventListener('load', () => {
//     window.scrollTo(0, 0); // Ustawia scroll na samej górze strony
// });

window.addEventListener('scroll', function() {
    let header = document.querySelector('header');
    // let blurTarget = document.querySelector('.blur-target'); // Ta linia nie jest używana w obecnym kodzie

    // Jeśli przewinięto stronę więcej niż 0 pikseli (czyli w ogóle przewinięto z samej góry)
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        // Jeśli strona jest na samej górze
        header.classList.remove('scrolled');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            event.preventDefault(); // Zatrzymaj domyślne przewijanie

            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

const hamburgerBtn = document.getElementById('hamburger-button');

hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('rotated');
});


document.getElementById('hamburger-button').addEventListener('click', function() {
    // Dodajemy lub usuwamy klasę 'nav-open' z headera
    document.querySelector('header').classList.toggle('nav-open');
});

document.querySelectorAll('nav a').forEach(function(link) {
    link.addEventListener('click', function() {
        document.querySelector('header').classList.remove('nav-open');
    });
});

// Płynne przewijanie dla wszystkich linków prowadzących do sekcji
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
      event.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      
      window.scrollTo({
        top: target.offsetTop - 100, // Dostosuj margines, by widoczna była sekcja
        behavior: 'smooth'
      });
    });
  });

  
// Funkcja do sprawdzenia, czy sekcja jest w obszarze widoczności
function checkVisibility() {
    const sections = document.querySelectorAll('section'); // Pobieramy wszystkie sekcje
    const windowHeight = window.innerHeight; // Wysokość widocznej części ekranu

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top; // Odległość sekcji od góry ekranu

        // Jeśli sekcja znajduje się w widocznej części ekranu (plus offset, żeby dać efekt "wejścia")
        if (sectionTop < windowHeight - 100) {
            section.classList.add('visible'); // Dodanie klasy .visible
        } else {
            section.classList.remove('visible'); // Usunięcie klasy .visible, jeśli nie jest widoczna
        }
    });
}

// Nasłuchiwacz zdarzenia dla scrolla
window.addEventListener('scroll', checkVisibility);

// Wywołanie funkcji po załadowaniu strony, żeby sprawdzić sekcje od razu
document.addEventListener('DOMContentLoaded', checkVisibility);

