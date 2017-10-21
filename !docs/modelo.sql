--SELECT DATE(data_de_compra) as data, count(id) as total FROM pedidos GROUP BY  DATE(data_de_compra) ORDER BY DATE(data_de_compra) ASC

--SELECT s.nome, count(s.id) total FROM pedidos p INNER JOIN solicitantes s ON s.id = p.id_solicitante GROUP BY s.id

--http://192.241.152.185/SELECT p.id, s.nome, p.data_de_compra, p.cep, p.rua, p.numero, p.bairro, p.cidade, p.estado, p.pais FROM pedidos p INNER JOIN solicitantes s ON s.id = p.id_solicitante ORDER BY id ASC