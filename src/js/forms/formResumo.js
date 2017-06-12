var FormResumo = function(core, pedido, showContentFn) {

    var formResumo = null;


    this.init = function() {
        var $this = this;
        formResumo = $('.form-resumo');

        this.setValueForPedido();
        this.setValuesForSolicitante();
        this.setValuesForMateriais();
        this.setValuesForInsumos();
        this.setValuesForInsurance();

        showContentFn();
    }

    this.setValueForPedido = function() {
        var infoPedido = formResumo.find('.info[data-info="pedido"]');

        var values = pedido.getData();
        this.setValue(infoPedido, values);
    }

    this.setValuesForSolicitante = function() {
        var infoPedido = formResumo.find('.info[data-info="solicitante"]');

        var values = pedido.getSolicitante();
        this.setValue(infoPedido, values);
    }

    this.getHtmlMaterial = function(material) {
        return '<li class="list-group-item"><div class="form-group"><label for="nome" class="control-label">Nome</label><span data-field="nome"></span>'+(material.nome)+'</div><div class="row"><div class="col col-md-4"><div class="form-group"><label for="marca" class="control-label">Marca</label><span data-field="marca">'+(material.marca)+'</span></div></div><div class="col col-md-3"><div class="form-group"><label for="quantidade" class="control-label">Quantidade</label><span data-field="quantidade">'+(material.quantidade)+'</span></div></div><div class="col col-md-5"><div class="form-group"><label for="preco" class="control-label">Preço R$</label><span data-field="preco">'+(material.preco)+'</span></div></div></div></li>';
    }

    this.setValuesForMateriais = function() {
        var materiais = pedido.getMateriais();

        for (var i in materiais) {
            formResumo.find('.list-material').append(this.getHtmlMaterial(materiais[i]));
        }
    }

    this.getHtmlInsumo = function(insumo) {
        return '<li class="list-group-item"><div class="form-group"><label class="control-label">Descrição</label><span data-field="descricao">'+(insumo.descricao)+'</span></div><div class="row"><div class="col col-md-4"><div class="form-group"><label class="control-label">Material</label><span data-field="material">'+(insumo.id_material)+'</span></div></div><div class="col col-md-3"><div class="form-group"><label for="quantidade" class="control-label">Quantidade</label><span data-field="quantidade">'+(insumo.quantidade)+'</span></div></div><div class="col col-md-5"><div class="form-group"><label for="preco" class="control-label">Preço R$</label><span data-field="preco">'+(insumo.preco)+'</span></div></div></div></li>';
    }

    this.setValuesForInsumos = function() {
        var insumos = pedido.getInsumos();

        for (var i in insumos) {
            formResumo.find('.list-insumos').append(this.getHtmlInsumo(insumos[i]));
        }
    }  

    this.setValuesForInsurance = function() {
        var insurance = pedido.getInsurance();
        var text = "";

        console.log(insurance);

        if (insurance == 's') {
            text = "Optou pelo seguro extra";
        } else {
            text = "Não optou pelo seguro extra";
        }

        formResumo.find('.insurance').text(text);
    }

    this.setValue = function(section, values) {
        for (var i in values) {
            var field = section.find('span[data-field="'+i+'"]');
            if (field) {
                field.text(values[i]);
            }
        }
    }

    this.init();

}