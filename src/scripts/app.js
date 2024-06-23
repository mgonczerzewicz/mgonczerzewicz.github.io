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

// Get all h1 elements within the hero div
const heroHeadings = document.querySelectorAll('.hero h1');
let currentIndex = 0;

// Function to switch the active class to the next h1
function switchText() {
  // Remove the active class from the current h1
  heroHeadings[currentIndex].classList.remove('active');
  
  // Increment the index to the next h1
  currentIndex = (currentIndex + 1) % heroHeadings.length;
  
  // Add the active class to the new current h1
  heroHeadings[currentIndex].classList.add('active');
}

// Set interval to switch text every 30 seconds (30000 milliseconds)
setInterval(switchText, 10000);