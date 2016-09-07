http://192.241.152.185/select * from solicitantes
http://192.241.152.185/select * from materiais
http://192.241.152.185/select * from insumos
http://192.241.152.185/select * from pedidos

http://192.241.152.185/select pedidos.numero, pedidos.data_de_compra from pedidos join materias on pedidos.id=materias.id_pedido

http://192.241.152.185/select materiais.nome, materiais.marca, materiais.preco, materiais.quantidade, pedidos.numero, pedidos.data_de_compra from materiais join pedidos on pedidos.id=materiais.id_pedido

http://192.241.152.185/select insumos.quantidade, insumos.descricao, insumos.descricao, materiais.marca from insumos join materiais on insumos.id_material= materiais.id


materiais
insumos
solicitantes
pedidos
