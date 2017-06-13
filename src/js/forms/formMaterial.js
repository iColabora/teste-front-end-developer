var FormMaterial = function(core, pedido, showContentFn) {

    var formMaterial = null;

    this.init = function() {
        var $this = this;

        formMaterial = new FormWizard('.form-wizard.form-material', {
            id: {

            },
            nome: {
                rules: 'required'
            },
            marca: {
                rules: 'required'
            },
            quantidade: {
                rules: 'required'
            },
            preco: {
                rules: 'required'
            }
        }, function() {
            $this.submit();
        });

        $('.btn-add-material').click(function() {
            $this.addMaterial({});
        });

        this.load();
    }

    this.submit = function() {
        pedido.setMaterial(this.constructObject(formMaterial.get('id'), formMaterial.get('nome'), formMaterial.get('marca'), formMaterial.get('quantidade'), formMaterial.get('preco')));
        core.paginatorForms.setSelectedPage('formInsumo');
    }

    this.constructObject = function(id, nome, marca, quantidade, preco) {
        if (Array.isArray(id)) {
            var objs = [];
            for (var i in id) {
                objs.push({
                    id: id[i],
                    nome: nome[i],
                    marca: marca[i],
                    quantidade: quantidade[i],
                    preco: preco[i]
                });
            }
            return objs;
        }

        return [{
            id: id,
            nome: nome,
            marca: marca,
            quantidade: quantidade,
            preco: preco
        }];
    }

    this.htmlMaterial = function(material) {
        var li = '<li class="list-group-item"><input type="hidden" data-field="id" name="id[]" class="form-control" value="'+(material.id ? material.id : 0)+'" id="id"><div class="form-group"><label for="nome" class="control-label">Nome</label><input type="text" value="'+(material.nome ? material.nome : '')+'" name="nome[]" class="form-control" data-field="nome" placeholder="Nome"></div><div class="row"><div class="col col-md-4"><div class="form-group"><label for="marca" class="control-label">Marca</label><input type="text" name="marca[]" class="form-control" value="'+(material.marca ? material.marca : '')+'" data-field="marca" placeholder="Marca"></div></div><div class="col col-md-3"><div class="form-group"><label for="quantidade" class="control-label">Quantidade</label><input type="number" name="quantidade[]" class="form-control" value="'+(material.quantidade ? material.quantidade : 0)+'" data-field="quantidade" placeholder="Quantidade"></div></div><div class="col col-md-5"><div class="form-group"><label for="preco" class="control-label">Preço R$</label><input type="number" name="preco[]" value="'+(material.preco ? material.preco : 0)+'" class="form-control" data-field="preco" placeholder="Preço"></div></div></div></li>';
        return li;
    }

    this.addMaterial = function(material) {
        $('.list-group.list-material').append(this.htmlMaterial(material));
        formMaterial.reload();
    }

    this.load = function() {
        var $this = this;

        var id = pedido.get('id');

        if (id = 0 || !id) {
            showContentFn();
        } else {
            Database.findMaterialByIdPedido(pedido.get('id'), function(result) {
                if (result.length > 0) {
                    $('.list-group.list-material').html('');
                    for (var i in result) {
                        $this.injectHtmlMaterial(result[i]);
                    }
                    formMaterial.reload();
                    showContentFn();
                } else {
                    showContentFn();
                }
            });
        }
    }

    this.injectHtmlMaterial = function(material) {
        $('.list-group.list-material').append(this.htmlMaterial(material));
    }

    this.init();

}