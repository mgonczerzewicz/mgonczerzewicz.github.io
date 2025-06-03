
window.addEventListener('scroll', function() {
    let header = document.querySelector('header');
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#' && targetId.startsWith('#')) {
                 const target = document.querySelector(targetId);
                 if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                 }
            }
        });
    });

    const hamburgerBtn = document.getElementById('hamburger-button');
     if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('rotated');
            document.querySelector('header').classList.toggle('nav-open');
        });
     }

    document.querySelectorAll('nav a').forEach(function(link) {
         link.addEventListener('click', function() {
             const header = document.querySelector('header');
              if (header.classList.contains('nav-open')) {
                 header.classList.remove('nav-open');
                 const hamburgerBtn = document.getElementById('hamburger-button');
                 if (hamburgerBtn && hamburgerBtn.classList.contains('rotated')) {
                     hamburgerBtn.classList.remove('rotated');
                 }
              }
         });
    });

});