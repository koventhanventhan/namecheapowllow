<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$subject = $_POST['subject'] ?? '';
$message = $_POST['message'] ?? '';
$recaptchaToken = $_POST['recaptchaToken'] ?? '';

if (empty($name) || empty($email) || empty($subject) || empty($message) || empty($recaptchaToken)) {
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit;
}

// Verify reCAPTCHA
$recaptchaSecret = '6LdDwa8tAAAAAEG6JvJtl70TP1aGELgXj24kCyUq';
$verifyResponse = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$recaptchaSecret}&response={$recaptchaToken}");
$responseData = json_decode($verifyResponse);

if (!$responseData->success) {
    echo json_encode(['success' => false, 'message' => 'reCAPTCHA verification failed.']);
    exit;
}

// Send Email
$to = 'info@owllow.com'; 
$email_subject = "New Contact Form Submission: $subject";
$email_body = "You have received a new message from your website contact form.\n\n".
              "Here are the details:\n".
              "Name: $name\n".
              "Email: $email\n".
              "Subject: $subject\n".
              "Message:\n$message\n";

// IMPORTANT: From address MUST be a real email created in cPanel to avoid Spam blocks.
$headers = "From: info@owllow.com\r\n";
// Reply-To is the customer's email, so when you hit "Reply" in Gmail, it goes to the customer.
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($to, $email_subject, $email_body, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Message sent successfully!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to send message. Please try again.']);
}
?>
