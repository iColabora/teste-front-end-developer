var Pedido = function() {

    var data = {};
    var solicitante = {};
    var materiais = [];
    var insumos = [];

    this.setData = function(d) {
        data = d;
    }

    this.getData = function() {
        return data;
    }

    this.setSolicitante = function(s) {
        solicitante = s;
    }

    this.get = function(k) {
        return data[k];
    }

};