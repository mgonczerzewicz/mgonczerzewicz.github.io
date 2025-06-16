export function initializeChangingWord() {
  const words = ["sklepy", "systemy", "rozwiązania", "aplikacje", "platformy", "strony"];
  const typingElement = document.getElementById("typing");

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 150; // szybkość pisania (ms)
  let deletingSpeed = 75; // szybkość kasowania (ms)
  let delayAfterWord = 1500; // pauza po napisaniu słowa (ms)

  function type() {
    const currentWord = words[wordIndex];
    
    if (!isDeleting) {
      // pisanie litery
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentWord.length) {
        // koniec pisania słowa -> zacznij kasowanie po pauzie
        isDeleting = true;
        setTimeout(type, delayAfterWord);
        return;
      }
    } else {
      // kasowanie litery
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        // koniec kasowania -> przejdź do kolejnego słowa
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
  }

  // start animacji
  type();
}