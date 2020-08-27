<?php

use PHPMailer\PHPMailer\PHPMailer;

require_once "PHPMailer/PHPMailer.php";
require_once "PHPMailer/SMTP.php";
require_once "PHPMailer/Exception.php";
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$season = $_POST['season'];
$distance = $_POST['distance'];
$wait = $_POST['wait'];
$wait_time = $_POST['wait_time'];
$quantity = $_POST['quantity'];
$childs_availible = $_POST['childs_availible'];
$child_quantity = $_POST['child_quantity'];
$child_age1 = $_POST['child_age1'];
$child_age2 = $_POST['child_age2'];
$child_age3 = $_POST['child_age3'];
$price_total = $_POST['price_total'];

if ($season === 'on') {
    $season = 'В период с октября по май';
} else {
    $season = 'В период с июня по сентябрь';
}

if ($wait === 'on') {
    $wait = 'Нужно';
} else {
    $wait = 'Не нужно';
}

if ($wait_time === '1') {
    $wait_time = $wait_time . ' час.';
} elseif ($wait_time > 1 && $wait_time < 5) {
    $wait_time = $wait_time . ' часа.';
} else {
    $wait_time = $wait_time . ' часов.';
}

if ($childs_availible === 'on') {
    $childs_availible = 'будут дети. Колличество: ' . $child_quantity . '. Возраст: ' . $child_age1 . ', ' . $child_age2 . ', ' . $child_age3 . '. ';
} else {
    $childs_availible = 'не будет детей. ';
}

$mail->isSMTP();                                  
$mail->Host = 'smtp.gmail.com';  		
$mail->SMTPAuth = true; 

$mail->Username = 'sunduck248@gmail.com'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'myloForDev*(#1).'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';   
$mail->Port = 465; 

$mail->From = 'sunduck248@gmail.com'; // от кого будет уходить письмо?
$mail->FromName = 'Roman';
$mail->addAddress('sebepay138@sanizr.com');     // Кому будет уходить письмо 
// //$mail->addAddress('ellen@example.com');               // Name is optional
// //$mail->addReplyTo('info@example.com', 'Information');
// //$mail->addCC('cc@example.com');
// //$mail->addBCC('bcc@example.com');
// //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
// //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Subject!';
$mail->Body    = $season . ' хотят заказать трансфер - ' . $quantity . ' человек' . '<br>' . $wait . ' их будет ждать примерно ' . $wait_time . '<br> Им нужно будет проехать примерно: ' . $distance . 'км. ' . '<br> У них ' . $childs_availible;
$mail->AltBody = $season . ' хотят заказать трансфер - ' . $quantity . ' человек' .  $wait . ' их будет ждать' . $wait_time . 'Им нужно будет проехать примерно: ' . $distance . 'км. ' . 'У них ' . $childs_availible . '<br>Калькулятор на сайте насчитал - <b>' . $price_total . '</b>';


if($mail->send()) {
    echo 'Message sent!';
} else {
    echo 'error: ' . $mail->ErrorInfo;
}
?>