window.addEventListener('scroll', function() {
    let header = document.querySelector('header');
    let blurTarget = document.querySelector('.blur-target');
    
    // Jeśli przewinięto stronę więcej niż wysokość nagłówka
    if (window.scrollY > header.offsetHeight) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
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
  
