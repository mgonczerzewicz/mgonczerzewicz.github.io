<?php
// WAŻNE: ZMIEŃ TE DANE NA SWOJE
$recipient_email = "michal@micgo.pl"; 
$subject_prefix  = "Pilne Zapytanie AgroExpert: ";

header('Content-Type: application/json'); // Ustawienie nagłówka na JSON

// Funkcja do zwracania odpowiedzi w JSON i zakończenia skryptu
function sendJson($success, $message) {
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. Walidacja i czyszczenie danych (pozostaje taka sama)
    $name    = htmlspecialchars(trim($_POST['name']));
    $email   = htmlspecialchars(trim($_POST['email']));
    $phone   = htmlspecialchars(trim($_POST['phone']));
    $message = htmlspecialchars(trim($_POST['message']));
    
    if (empty($name) || empty($email) || empty($message)) {
        sendJson(false, "Proszę wypełnić wszystkie wymagane pola.");
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendJson(false, "Niepoprawny format adresu email.");
    }

    // 2. Budowanie i wysyłka wiadomości (pozostaje taka sama)
    $email_content = "Otrzymano nową wiadomość z formularza kontaktowego AgroExpert:\n\n";
    $email_content .= "Imię i Nazwisko / Firma: " . $name . "\n";
    $email_content .= "Email: " . $email . "\n";
    $email_content .= "Telefon: " . ($phone ? $phone : "Nie podano") . "\n\n";
    $email_content .= "Treść Wiadomości:\n" . $message . "\n";
    
    $email_subject = $subject_prefix . $name;
    $email_headers = "From: " . $name . " <" . $email . ">\r\n";
    $email_headers .= "Reply-To: " . $email . "\r\n";
    $email_headers .= "MIME-Version: 1.0\r\n";
    $email_headers .= "Content-type: text/plain; charset=UTF-8\r\n";

    if (mail($recipient_email, $email_subject, $email_content, $email_headers)) {
        // Sukces: zwróć JSON
        sendJson(true, "Wiadomość wysłana pomyślnie! Odpowiemy wkrótce.");
    } else {
        // Błąd: zwróć JSON
        sendJson(false, "Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.");
    }

} else {
    sendJson(false, "Nieprawidłowa metoda żądania.");
}
?>