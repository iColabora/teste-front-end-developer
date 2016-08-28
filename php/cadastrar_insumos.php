<?php 

	include("conexao_mysql.php");

	//Pegando dados do formulário.
	$id_pedido = $_POST["select_insumos_pedidos"];
	$id_material = $_POST["select_insumos_material"];
	$descricao = $_POST["descricao_i"];
	$preco = $_POST["preco_i"];
	$quantidade = $_POST["quantidade_i"];

	$insert_seguro = $pdo->prepare("INSERT INTO 
		insumos(id_pedido, id_material, descricao, preco, quantidade)
		VALUES(:id_pedido, :id_material, :descricao, :preco, :quantidade)");
	

	//Atribuindo valores do formulário o bando de dados.
	$insert_seguro->bindValue(":id_pedido", $id_pedido);
	$insert_seguro->bindValue(":id_material", $id_material);
	$insert_seguro->bindValue(":descricao", $descricao);
	$insert_seguro->bindValue(":preco", $preco);
	$insert_seguro->bindValue(":quantidade", $quantidade);

	$insert_seguro->execute();
 ?>