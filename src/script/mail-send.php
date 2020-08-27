<?php 

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$season = $_POST['season'];
$distance = $_POST['distance'];
$wait = $_POST['wait'];
$wait_time = $_POST['wait_time'];
$quantity = $_POST['quantity'];
$childs_availible = $_POST['childs_availible'];
$child_quantity = $_POST['child_quantity'];

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.ru';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'sunduck248@gmail.com'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'myloForDev*(#1).'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('sunduck465@mail.ru'); // от кого будет уходить письмо?
$mail->addAddress('sebepay138@sanizr.com');     // Кому будет уходить письмо 
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Заявка с тестового сайта';
$mail->Body    = '' . ' сезон: '  .$season . ' distance:  ' .$distance . '<br>wait & time: '$wait . .$wait_time . ' <br> quantity: ' .$quantity . ' childs_availible : ' .$childs_availible . ' child_quantity: ' .$child_quantity;
$mail->AltBody = '';

if(!$mail->send()) {
    echo 'Error';
} else {
    header('location: thank-you.html');
}
?>