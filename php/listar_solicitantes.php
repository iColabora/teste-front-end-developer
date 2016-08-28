<?php 
	
	include("conexao_mysql.php");
	$buscar_usuario = $pdo->prepare("SELECT * FROM solicitantes");
	$buscar_usuario->execute();

	while ($linha = $buscar_usuario->fetch(PDO::FETCH_ASSOC)) {
		$vetor[] = array_map("utf8_encode", $linha);
	}

	echo json_encode($vetor);
 ?>