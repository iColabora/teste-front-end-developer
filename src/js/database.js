var Database = {
    
    fetchAllPedidos: function(callback) {
        var query = "select p.numero, p.id, p.id_solicitante, s.nome, DATE_FORMAT(STR_TO_DATE(p.data_de_compra, '%Y-%m-%d'), '%d-%m-%Y') as data_de_compra, (SELECT SUM (m.quantidade*m.preco) FROM materiais as m WHERE m.id_pedido = p.id) as total_materiais, (SELECT SUM (i.quantidade*i.preco) FROM insumos as i WHERE i.id_pedido = p.id) as total_insumos from pedidos as p INNER JOIN solicitantes as s ON s.id = p.id_solicitante";
        this._execute(query, callback); 
    },

    findPedidoById: function(id, callback) {
        var query = "select p.numero, p.id, p.id_solicitante, s.nome, DATE_FORMAT(STR_TO_DATE(p.data_de_compra, '%Y-%m-%d'), '%d-%m-%Y') as data_de_compra, (SELECT SUM (m.quantidade*m.preco) FROM materiais as m WHERE m.id_pedido = p.id) as total_materiais, (SELECT SUM (i.quantidade*i.preco) FROM insumos as i WHERE i.id_pedido = p.id) as total_insumos from pedidos as p INNER JOIN solicitantes as s ON s.id = p.id_solicitante WHERE p.id = "+id;
        this._execute(query, callback);
    },

    findMaterialByIdPedido: function(id, callback) {
        var query = "SELECT * FROM materiais WHERE id_pedido = " + id;
        this._execute(query, callback); 
    },

    findInsumoByIdPedido: function(id, callback) {
        var query = "SELECT * FROM insumos WHERE id_pedido = " + id;
        this._execute(query, callback); 
    },

    findSolicitanteById: function(id, callback) {
        var query = "SELECT * FROM solicitantes WHERE id = " + id;
        this._execute(query, callback); 
    },

    findSolicitanteByCpf: function(cpf, callback) {
        var query = "SELECT * FROM solicitantes WHERE cpf = " + cpf;
        this._execute(query, callback); 
    },

    fetchAllSolicitantes: function(callback) {
        var query = "SELECT * FROM solicitantes";
        this._execute(query, callback); 
    },

    fetchPedidosPorDia: function(callback) {
        var query = "select count(*) as total, day(STR_TO_DATE(data_de_compra, '%Y-%m-%d')) as day from pedidos p group by day(STR_TO_DATE(data_de_compra, '%Y-%m-%d'))";
        this._execute(query, callback);
    },

    fetchPedidosPorSolicitantes: function(callback) {
        var query = "select count(*) total, s.nome from pedidos p inner join solicitantes s on s.id = p.id_solicitante group by p.id_solicitante";
        this._execute(query, callback);
    },

    insertPedido: function(pedido, callback) {
        var query = "INSERT INTO pedidos (id_solicitante, data_de_compra, cep, rua, numero, bairro, cidade, estado, pais) VALUES ("+pedido.id_solicitante+", '"+pedido.data_de_compra+"', '"+pedido.cep+"', '"+pedido.rua+"', '"+pedido.numero+"', '"+pedido.bairro+"', '"+pedido.cidade+"', '"+pedido.estado+"', '"+pedido.pais+"')";
        this._execute(query, callback);
    },

    insertSolicitante: function(solicitante, callback) {
        var query = "INSERT INTO solicitantes (nome, telefone, cpf, cep, rua, numero, bairro, cidade, estado, pais) VALUES ('"+solicitante.nome+"', '"+solicitante.telefone+"', '"+solicitante.cpf+"', '"+solicitante.cep+"', '"+solicitante.rua+"', "+solicitante.numero+", '"+solicitante.bairro+"', '"+solicitante.cidade+"', '"+solicitante.cidade+"', '"+solicitante.estado+"', '"+solicitante.pais+"')";
        this._execute(query, callback);
    },

    insertMaterial: function(id_pedido, material, callback) {
        var query = "INSERT INTO materiais (id_pedido, nome, marca, preco, quantidade) VALUES ("+id_pedido+", '"+material.nome+"', '"+material.marca+"', '"+material.marca+"', "+material.preco+", "+material.quantidade+")";
        this._execute(query, callback);
    },

    insertInsumo: function(id_pedido, insumo, callback) {
        var query = "INSERT INTO insumos (id_pedido, id_material, descricao, preco, quantidade) VALUES ("+id_pedido+", '"+insumo.id_material+"', '"+insumo.descricao+"', "+insumo.preco+", "+insumo.quantidade+")";
        this._execute(query, callback);
    },

    updatePedido: function(id, pedido, callback) {
        var query = "UPDATE pedidos SET id_solicitante = "+pedido.id_solicitante+", data_de_compra = '" + pedido.data_de_compra + "', cep = '"+pedido.cep+"', ";
        query += "rua = '"+pedido.rua+"', numero = "+pedido.numero+", bairro = '"+pedido.bairro+"', cidade = '"+pedido.cidade+"', estado = '"+pedido.estado+"', ";
        query += "pais = '"+pedido.pais+"' WHERE id = "+ id;
        this._execute(query, callback);
    },

    updateSolicitante: function(solicitante, callback) {
        var query = "UPDATE solicitantes SET nome = '"+solicitante.nome+"', telefone = '"+solicitante.telefone+"', cpf = '"+solicitante.cpf+"', cep = '"+solicitante.cep+"', ";
        query += "rua = '"+solicitante.rua+"', numero = "+solicitante.numero+", bairro = '"+solicitante.bairro+"', cidade = '"+solicitante.cidade+"', estado = '"+solicitante.estado+"', ";
        query += "pais = '"+solicitante.pais+"' WHERE id = "+ solicitante.id;
        this._execute(query, callback);
    },

    updateMaterial: function(id, id_pedido, material, callback) {
        var query = "UPDATE materiais SET id_pedido = "+id_pedido+", nome = '"+material.nome+"', marca = '"+material.marca+"', preco = '"+material.preco+"', ";
        query += "quantidade = "+material.quantidade+" WHERE id = "+id;
        this._execute(query, callback);
    },

    updateInsumo: function(id, id_pedido, insumo, callback) {
        var query = "UPDATE insumos SET id_pedido = "+id_pedido+", id_material = "+insumo.id_material+", descricao = '"+insumo.descricao+"', preco = '"+insumo.preco+"', ";
        query += "quantidade = "+insumo.quantidade+" WHERE id = "+id;
        this._execute(query, callback);
    },

    _execute: function(query, callback) {
        mysqlQuery(query, callback);
    }

}