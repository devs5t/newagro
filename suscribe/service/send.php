<?php
	error_reporting( E_ALL );
	ini_set('display_errors', 1);
	
	setlocale(LC_ALL,"es_ES");

// RECUPERO CAMPOS DEL FORM

	$post_requestdate = date("Y-m-d H:i:s");
	$form_suscription = isset($_REQUEST['suscription'])? $_REQUEST['suscription'] : '';	

	var_dump($form_suscription);

if($bool){
    echo "Mensaje enviado a "+$to;
}else{
    echo "Mensaje no enviado";
}

?>