var FormFinish = function(core, pedido, showContentFn) {

    this.init = function() {
        this.mergeSolicitante();

        showContentFn();
    }

    this.mergeSolicitante = function() {
        var solicitante = pedido.getSolicitante();

        if (solicitante.id == 0) {
            Database.insertSolicitante(solicitante, function(result) {
                console.log(result);
            });
        } else {
            Database.updateSolicitante(solicitante, function(result) {
                console.log(result);
            });
        }
    };

    this.init();

};