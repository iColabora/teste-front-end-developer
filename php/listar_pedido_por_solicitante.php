<?php 
    
    include("conexao_mysql.php");
    $buscar_usuario = $pdo->prepare("SELECT solicitantes.nome as 'nome', COUNT(pedidos.id) as 'quantidade' FROM pedidos, solicitantes WHERE pedidos.id_solicitante = solicitantes.id group by solicitantes.nome");
    $buscar_usuario->execute();

    while ($linha = $buscar_usuario->fetch(PDO::FETCH_ASSOC)) {
        $vetor[] = array_map("utf8_encode", $linha);
    }

    echo json_encode($vetor);
?>