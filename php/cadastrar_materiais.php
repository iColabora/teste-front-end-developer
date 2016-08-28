<?php 

	include("conexao_mysql.php");

	//Pegando dados do formulário.
	$id_pedido = $_POST["select_pedidos"];
	$nome = $_POST["nome_m"];
	$preco = $_POST["preco_m"];
	$quantidade = $_POST["quantidade_m"];

	$insert_seguro = $pdo->prepare("INSERT INTO 
		materiais (id_pedido, nome, preco, quantidade) 
		VALUES (:id_pedido, :nome, :preco, :quantidade)");
	
	//Atribuindo valores do formulário o bando de dados.
	$insert_seguro->bindValue(":id_pedido", $id_pedido);
	$insert_seguro->bindValue(":nome", $nome);
	$insert_seguro->bindValue(":preco", $preco);
	$insert_seguro->bindValue(":quantidade", $quantidade);

	$insert_seguro->execute();
 ?>