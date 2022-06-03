<?php
	error_reporting( E_ALL );
	ini_set('display_errors', 1);
	
	setlocale(LC_ALL,"es_ES");

// RECUPERO CAMPOS DEL FORM

	$post_requestdate = date("Y-m-d H:i:s");
	
	//mensaje que voy a envair	

	$form_suscription = isset($_REQUEST['suscription'])? $_REQUEST['suscription'] : '';

	$message = '<html><body>';
	$message .= '<h1>Suscripción de New AgroCoin</h1>';
	$message .= '<table rules="all" style="border-color: #E8E8E8; width:100%" cellpadding="10" width="100%">';
	$message .= "<tr><td><strong>Enviado:</strong> </td><td>" . $post_requestdate . "</td></tr>";
	$message .= "<tr><td><strong>Nuevo suscriptor:</strong> </td><td>" . strip_tags($form_suscription) . "</td></tr>";
	$message .= "</table>";
	$message .= "</body></html>";

//CON PHPMAILER

define('SMTP_HOST', 'c2030870.ferozo.com');
define('SMTP_PORT', '465');
define('SMTP_SECURE', 'ssl');
define('IS_HTML', true);
define('SMTPAUTH', true);// true o false, dejar false en caso de que no se necesite login
define('SMTP_USERNAME', 'tenco@tenco.com.ar');
define('SMTP_PASSWORD', 'Bonetaso16');
define('SMTP_FROM', 'tenco@tenco.com');
define('SMTP_FROMNAME', 'Nuevo Susciptor');

$to= "icanosa@newagro.com.ar";//donde lo envio "comercial@newagrocoin.com"
$subject = 'Suscripción Web: ' . $form_suscription /* $form_name.' '.$form_email */;
$texto = $message;
	    
	    include'../class/class.smtp.php';//llamo otra carpeta
	    include'../class/class.phpmailer.php';//llamo otra carpeta
            $mail = new phpmailer();

            $mail->CharSet = 'UTF-8';
            $mail->PluginDir = "../class/";
            $mail->Mailer = "smtp";
            $mail->Host = SMTP_HOST;
            $mail->Port = SMTP_PORT;
            $mail->SMTPAuth = SMTPAUTH;
            $mail->SMTPSecure = SMTP_SECURE;
            $mail->Username = SMTP_USERNAME;
            $mail->Password = SMTP_PASSWORD;
            $mail->IsHTML(IS_HTML);
            //$mail->SMTPDebug = 2;
            //Indicamos cual es nuestra dirección de correo y el nombre que 
            //queremos que vea el usuario que lee nuestro correo
            $mail->From = SMTP_FROM;
            $mail->FromName = SMTP_FROMNAME;

            //Indicamos cual es la dirección de destino del correo
            $mail->AddAddress($to);
		    //$mail->AddAddress('alejandro@agenciacapitan.com'); ---- En caso de QUERER COPIA DE MAIL

            //Asignamos asunto y cuerpo del mensaje
            $mail->Subject = $subject;
            $mail->Body = $texto;

            $sendResult = $mail->Send();
			
			//var_dump($sendResult);

			//echo $mail->ErrorInfo;

            if ($sendResult) {
                 header('Location: https://newagrocoin.com/#thanks'); 
                
            } else {
                echo "FAIL";
            }

?>
