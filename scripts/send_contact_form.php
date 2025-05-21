<?php
// Ustawienie nagłówków dla poprawnego wyświetlania polskich znaków
header('Content-Type: text/html; charset=UTF-8');

// Adres email, na który mają zostać wysłane wiadomości
$recipient = "kontakt.borowkowyzakatek@gmail.com"; // <--- ZMIEŃ NA SWÓJ ADRES EMAIL DOCELOWY

// Sprawdź, czy formularz został wysłany metodą POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // 1. Pobierz dane z formularza i oczyść je (sanitizacja)
    // Używamy htmlspecialchars() aby zapobiec wstrzyknięciu kodu HTML/JS
    // Używamy trim() aby usunąć białe znaki z początku i końca
    // Pamiętaj, że nazwy pól ($_POST['...']) muszą zgadzać się z atrybutami 'name' w HTML
    $name = htmlspecialchars(trim($_POST["imię"]));
    $email = htmlspecialchars(trim($_POST["email"]));
    $subject = htmlspecialchars(trim($_POST["temat"]));
    $message = htmlspecialchars(trim($_POST["wiadomość"]));

    // 2. Walidacja danych
    $errors = [];

    if (empty($name)) {
        $errors[] = "Pole 'Imię' jest wymagane.";
    }

    if (empty($email)) {
        $errors[] = "Pole 'Email' jest wymagane.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Sprawdzenie poprawności formatu emaila
        $errors[] = "Podano niepoprawny format adresu email.";
    }

    if (empty($message)) {
        $errors[] = "Pole 'Wiadomość' jest wymagane.";
    }

    // Jeśli są błędy walidacji, przekieruj z powrotem na stronę kontaktową z informacją
    if (!empty($errors)) {
        $error_message = urlencode(implode(" ", $errors)); // Połącz błędy w jeden ciąg i zakoduj dla URL
        header("Location: kontakt.html?status=error&msg=" . $error_message);
        exit(); // Zatrzymaj wykonywanie skryptu
    }

    // 3. Przygotowanie emaila do wysyłki

    // Temat emaila, który do Ciebie przyjdzie
    $email_subject = "Wiadomosc ze strony Jagodowy Zakatek"; // Domyślny temat
    if (!empty($subject)) {
        $email_subject .= " - " . $subject; // Dodaj temat podany przez użytkownika, jeśli istnieje
    }


    // Treść emaila
    $email_body = "Otrzymano nowa wiadomosc ze strony kontaktowej:\n\n";
    $email_body .= "Imie: " . $name . "\n";
    $email_body .= "Email: " . $email . "\n";
    if (!empty($subject)) {
         $email_body .= "Temat: " . $subject . "\n";
    }
    $email_body .= "\n"; // Pusta linia dla czytelności
    $email_body .= "Wiadomosc:\n" . $message;

    // Nagłówki emaila
    // Ustawiamy Reply-To na adres użytkownika, żeby łatwo było odpowiedzieć
    // Ustawiamy From na adres z Twojej domeny, aby zminimalizować ryzyko SPAMU (jeśli to możliwe)
    // Content-Type: text/plain; charset=UTF-8 jest ważne dla polskich znaków
    $headers = "From: Powiadomienie ze strony <no-reply@" . parse_url($_SERVER['HTTP_REFERER'], PHP_URL_HOST) . ">\r\n"; // Próba użycia domeny z której przyszło
    if (!filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
         $headers .= "Reply-To: " . $email . "\r\n";
    }
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";


    // 4. Wysłanie emaila
    // Funkcja mail() zwraca TRUE w przypadku sukcesu (lub FALSE w przypadku błędu, ALE nie zawsze!)
    // Nawet jeśli mail() zwróci TRUE, email może nie dojść z powodu problemów z konfiguracją serwera, SPAM filtrami, itp.
    $mail_sent = mail($recipient, $email_subject, $email_body, $headers);

    // 5. Obsługa wyniku wysyłki i przekierowanie

    if ($mail_sent) {
        // Sukces - przekieruj na stronę kontaktową z informacją o sukcesie
        header("Location: kontakt.html?status=success");
    } else {
        // Błąd wysyłki - przekieruj na stronę kontaktową z informacją o błędzie
        // Warto zalogować ten błąd na serwerze dla późniejszej analizy
        error_log("Blad wysylki emaila z formularza kontaktowego."); // Zapisz błąd w logach serwera
        header("Location: kontakt.html?status=error&msg=" . urlencode("Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później."));
    }

    exit(); // Zakończ działanie skryptu po przekierowaniu

} else {
    // Jeśli skrypt został wywołany bezpośrednio (nie metodą POST), przekieruj na stronę kontaktową
    header("Location: kontakt.html");
    exit(); // Zakończ działanie skryptu
}
?>