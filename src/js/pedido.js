var Pedido = function() {

    var data = {};
    var solicitante = {};
    var materiais = [];
    var insumos = [];
    var insurance = '';

    this.setAddress = function(attrs) {
        for (var i in attrs) {
            data[i] = attrs[i];
        }
    }

    this.setData = function(d) {
        data = d;
    }

    this.getData = function() {
        return data;
    }

    this.setSolicitante = function(s) {
        solicitante = s;
    }
    
    this.getSolicitante = function() {
        return solicitante;
    }

    this.setMaterial = function(m) {
        materiais = m;
    }

    this.getMateriais = function() {
        return materiais;
    }

    this.setInsumos = function(i) {
        console.log('set insumos', insumos);
        insumos = i;
    }

    this.getInsumos = function() {
        console.log('get insumos', insumos);
        return insumos;
    }

    this.setInsurance = function(i) {
        insurance = i;
    }

    this.getInsurance = function() {
        return insurance;
    }

    this.get = function(k) {
        return data[k];
    }

};