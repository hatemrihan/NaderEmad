<?php
$name = $_POST['name'];
$number = $_POST['number'];
$visitor_email = $_POST['email'];
$message = $_POST['message'];

$email_from = 'info@http://127.0.0.1:5500/index.html';
$email_subject = "New Form Submission";
$email_body = "User Name: $name.\n".
                "User Number: $number.\n".
                "User Email: $visitor_email.\n".
                "User Message: $message.\n";
$to = 'Nader.emad.25"gmail.com';
$headers = "From: $email_from \r\n";
$headers .= "Reply-To: $visitor_email \r\n";
mail($to,$email_subject,$email_body,$headers);
header("Location: index.html");
header("Location: Programs.html");
header("Location: Contact.html");
?>