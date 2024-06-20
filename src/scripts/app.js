const header = document.querySelector('.main-header');

window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    if (scrollPos > 10 ) {
        header.classList.add('scrolled');
    }
    else {
        header.classList.remove('scrolled');
    }
});

// window.addEventListener('scroll', function() {
//     // Get the position of the target section
//     const targetSection = document.getElementById('contact');
//     const targetPosition = targetSection.getBoundingClientRect().top;
    
//     // Calculate the current scroll position
//     const scrollPosition = window.scrollY || window.pageYOffset;
    
//     // Hide the div if scrolled past the target section
//     if (scrollPosition > targetPosition) {
//         document.getElementById('sticky').style.display = 'none';
//     } else {
//         document.getElementById('sticky').style.display = 'block';
//     }
// });