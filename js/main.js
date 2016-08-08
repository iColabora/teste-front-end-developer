$(document).ready(function(){
    function clear_form(){
        $('form').form('clear')
    };
    
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
    
    // Inserir um novo insumo no formulario
    $(".novo_insumo").click(function(){
        $(".div_novo_insumo").html("<div class='ui one column very relaxed grid'>"+
                                   "<div class='column' id='dados_insumo'><br>"+
                                   "<div class='ui grid'><div class='ten wide column'>"+
                                   "<div class='ui fluid input field'><input placeholder='Marca' type='text' maxlength='255' name='marca_insumo[]' id='marca_insumo[]'></div></div>"+
                                   "<div class='six wide column'><div class='ui fluid input field'><input placeholder='Quantidade' type='text' maxlength='10' name='quantidade_insumo[]' id='quantidade_insumo[]'></div></div></div>"+
                                   "<div class='ui grid'><div class='ten wide column '><div class='ui fluid input field'>"+
                                   "<input placeholder='Descrição' type='text' name='descricao_insumo[]' id='descricao_insumo[]'></div></div>"+
                                   "<div class='six wide column'><div class='ui fluid input field'><input placeholder='Preço' type='text' name='preco_insumo[]' id='preco_insumo[]'>"+
                                   "</div></div></div></div></div>");
    });

    /** Valor Total **/
    
    var preco_insumo = 0;
    var preco_pedido = 0;
    var qtd_insumo = 0;
    var qtd_pedido = 0;
    var total = 0;
    
    $('input[name^="preco_insumo"]').each(function(){
        $('input[name^="preco_insumo"]').blur(function(){            
            preco_insumo = $(this).val();
            total = ((preco_insumo * qtd_insumo) + (preco_pedido * qtd_pedido));
            $("#valor_total").val(total);
        });
    });
    
    $("#preco_pedido").blur(function(){
        preco_pedido = $("#preco_pedido").val();
        total = ((preco_insumo * qtd_insumo) + (preco_pedido * qtd_pedido));
        $("#valor_total").val(total);
    });
    
    $('input[name^="quantidade_insumo"]').each(function(){
        $('input[name^="quantidade_insumo"]').blur(function(){            
            qtd_insumo = $(this).val();
            total = ((preco_insumo * qtd_insumo) + (preco_pedido * qtd_pedido));
            $("#valor_total").val(total);
        });
    });
    
    $("#qtd_material_pedido").blur(function(){
        qtd_pedido = $("#qtd_material_pedido").val();
        total = ((preco_insumo * qtd_insumo) + (preco_pedido * qtd_pedido));
        $("#valor_total").val(total);
    });
    
    /** Select process **/

    $(".btn_com_pedido").click(function(){
        $(".form_process").fadeOut();
        $(".search_process").fadeIn();
    });

    $(".btn_sem_pedido").click(function(){
        clear_form();
        $(".search_process").fadeOut();
        $(".form_process").fadeIn();
    });

    /** Mask Form **/
    
    $("#data_pedido").mask("99/99/9999");
    $("#telefone_solicitante").mask("(99)9999-9999");
    $("#cpf_solicitante").mask("999.999.999-99");

    /** Form **/
    
    $("#num_pedido").numeric();
    $('input[name^="quantidade_insumo"]').each(function(){
        $(this).numeric();
    });
    $("#cep_entrega").numeric();
    $("#cep_solicitante").numeric();
    $("#qtd_material_pedido").numeric();
    
    $('.form_process form').form({
        inline : false,
        on: 'blur',
        fields: {
            num_pedido: {
                identifier  : 'num_pedido',
                rules: [{
                    type   : 'empty',
                    prompt : 'Por favor, insira o numero do pedido.'
                }]
            },
            seleciona_material: {
                identifier  : 'seleciona_material',
                rules: [{
                    type   : 'empty',
                    prompt : 'Por favor, insira o material.'
                }]
            },
            marca_pedido: {
                identifier  : 'marca_pedido',
                rules: [{
                    type   : 'empty',
                    prompt : 'Por favor, insira a marca.'
                }]
            },
            data_pedido: {
                identifier  : 'data_pedido',
                rules: [{
                    type   : 'empty',
                    prompt : 'Por favor, insira a data do pedido.'
                }]
            },
            qtd_material_pedido: {
                identifier  : 'qtd_material_pedido',
                rules: [{
                    type   : 'empty',
                    prompt : 'Por favor, insira a quantidade do pedido.'
                }]
            },
            preco_pedido: {
                identifier  : 'preco_pedido',
                rules: [{
                    type   : 'empty',
                    prompt : 'Por favor, insira o preço do pedido.'
                }]
            },
            cep_entrega: {
                identifier  : 'cep_entrega',
                rules: [{
                    type   : 'empty',
                    prompt : 'Por favor, insira o CEP de entrega.'
                }]
            },
            nome_solicitante: {
                identifier  : 'nome_solicitante',
                rules: [{
                    type   : 'empty',
                    prompt : 'Por favor, insira seu nome.'
                }]
            },
            telefone_solicitante: {
                identifier  : 'telefone_solicitante',
                rules: [{
                    type   : 'empty',
                    prompt : 'Por favor, insira seu telefone.'
                }]
            },
            cpf_solicitante: {
                identifier  : 'cpf_solicitante',
                rules: [{
                    type   : 'empty',
                    prompt : 'Por favor, insira seu CPF.'
                }]
            },
            cep_solicitante: {
                identifier  : 'cep_solicitante',
                rules: [{
                    type   : 'empty',
                    prompt : 'Por favor, insira seu CEP.'
                }]
            }
        }
    });  

    /** CEP Entrega **/

    function limpa_formulario_cep_entrega() {
        // Limpa valores do formulario de cep.
        $("#cep_entrega").val("");
        $("#endereco_entrega").val("");
        $("#cidade_entrega").val("");
        $("#estado_entrega").val("");
    };
    
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
                $.getJSON("http://viacep.com.br/ws/"+cep+"/json/", function(dados) {                        
                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $("#endereco_entrega").val(dados.logradouro);
                        $("#cidade_entrega").val(dados.localidade);
                        $("#estado_entrega").val(dados.uf);
                    } else {
                        //CEP pesquisado não foi encontrado.
                        limpa_formulario_cep_entrega();
                        alert("CEP não encontrado.");
                    }
                });
            } else {
                //cep é inválido.
                limpa_formulario_cep_entrega();
                alert("Formato de CEP inválido.");
            }
        } else {
            //cep sem valor, limpa formulario.
            limpa_formulario_cep_entrega();
        }
    });

    /** CEP Solicitante **/

    function limpa_formulario_cep_solicitante() {
        // Limpa valores do formulario de cep.
        $("#cep_solicitante").val("");
        $("#endereco_solicitante").val("");
        $("#cidade_solicitante").val("");
        $("#estado_solicitante").val("");
    };
    
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
                $.getJSON("http://viacep.com.br/ws/"+cep+"/json/", function(dados) {
                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $("#endereco_solicitante").val(dados.logradouro);
                        $("#cidade_solicitante").val(dados.localidade);
                        $("#estado_solicitante").val(dados.uf);
                    } else {
                        //CEP pesquisado não foi encontrado.
                        limpa_formulario_cep_solicitante();
                        alert("CEP não encontrado.");
                    }
                });
            } else {
                //cep é inválido.
                limpa_formulario_cep_solicitante();
                alert("Formato de CEP inválido.");
            }
        } else {
            //cep sem valor, limpa formulario.
            limpa_formulario_cep_solicitante();
        }
    });
    
    /** Search Process **/
    
    $("#btn_search").click(function(){
        clear_form();
        $(".form_process").fadeIn();
        
        $('.form_process form').form('set values', {
            num_pedido     : '1',
            seleciona_material : 'HD',
            marca_pedido   : 'ASUS',
            data_pedido    : '01/01/2016',
            qtd_material_pedido : '2',
            preco_pedido   :  '80,00',
            nome_solicitante   :  'Caio de Lima Granero',
            telefone_solicitante   :  '(11)2422-4663',
            cpf_solicitante   :  '432.201.968-45',
            cep_solicitante   :  '07023240',
            endereco_solicitante : 'Rua Janaina',
            cidade_solicitante   :  'Guarulhos',
            estado_solicitante   :  'São Paulo',
            complemento_solicitante : '190',
            cep_entrega   :  '07023240',
            complemento_entrega   :  '190',
            endereco_entrega   :  'Rua Janaina',
            cidade_entrega   :  'Guarulhos',
            estado_entrega   :  'São Paulo',
            valor_total : '800,00'
        });        
        
        $('input[name^="marca_insumo"]').each(function(){
            $(this).val('ASUS');            
        });

        $('input[name^="quantidade_insumo"]').each(function(){
            $(this).val('2');
        });
        
        $('input[name^="descricao_insumo"]').each(function(){
            $(this).val('melhor insumo');
        });
        
        $('input[name^="preco_insumo"]').each(function(){
            $(this).val('80,00');
        });
    });
});