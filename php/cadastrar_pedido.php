<?php 

	include("conexao_mysql.php");

	//Pegando dados do formulário.
	$solicitante = $_POST["select_solicitantes"];
	$data = date('d/m/Y', strtotime($_POST["data_de_compra_p"]));
	$cep = $_POST["cep_p"];
	$rua = $_POST["rua_p"];
	$numero = $_POST["numero_p"];
	$bairro = $_POST["bairro_p"];
	$cidade = $_POST["cidade_p"];
	$estado = $_POST["estado_p"];
	$pais = $_POST["pais_p"];

	$insert_seguro = $pdo->prepare("INSERT INTO 
		pedidos(id_solicitante, data_de_compra, cep, rua, numero, bairro, cidade, estado, pais)
		VALUES(:id_solicitante, :data_de_compra, :cep, :rua, :numero, :bairro, :cidade, :estado, :pais)");
	
	//Atribuindo valores do formulário o bando de dados.
	$insert_seguro->bindValue(":id_solicitante", $solicitante);
	$insert_seguro->bindValue(":data_de_compra", $data);
	$insert_seguro->bindValue(":cep", $cep);
	$insert_seguro->bindValue(":rua", $rua);
	$insert_seguro->bindValue(":numero", $numero);
	$insert_seguro->bindValue(":bairro", $bairro);
	$insert_seguro->bindValue(":cidade", $cidade);
	$insert_seguro->bindValue(":estado", $estado);
	$insert_seguro->bindValue(":pais", $pais);

	$insert_seguro->execute();
 ?>