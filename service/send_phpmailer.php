<?php
	error_reporting( E_ALL );
	ini_set('display_errors', 1);
	
	setlocale(LC_ALL,"es_ES");

// RECUPERO CAMPOS DEL FORM

	$post_requestdate = date("Y-m-d H:i:s");
	/*$form_name = isset($_REQUEST['nombre'])? $_REQUEST['nombre'] : '';
	$form_lastname = isset($_REQUEST['apellido'])? $_REQUEST['apellido'] : '';
	$form_email = isset($_REQUEST['email'])? $_REQUEST['email'] : '';
	$form_phone = isset($_REQUEST['telefono'])? $_REQUEST['telefono'] : '';
	//$form_company = isset($_REQUEST['empresa'])? $_REQUEST['empresa'] : '';

	//$form_industry = isset($_REQUEST['industria'])? $_REQUEST['industria'] : '';
	$form_country = isset($_REQUEST['pais'])? $_REQUEST['pais'] : '';
	$form_state = isset($_REQUEST['provincia'])? $_REQUEST['provincia'] : '';
	$form_city = isset($_REQUEST['localidad'])? $_REQUEST['localidad'] : '';
	$form_consulta = isset($_REQUEST['consulta'])? $_REQUEST['consulta'] : '';
	$form_comments = isset($_REQUEST['comentarios'])? $_REQUEST['comentarios'] : '';
	$form_conociste = isset($_REQUEST['como_conociste'])? $_REQUEST['como_conociste'] : '';*/

	
	//mensaje que voy a aenvair

	$form_name = isset($_REQUEST['name'])? $_REQUEST['name'] : '';
	$form_email = isset($_REQUEST['email'])? $_REQUEST['email'] : '';
	$form_tel = isset($_REQUEST['tel'])? $_REQUEST['tel'] : '';
	$form_company = isset($_REQUEST['company'])? $_REQUEST['company'] : '';
	$form_message = isset($_REQUEST['message'])? $_REQUEST['message'] : '';

	$message = '<html><body>';
	$message .= '<h1>Formulario de Contacto de New AgroCoin</h1>';
	$message .= '<table rules="all" style="border-color: #E8E8E8; width:100%" cellpadding="10" width="100%">';
	$message .= "<tr><td><strong>Enviado:</strong> </td><td>" . $post_requestdate . "</td></tr>";
	$message .= "<tr><td><strong>Nombre:</strong> </td><td>" . strip_tags($form_name) . "</td></tr>";
	$message .= "<tr><td><strong>Email:</strong> </td><td>" . strip_tags($form_email) . "</td></tr>";
	$message .= "<tr><td><strong>Telefono:</strong> </td><td>" . strip_tags($form_tel) . "</td></tr>";
	$message .= "<tr><td><strong>Empresa:</strong> </td><td>" . strip_tags($form_company) . "</td></tr>";
	$message .= "<tr><td><strong>Mensaje:</strong> </td><td>" . strip_tags($form_message) . "</td></tr>";
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
define('SMTP_FROMNAME', 'Mesaje de Sitio Web ');

$to= "comercial@newagrocoin.com";//donde lo envio
$subject = 'Mensaje de WEB' . $form_name.' '.$form_email;
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
