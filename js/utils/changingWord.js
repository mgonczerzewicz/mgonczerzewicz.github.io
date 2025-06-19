export function initializeChangingWord() {
  const typingElement = document.getElementById("typing");
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 150;
  let deletingSpeed = 75;
  let delayAfterWord = 2000;

  // Define words for each language
  const wordsByLanguage = {
    "pl": ["sklepy", "systemy", "rozwiązania", "aplikacje", "platformy", "strony"],
    "en": ["stores", "systems", "solutions", "applications", "platforms", "websites"]
  };

  function type() {
    // Get the current language from the body's data-lang attribute
    const currentLang = document.body.getAttribute('data-lang') || 'pl'; // Default to 'pl' if not set
    const words = wordsByLanguage[currentLang]; // Select the correct word array

    if (!words || words.length === 0) { // Fallback if no words are defined for the language
      typingElement.textContent = "";
      return;
    }

    const currentWord = words[wordIndex];

    if (!isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, delayAfterWord);
        return;
      }
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
  }

  // --- New Logic for Language Change ---
  // Create a MutationObserver to watch for changes to the data-lang attribute on <body>
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'data-lang') {
        // Language changed, reset the typing animation
        wordIndex = 0;     // Start from the first word in the new language
        charIndex = 0;     // Reset character index
        isDeleting = false; // Ensure it starts typing, not deleting
        typingElement.textContent = ""; // Clear current text
        // Immediately start typing the new word for the new language
        type();
      }
    }
  });

  // Start observing the <body> element for attribute changes
  observer.observe(document.body, { attributes: true });

  // Initial call to start typing when the page loads
  type();
}