var FormInsumo = function(core, pedido, showContentFn) {

    var formInsumo = null,
        options = '';

    this.init = function() {
        var $this = this;
        formInsumo = new FormWizard('.form-wizard.form-insumo', {
            id: {

            },
            descricao: {
                rules: 'required'
            },
            id_material: {
                rules: 'required',
                select: true
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

        $('.btn-add-insumo').click(function() {
            $this.addInsumo({});
        });

        this.load();
    };

    this.submit = function() {
        pedido.setInsumos(this.constructObject(formInsumo.get('id'), formInsumo.get('descricao'), formInsumo.get('id_material'), formInsumo.get('quantidade'), formInsumo.get('preco')));
        core.paginatorForms.setSelectedPage('formAddress');
    }

    this.constructObject = function(id, descricao, id_material, quantidade, preco) {
        if (Array.isArray(id)) {
            var objs = [];
            for (var i in id) {
                objs.push({
                    id: id[i],
                    descricao: descricao[i],
                    id_material: id_material[i],
                    quantidade: quantidade[i],
                    preco: preco[i]
                });
            }
            return objs;
        }

        return [{
            id: id,
            descricao: descricao,
            id_material: id_material,
            quantidade: quantidade,
            preco: preco
        }];
    }

    this.htmlInsumo = function(insumo) {
        var li = '<li class="list-group-item"><input type="hidden" name="id[]" data-field="id" value="'+(insumo.id ? insumo.id : 0)+'" class="form-control" id="id"><div class="form-group"><label class="control-label">Descrição</label><textarea class="form-control" name="descricao" id="descricao" data-field="descricao" rows="3">'+(insumo.descricao ? insumo.descricao : '')+'</textarea></div><div class="row"><div class="col col-md-4"><div class="form-group"><label class="control-label">Material</label><select name="material" class="form-control sel-material" data-field="id_material"><option disabled="disabled" value="-1" selected="selected">Selecione um material</option>'+options+'</select></div></div><div class="col col-md-3"><div class="form-group"><label for="quantidade" class="control-label">Quantidade</label><input type="number" name="quantidade[]" value="'+(insumo.quantidade ? insumo.quantidade : 0)+'" class="form-control" data-field="quantidade" placeholder="Quantidade"></div></div><div class="col col-md-5"><div class="form-group"><label for="preco" class="control-label">Preço R$</label><input type="number" name="preco[]" value="'+(insumo.preco ? insumo.preco : 0)+'" class="form-control" data-field="preco" placeholder="Preço"></div></div></div></li>';
        return li;
    }

    this.addInsumo = function(insumo) {
        $('.list-group.list-insumos').append(this.htmlInsumo(insumo));
        formInsumo.reload();
    }

    this.load = function() {
        var $this = this;

        this.createSelectMaterial();

        var id = pedido.get('id');

        if (id = 0 || !id) {
            showContentFn();
        } else {
            Database.findInsumoByIdPedido(pedido.get('id'), function(result) {
                if (result.length > 0) {
                    $('.list-group.list-insumos').html('');
                    for (var i in result) {
                        $this.injectHtmlInsumo(result[i]);
                    }
                    formInsumo.reload();
                    showContentFn();
                } else {
                    showContentFn();
                }
            });
        }
    }

    this.createSelectMaterial = function() {
        var materiais = pedido.getMateriais();

        for (var i in materiais) {
            console.log(materiais);
            options = '<option value="'+(materiais[i].id == 0 ? i : materiais[i].id)+'">'+materiais[i].nome+'</option>';
        }
    }

    this.injectHtmlInsumo = function(insumo) {
        var $html = $(this.htmlInsumo(insumo));
        
        if (insumo.id_material) {
            $html.find('.sel-material').val(insumo.id_material);
        }
        $('.list-group.list-insumos').append($html);
    }

    this.init();

};