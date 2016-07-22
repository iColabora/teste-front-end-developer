$(document).ready(function(){

    /** Header **/

    $("#process_text").mouseover(function(){
        $("#nav-dashboards").fadeOut();
        $(".dashboards").fadeOut();
        $(".chart1").fadeOut();
        $(".chart2").fadeOut();
        $(".table1").fadeOut();
        $("#nav-process").fadeIn();
        $(".choice_process").fadeIn();

    });

    $("#dashboards").mouseover(function(){
        $("#nav-process").fadeOut();
        $(".choice_process").fadeOut();
        $(".form_process").fadeOut();
        $(".search_process").fadeOut();
        $("#nav-dashboards").fadeIn();
    });
    
    $("#dashboard1_link").mouseover(function(){
        $(".table1").fadeOut(); 
        $(".chart2").fadeOut(); 
        $(".charts").fadeIn();
        $(".chart1").fadeIn(); 
    });
    
    $("#dashboard2_link").mouseover(function(){
        $(".table1").fadeOut(); 
        $(".chart1").fadeOut(); 
        $(".charts").fadeIn();
        $(".chart2").fadeIn(); 
    });
    
    $("#dashboard3_link").mouseover(function(){
        $(".chart2").fadeOut(); 
        $(".chart1").fadeOut(); 
        $(".charts").fadeIn();
        $(".table1").fadeIn(); 
    });
    
    $(".novo_insumo").click(function(){
        $(".div_novo_insumo").html("<div class='ui one column very relaxed grid'>"+
                                   "<div class='column' id='dados_insumo'><br>"+
                                   "<div class='ui grid'><div class='ten wide column'>"+
                                   "<div class='ui fluid input field'><input placeholder='Marca' type='text' maxlength='255' name='marca_insumo' id='marca_insumo'></div></div>"+
                                   "<div class='six wide column'><div class='ui fluid input field'><input placeholder='Quantidade' type='text' maxlength='10' name='quantidade_insumo' id='quantidade_insumo'></div></div></div>"+
                                   "<div class='ui grid'><div class='ten wide column '><div class='ui fluid input field'>"+
                                   "<input placeholder='Descrição' type='text' name='descricao_insumo' id='descricao_insumo'></div></div>"+
                                   "<div class='six wide column'><div class='ui fluid input field'><input placeholder='Preço' type='text' name='preco_insumo' id='preco_insumo'>"+
                                   "</div></div></div></div></div>");
    });

    /** Total value **/
    
    var preco_insumo = 0;
    var preco_pedido = 0;
    var qtd_insumo = 0;
    var qtd_pedido = 0;
    var total = 0;
    
    $("#preco_insumo").blur(function(){
        preco_insumo = $("#preco_insumo").val();
        total = ((preco_insumo * qtd_insumo) + (preco_pedido * qtd_pedido));
        $("#valor_total").attr("placeholder", total);
        $("#valor_total").attr("value", total);
    });
    
    $("#preco_pedido").blur(function(){
        preco_pedido = $("#preco_pedido").val();
        total = ((preco_insumo * qtd_insumo) + (preco_pedido * qtd_pedido));
        $("#valor_total").attr("placeholder", total);
        $("#valor_total").attr("value", total);
    });
    
    $("#quantidade_insumo").blur(function(){
        qtd_insumo = $("#quantidade_insumo").val();
        total = ((preco_insumo * qtd_insumo) + (preco_pedido * qtd_pedido));
        $("#valor_total").attr("placeholder", total);
        $("#valor_total").attr("value", total);
    });
    
    $("#qtd_material_pedido").blur(function(){
        qtd_pedido = $("#qtd_material_pedido").val();
        total = ((preco_insumo * qtd_insumo) + (preco_pedido * qtd_pedido));
        $("#valor_total").attr("placeholder", total);
        $("#valor_total").attr("value", total);
    });
    
    /** Select process **/

    $(".btn_com_pedido").click(function(){
        $(".form_process").fadeOut();
        $(".search_process").fadeIn();
    });

    $(".btn_sem_pedido").click(function(){
        $(".search_process").fadeOut();
        $(".form_process").fadeIn();
    });

    /** Mask Form **/
    
    $("#data_pedido").mask("99/99/9999");
    $("#telefone_solicitante").mask("(99)9999-9999");
    $("#cpf_solicitante").mask("999.999.999-99");
    
    /** Form **/

    $('.form_process form').form({
        on: 'blur',
        fields: {
            num_pedido: {
                identifier  : 'num_pedido',
                rules: [{
                    type   : 'empty',
                    prompt : 'Por favor, insira o numero do pedido.'
                }]
            },
            marca_pedido: {
                identifier  : 'marca_pedido',
                rules: [{
                    type   : 'empty',
                    prompt : 'Please enter a value'
                }]
            },
            data_pedido: {
                identifier  : 'data_pedido',
                rules: [{
                    type   : 'empty',
                    prompt : 'Please enter a value'
                }]
            },
            qtd_material_pedido: {
                identifier  : 'qtd_material_pedido',
                rules: [{
                    type   : 'empty',
                    prompt : 'Please enter a value'
                }]
            },
            preco_pedido: {
                identifier  : 'preco_pedido',
                rules: [{
                    type   : 'empty',
                    prompt : 'Please enter a value'
                }]
            },
            cep_entrega: {
                identifier  : 'cep_entrega',
                rules: [{
                    type   : 'empty',
                    prompt : 'Please enter a value'
                }]
            },
            endereco_entrega: {
                identifier  : 'endereco_entrega',
                rules: [{
                    type   : 'empty',
                    prompt : 'Please enter a value'
                }]
            },
            complemento_entrega: {
                identifier  : 'complemento_entrega',
                rules: [{
                    type   : 'empty',
                    prompt : 'Please enter a value'
                }]
            },
            cidade_entrega: {
                identifier  : 'cidade_entrega',
                rules: [{
                    type   : 'empty',
                    prompt : 'Please enter a value'
                }]
            },
            estado_entrega: {
                identifier  : 'estado_entrega',
                rules: [{
                    type   : 'empty',
                    prompt : 'Please enter a value'
                }]
            },
            nome_solicitante: {
                identifier  : 'nome_solicitante',
                rules: [{
                    type   : 'empty',
                    prompt : 'Please enter a value'
                }]
            },
            telefone_solicitante: {
                identifier  : 'telefone_solicitante',
                rules: [{
                    type   : 'empty',
                    prompt : 'Please enter a value'
                }]
            },
            cpf_solicitante: {
                identifier  : 'cpf_solicitante',
                rules: [{
                    type   : 'empty',
                    prompt : 'Please enter a value'
                }]
            },
            cep_solicitante: {
                identifier  : 'cep_solicitante',
                rules: [{
                    type   : 'empty',
                    prompt : 'Please enter a value'
                }]
            },
            endereco_solicitante: {
                identifier  : 'endereco_solicitante',
                rules: [{
                    type   : 'empty',
                    prompt : 'Please enter a value'
                }]
            },
            estado_solicitante: {
                identifier  : 'estado_solicitante',
                rules: [{
                    type   : 'empty',
                    prompt : 'Please enter a value'
                }]
            },
            cidade_solicitante: {
                identifier  : 'cidade_solicitante',
                rules: [{
                    type   : 'empty',
                    prompt : 'Please enter a value'
                }]
            },
            complemento_solicitante: {
                identifier  : 'complemento_solicitante',
                rules: [{
                    type   : 'empty',
                    prompt : 'Please enter a value'
                }]
            },
            
        }
    });  

    /** CEP Entrega **/

    function limpa_formulário_cep_entrega() {
        // Limpa valores do formulário de cep.
        $("#cep_entrega").val("");
        $("#endereco_entrega").val("");
        $("#cidade_entrega").val("");
        $("#estado_entrega").val("");
    }

    limpa_formulário_cep_entrega();
    //Quando o campo cep perde o foco.
    $("#cep_entrega").blur(function() {
        //Nova variável "cep" somente com dígitos.
        var cep = $(this).val().replace(/\D/g, '');
        //Verifica se campo cep possui valor informado.
        if (cep != "") {
            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if(validacep.test(cep)) {
                //Preenche os campos com "..." enquanto consulta webservice.
                $("#endereco_entrega").val("...")
                $("#cidade_entrega").val("...")
                $("#estado_entrega").val("...")

                //Consulta o webservice viacep.com.br/
                $.getJSON("//viacep.com.br/ws/"+ cep +"/json/?callback=", function(dados) {                        
                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $("#endereco_entrega").val(dados.logradouro);
                        $("#cidade_entrega").val(dados.localidade);
                        $("#estado_entrega").val(dados.uf);
                    } else {
                        //CEP pesquisado não foi encontrado.
                        limpa_formulário_cep_entrega();
                        alert("CEP não encontrado.");
                    }
                });
            } else {
                //cep é inválido.
                limpa_formulário_cep_entrega();
                alert("Formato de CEP inválido.");
            }
        } else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep_entrega();
        }
    });

    /** CEP Solicitante **/

    function limpa_formulário_cep_solicitante() {
        // Limpa valores do formulário de cep.
        $("#cep_solicitante").val("");
        $("#endereco_solicitante").val("");
        $("#cidade_solicitante").val("");
        $("#estado_solicitante").val("");
    }

    limpa_formulário_cep_solicitante();
    //Quando o campo cep perde o foco.
    $("#cep_solicitante").blur(function() {
        //Nova variável "cep" somente com dígitos.
        var cep = $(this).val().replace(/\D/g, '');
        //Verifica se campo cep possui valor informado.
        if (cep != "") {
            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if(validacep.test(cep)) {
                //Preenche os campos com "..." enquanto consulta webservice.
                $("#endereco_solicitante").val("...")
                $("#cidade_solicitante").val("...")
                $("#estado_solicitante").val("...")

                //Consulta o webservice viacep.com.br/
                $.getJSON("//viacep.com.br/ws/"+ cep +"/json/?callback=", function(dados) {
                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $("#endereco_solicitante").val(dados.logradouro);
                        $("#cidade_solicitante").val(dados.localidade);
                        $("#estado_solicitante").val(dados.uf);
                    } else {
                        //CEP pesquisado não foi encontrado.
                        limpa_formulário_cep_solicitante();
                        alert("CEP não encontrado.");
                    }
                });
            } else {
                //cep é inválido.
                limpa_formulário_cep_solicitante();
                alert("Formato de CEP inválido.");
            }
        } else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep_solicitante();
        }
    });
})