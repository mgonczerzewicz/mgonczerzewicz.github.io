// Dodaj tę funkcję gdzieś na początku pliku script.js
function autoResizeTextarea(textarea) {
    // Ustaw wysokość na auto, aby przeglądarka przeliczyła potrzebną wysokość dla zawartości
    textarea.style.height = 'auto';
    // Ustaw wysokość na scrollHeight (wysokość potrzebna do wyświetlenia całej zawartości bez paska przewijania)
    textarea.style.height = textarea.scrollHeight + 'px';
  }
  
  // ... pozostałe funkcje (checkPassword, initScrollHeader, initHamburgerMenu, initProductCarousel itp.) ...
  
  
  // Znajdź istniejący listener DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function() {
      // ... istniejąca logika na początku DOMContentLoaded (np. obsługa Enter w polu hasła, inicjalizacja headera i menu) ...
  
      // --- NOWY KOD DLA AUTOMATYCZNEGO ZMIENIANIA ROZMIARU TEXTAREA ---
  
      // Znajdź pole textarea z ID 'message'
      const messageTextarea = document.getElementById('message');
  
      // Sprawdź, czy element został znaleziony
      if (messageTextarea) {
          // Dostosuj początkowy rozmiar textarea, jeśli zawiera już tekst przy ładowaniu strony
          autoResizeTextarea(messageTextarea);
  
          // Dodaj nasłuchiwanie zdarzenia 'input' (wywoływane podczas wprowadzania tekstu)
          messageTextarea.addEventListener('input', function() {
              // Wywołaj funkcję autoResizeTextarea, przekazując 'this' (czyli sam element textarea)
              autoResizeTextarea(this);
          });
  
          // Opcjonalnie: Możesz też dostosować rozmiar przy zmianie rozmiaru okna przeglądarki
          // window.addEventListener('resize', function() {
          //     autoResizeTextarea(messageTextarea);
          // });
  
      } else {
          console.warn("Element textarea z ID 'message' nie znaleziony. Automatyczna zmiana rozmiaru nie zostanie uruchomiona.");
      }
  });