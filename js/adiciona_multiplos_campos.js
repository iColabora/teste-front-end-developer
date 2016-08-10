/* JS RESPONSÁVEL POR ADICIONAR CAMPOS DINÂMICOS DE PEDIDO E INSUMO */
/* NAO INCLUÍ O NUMERO DO PEDIDO, POIS ACREDITO QUE PODERIA SER UMA SEQUENCIA AUTOMÁTICA */

$(function() {

    var divContent = $('#material');
    var botaoAdicionar = $('#add_Material');
    var i = 1;

    $(botaoAdicionar).click(function()
    {
        var linha = $('<div class="conteudoMaterial"><br><br>'+
                        '<div class="form-group"> '+
                            '<h3>Dados do pedido</i></h3>'+
                            '<label for="pedido_material" class="control-label">Material</label>'+
                            '<select type="text" class="form-control" id="pedido_material" placeholder="" name="pedido_material[]">'+
                            '<option value=""> Selecione um material </option>'+
                            '<option value="1"> Desktop </option>'+
                            '<option value="2"> Notebook </option>'+
                            '<option value="3"> Periférios </option>'+
                            '<option value="4"> Software </option>'+
                            '</select>'+
                        '</div>'+

                        '<div class="form-group">'+
                            '<label for="pedido_marca" class="control-label">Marca</label>'+
                            '<input type="text" class="form-control" id="pedido_marca" placeholder="" name="pedido_marca[]">'+
                        '</div>'+

                        '<div class="form-group">'+
                            '<label for="pedido_data_compra" class="control-label">Data da compra</label>'+
                            '<input type="date" class="form-control" id="pedido_data_compra" placeholder="" name="pedido_data_compra[]">'+
                        '</div>'+
                            
                        '<div class="row">'+
                            '<div class="col-xs-6">'+
                                '<div class="form-group">'+
                                    '<label for="pedido_quantidade" class="control-label">Quantidade</label>'+
                                    '<input type="number" class="form-control" id="pedido_quantidade" placeholder="" name="pedido_quantidade[]" required>'+
                                '</div>'+
                            '</div>'+
                                     
                            '<div class="col-xs-6">'+    
                                '<div class="form-group">'+
                                '<label for="pedido_preco" class="control-label">Preço total</label>'+
                                '<input type="number" class="form-control" id="pedido_preco" placeholder="" name="pedido_preco[]" required>'+
                                '</div>'+
                            '</div>'+
                        '</div>' +
                        '<a href="#" id="linkRemover"><i class="fa fa-times" aria-hidden="true"></i></a></div></div>').appendTo(divContent);

        $('#removeHidden').remove();
        i++;
        $('<input type="hidden" name="quantidadeCampos" value="'+i+'" id="removehidden">').appendTo(divContent);
        linha.find("a").on("click", function() {
            $('<input type="hidden" name="quantidadeCampos" value="'+i+'" id="removeHidden">').appendTo(divContent);
            $(this).parent('.conteudoMaterial').remove();

        });
    });
});

$(function() {

    var divContent = $('#insumo');
    var botaoAdicionar = $('#add_Insumo');
    var i = 1;

    $(botaoAdicionar).click(function()
    {
        var linha = $('<div class="conteudoInsumo"><br><br>'+
                        '<div class="form-group"> '+
                            '<h3>Dados do pedido</i></h3>'+
                            '<label for="insumo_material" class="control-label">Material</label>'+
                            '<select type="text" class="form-control" id="insumo_material" placeholder="" name="insumo_material[]">'+
                            '<option value=""> Selecione um material </option>'+
                            '<option value="1"> Desktop </option>'+
                            '<option value="2"> Notebook </option>'+
                            '<option value="3"> Periférios </option>'+
                            '<option value="4"> Software </option>'+
                            '</select>'+
                        '</div>'+

                        '<div class="form-group">'+
                            '<label for="insumo_marca" class="control-label">Marca</label>'+
                            '<input type="text" class="form-control" id="insumo_marca" placeholder="" name="insumo_marca[]">'+
                        '</div>'+

                        '<div class="form-group">'+
                            '<label for="insumo_descricao" class="control-label">Descricao</label>'+
                            '<input type="text" class="form-control" id="insumo_descricao" placeholder="" name="insumo_descricao[]">'+
                        '</div>'+
                            
                        '<div class="row">'+
                            '<div class="col-xs-6">'+
                                '<div class="form-group">'+
                                    '<label for="insumo_quantidade" class="control-label">Quantidade</label>'+
                                    '<input type="number" class="form-control" id="insumo_quantidade" placeholder="" name="insumo_quantidade[]" required>'+
                                '</div>'+
                            '</div>'+
                                     
                            '<div class="col-xs-6">'+    
                                '<div class="form-group">'+
                                '<label for="insumo_preco" class="control-label">Preço</label>'+
                                '<input type="number" class="form-control" id="insumo_preco" placeholder="" name="insumo_preco[] required">'+
                                '</div>'+
                            '</div>'+
                        '</div>' +
                        '<a href="#" id="linkRemover"><i class="fa fa-times" aria-hidden="true"></i></a></div></div>').appendTo(divContent);

        $('#removeHidden').remove();
        i++;
        $('<input type="hidden" name="quantidadeCampos" value="'+i+'" id="removehidden">').appendTo(divContent);
        linha.find("a").on("click", function() {
            $('<input type="hidden" name="quantidadeCampos" value="'+i+'" id="removeHidden">').appendTo(divContent);
            $(this).parent('.conteudoInsumo').remove();

        });
    });
});