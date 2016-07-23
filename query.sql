-- [GRÁFICO] - Quantidade de pedidos por dia;
SELECT count(id), data_de_compra
FROM pedidos
GROUP BY data_de_compra

-- [GRÁFICO] - Pedidos por solicitante;
SELECT pedidos.id, pedidos.id_solicitante 
FROM pedidos;

-- [TABELA] - Pedidos pendentes;

SELECT * 
FROM pedidos
WHERE data_de_compra == CURDATE();

-- Busca por número do pedido;

SELECT * 
FROM pedidos
INNER JOIN solicitantes ON (pedidos.id = solicitantes.id)
INNER JOIN insumos ON (pedidos.id = insumos.id)
INNER JOIN materiais ON (pedidos.id = materiais.id)
WHERE pedido.id = numero_do_pedido;