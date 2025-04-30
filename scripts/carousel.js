$(document).ready(function(){
    $('.product-list').slick({
        slidesToShow: 3,        // Liczba widocznych elementów
        slidesToScroll: 1,      // Liczba przesuwanych elementów
        arrows: false,          // Strzałki nawigacyjne
        dots: true,             // Kropki nawigacyjne
        autoplay: true,         // Autoprzewijanie
        autoplaySpeed: 3000,    // Czas między przewinięciami (3000ms = 3 sekundy)
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
});