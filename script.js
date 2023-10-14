function scrollToElement(elementSelector, instance = 0) {
    // Select all elements that match the given selector
    const elements = document.querySelectorAll(elementSelector);
    // Check if there are elements matching the selector and if the requested instance exists
    if (elements.length > instance) {
        // Scroll to the specified instance of the element
        elements[instance].scrollIntoView({ behavior: 'smooth' });
    }
 }
 
 const link1 = document.getElementById("link1");
 const link2 = document.getElementById("link2");
 const link3 = document.getElementById("link3");
 const link4 = document.getElementById("link4");
 const link5 = document.getElementById("link5");
 
 link1.addEventListener('click', () => {
    scrollToElement('.header');
 });
 
 link2.addEventListener('click', () => {
    // Scroll to the second element with "header" class
    scrollToElement('.header', 1);
 });
 
 link3.addEventListener('click', () => {
    scrollToElement('.header', 2);
 });

 link4.addEventListener('click', () => {
    scrollToElement('.header', 3);
 });

 link5.addEventListener('click', () => {
   scrollToElement('.contact-form');
});

const sendBtn = document.querySelector('.send-btn');
const result = document.querySelector('.result');

sendBtn.addEventListener('click', sendEmail);

  function sendMail(){
    (function(){
        emailjs.init("QRi9EmchCwJAnTT-K");
     })();

    var params = {
      subject: document.querySelector("#subject").value,
      email_id: document.querySelector("#email_id").value,
      message: document.querySelector("#message").value,
    };

    var serviceID = "service_i4mhda7"; // Email Service ID
    var templateID = "template_mndp3or"; // Email Template ID

    emailjs.send(serviceID, templateID, params)
    .then(function () {
        result.innerHTML = "Wiadomość została wysłana poprawnie";
        result.style.opacity = 1;
    }, function (error) {
        result.innerHTML = "Wiadomość nie została wysłana";
        result.style.opacity = 1;
    });
  }
