// Get all for all
http://192.241.152.185/select * from solicitantes
http://192.241.152.185/select * from materiais
http://192.241.152.185/select * from insumos
http://192.241.152.185/select * from pedidos

// Dados do Pedido
http://192.241.152.185/select materiais.nome, materiais.marca, materiais.preco, materiais.quantidade, pedidos.numero, pedidos.data_de_compra from materiais join pedidos on pedidos.id=materiais.id_pedido

// Dados do Insumo
http://192.241.152.185/select insumos.quantidade, insumos.descricao, insumos.preco, materiais.marca from insumos join materiais on insumos.id_material= materiais.id

// Dados do solicitantes
http://192.241.152.185/select * from solicitantes

// Dados de entrega
 - Escolha entre entregar no endereço de cadastro ou por um endreço cadastrado
   com autocomplete

// Cálculos
 - Soma o total do pedido

// Busca
 - Pesquisar por numero do pedido
http://192.241.152.185/select materiais.nome, materiais.marca, materiais.preco, materiais.quantidade, pedidos.numero, pedidos.data_de_compra from materiais join pedidos on pedidos.id=materiais.id_pedido where pedidos.id={{ idPesquisa }}
