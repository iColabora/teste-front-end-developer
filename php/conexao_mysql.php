<?php
	
	//Conexão com o banco de dados
	try {
		
		$pdo = new PDO("mysql:host=localhost;dbname=base_de_dados", "root", "");
	}
	catch (Exception $mensagem) {
		echo $mensagem->getMessage();
	}

?>

