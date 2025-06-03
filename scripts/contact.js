function autoResizeTextarea(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
    
  
  document.addEventListener('DOMContentLoaded', function() {
      const messageTextarea = document.getElementById('message');
      if (messageTextarea) {
          autoResizeTextarea(messageTextarea);
          messageTextarea.addEventListener('input', function() {
              autoResizeTextarea(this);
          });
      } else {
          console.warn("Element textarea z ID 'message' nie znaleziony. Automatyczna zmiana rozmiaru nie zostanie uruchomiona.");
      }
  });