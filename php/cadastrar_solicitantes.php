<?php 

	include("conexao_mysql.php");

	//Pegando dados do formulário.
	$nome = $_POST["nome_s"];
	$telefone = $_POST["telefone_s"];
	$cpf = $_POST["cpf_s"];
	$cep = $_POST["cep_s"];
	$rua = $_POST["rua_s"];
	$numero = $_POST["numero_s"];
	$bairro = $_POST["bairro_s"];
	$cidade = $_POST["cidade_s"];
	$estado = $_POST["estado_s"];
	$pais = $_POST["pais_s"];

	$insert_seguro = $pdo->prepare("INSERT INTO 
		solicitantes(nome, telefone, cpf, cep, rua, numero, bairro, cidade, estado, pais)
		VALUES(:nome, :telefone, :cpf, :cep, :rua, :numero, :bairro, :cidade, :estado, :pais)");
	

	//Atribuindo valores do formulário o bando de dados.
	$insert_seguro->bindValue(":nome", $nome);
	$insert_seguro->bindValue(":telefone", $telefone);
	$insert_seguro->bindValue(":cpf", $cpf);
	$insert_seguro->bindValue(":cep", $cep);
	$insert_seguro->bindValue(":rua", $rua);
	$insert_seguro->bindValue(":numero", $numero);
	$insert_seguro->bindValue(":bairro", $bairro);
	$insert_seguro->bindValue(":cidade", $cidade);
	$insert_seguro->bindValue(":estado", $estado);
	$insert_seguro->bindValue(":pais", $pais);

	$insert_seguro->execute();
 ?>