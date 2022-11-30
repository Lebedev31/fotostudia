<?php 

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$locations = $_POST['locations'];
$text = $_POST['text-file'];
$file = $_FILES['reviews'];


require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'tirionreg@gmail.com';                 // Наш логин
$mail->Password = 'uyotjfxwrewvmhvq';                           // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
 
$mail->setFrom('tirionreg@gmail.com', 'Fotostudiya');   // От кого письмо 
$mail->addAddress('andron24101991@gmail.com');     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML



$mail->Subject = 'Данные';
$mail->Body    = '
		Пользователь оставил данные <br> 
	Имя: ' . $name . ' <br>
	Номер телефона: ' . $phone . '<br>
	E-mail: ' . $email . '<br>
    Локация:' . $locations . '<br>
    Отзыв:' . $text . '';
   
    if (!empty($file['name'][0])) {
        for ($ct = 0; $ct < count($file['tmp_name']); $ct++) {
            $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name'][$ct]));
            $filename = $file['name'][$ct];
            if (move_uploaded_file($file['tmp_name'][$ct], $uploadfile)) {
                $mail->addAttachment($uploadfile, $filename);
                $rfile[] = "Файл $filename прикреплён";
            } else {
                $rfile[] = "Не удалось прикрепить файл $filename";
            }
        }   
    } 

  

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>