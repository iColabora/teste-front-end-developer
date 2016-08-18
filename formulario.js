$(document).ready(function(){

    //Mostra formularios sequencialmente
    $("#avancar-pedido").click(function(){
      $(".insumo").removeClass("hide");
    });

    $("#avancar-insumo").click(function(){
      $(".pedido").addClass("hide");
      $(".insumo").addClass("hide");
      $(".solicitante").removeClass("hide");
    });

    $("#avancar-solicitante").click(function(){
      $(".entrega").removeClass("hide");
    });

    $("#avancar-entrega").click(function(){
      $(".pedido").addClass("hide");
      $(".insumo").addClass("hide");
      $(".solicitante").addClass("hide");
      $(".entrega").addClass("hide");
      $(".calculo").removeClass("hide");
    });


    //Adiciona calendario no input data
    $(function() {
        $("#data-compra").datepicker({
            dateFormat: 'dd/mm/yy',
            dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'],
            dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
            dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
            monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
            monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
            changeMonth: true,
            changeYear: true
        });
    });


    //Verifica inputs vazios
    $("#avancar-pedido").click(function(){
        var cont = 0;
        $("#numero-pedido, #marca-material, #data-compra, #quantidade-material, #preco-material").each(function(){
            if($(this).val() == "")
                {
                    $(this).css({"border" : "1px solid #c00"});
                    cont++;

                    $(".insumo").addClass("hide");
                } 
            else if($(this).val() != "")
                {
                    $(this).css({"border" : "1px solid #0c0"});
                }
        });

        if(cont == 0)
            {
                $(".formulario").submit();
            }
    });

    $("#avancar-insumo").click(function(){
        var cont = 0;
        $("#marca-insumo, #descricao-insumo, #quantidade-insumo, #preco-insumo").each(function(){
            if($(this).val() == "")
                {
                    $(this).css({"border" : "1px solid #c00"});
                    cont++;

                    $(".solicitante").addClass("hide");
                } 
            else if($(this).val() != "")
                {
                    $(this).css({"border" : "1px solid #0c0"});
                }
        });
    });

    $("#avancar-solicitante").click(function(){
        var cont = 0;
        $("#nome, #telefone, #cpf, #cep, #endereco, #complemento, #cidade, #estado").each(function(){
            if($(this).val() == "")
                {
                    $(this).css({"border" : "1px solid #c00"});
                    cont++;

                    $(".entrega").addClass("hide");
                } 
            else if($(this).val() != "")
                {
                    $(this).css({"border" : "1px solid #0c0"});
                }
        });
    });

    $("#avancar-entrega").click(function(){
        var cont = 0;
        $("#cep-entrega, #endereco-entrega, #complemento-entrega, #cidade-entrega").each(function(){
            if($(this).val() == "")
                {
                    $(this).css({"border" : "1px solid #c00"});
                    cont++;

                    $(".calculo").addClass("hide");
                } 
            else if($(this).val() != "")
                {
                    $(this).css({"border" : "1px solid #0c0"});
                }
        });
    });


    //Permite apenas números e insere a pontuação nos locais corretos
    function mascara(objeto,funcao){
        executa_objeto = objeto
        executa_funcao = funcao
        setTimeout("executa()",1)
    }

    function executa(){
        executa_objeto.value=executa_funcao(executa_objeto.value)
    }

    function numeros(v){
        return v.replace(/\D/g,"")
    }

    function quantidade(v){
        v = v.replace(/\D/g,"") 
        v = v.replace(/(\d{1})(\d{3,4})$/,"$1.$2")
        return v
    }

    function preco(v){
        v = v.replace(/\D/g,"")
        v = v.replace(/(\d)(\d{2})$/,"$1.$2")
        return v
    }

    function telefone(v){
        v=v.replace(/\D/g,"")                 
        v=v.replace(/^(\d\d)(\d)/g,"($1) $2")
        v=v.replace(/(\d{4,5})(\d)/,"$1-$2") 
        return v
    }

    function cpf(v){
        v = v.replace(/\D/g,"")
        v=v.replace(/(\d{3})(\d)/,"$1.$2")
        v=v.replace(/(\d{3})(\d)/,"$1.$2") 
        v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
        return v
    }

    function cep(v){
        v = v.replace(/\D/g,"")
        /*v=v.replace(/^(\d{5})(\d)/,"$1-$2")*/
        return v
    }

    function calculo() {
      var quantidade01 = parseFloat(document.getElementById('quantidade-material').value);
      var preco01 = parseFloat(document.getElementById('preco-material').value);
      var quantidade02 = parseFloat(document.getElementById('quantidade-insumo').value);
      var preco02 = parseFloat(document.getElementById('preco-insumo').value);

      var total = parseFloat(quantidade01 * preco01 + quantidade02 * preco02);
      var resultado = total.toFixed(2)

      document.getElementById('preco-total').setAttribute("value", resultado);
    }

    function confirmacao() {
        alert("Pedido Recebido com Sucesso!");
    }


    //Preenchimento CEP
    function getEndereco(cep) {     
        if($.trim(cep) != ""){         
            $("#loadingCep").html('Pesquisando...');         
            $.getScript("http://cep.republicavirtual.com.br/web_cep.php?formato=javascript&cep="+cep, function(){
                if (resultadoCEP["resultado"] != 0) {
                    $("#endereco, #endereco-entrega").val(unescape(resultadoCEP["logradouro"]));
                    $("#complemento, #complemento-entrega").val(unescape(resultadoCEP["bairro"]));                 
                    $("#cidade, #cidade-entrega").val(unescape(resultadoCEP["cidade"]));                 
                    $("#estado, #estado-entrega").val(unescape(resultadoCEP["uf"]));
                }                     
            });     
        } 
    }

    function getEntrega(cep) {     
        if($.trim(cep) != ""){         
            $("#loadingCep").html('Pesquisando...');         
            $.getScript("http://cep.republicavirtual.com.br/web_cep.php?formato=javascript&cep="+cep, function(){
                if (resultadoCEP["resultado"] != 0) {
                    $("#endereco-entrega").val(unescape(resultadoCEP["logradouro"]));
                    $("#complemento-entrega").val(unescape(resultadoCEP["bairro"]));                 
                    $("#cidade-entrega").val(unescape(resultadoCEP["cidade"]));                 
                    $("#estado-entrega").val(unescape(resultadoCEP["uf"]));
                }                     
            });     
        } 
    }
            
    $("#getEndereco").click(function(){
        getEndereco($("#cep").val());             
      }); 
    $("#getEntrega").click(function(){
        getEntrega($("#cep-entrega").val());             
      });           


    // Preencher campos automaticamente
    $(".cep").on("input", function(){
        var textoDigitado = $(this).val();
        var inputCep = $(this).attr("cep");
        $("#"+ inputCep).val(textoDigitado);
    });


    //Buscar
    $("#buscar").click(function(){

        $(".pedido").addClass("hide");
        $(".insumo").addClass("hide");
        $(".solicitante").addClass("hide");
        $(".entrega").addClass("hide");
        $(".calculo").addClass("hide");

        var mysql_query = "SELECT * FROM pedidos INNER JOIN materiais ON pedidos.id = materiais.id WHERE pedidos.id=2";

        mysqlQuery(mysql_query, function(result){
                // mostra o resultado da query
                var obj = JSON.parse(result);
                var table_body =  document.getElementById("conteudo");

                obj.forEach(function(el){
                    var html_body = "<div class='col-md-3'><h4>Dados do Pedido</h4>"+
                    "<p><b>Material:</b> "+el.nome+"</p>"+
                    "<p><b>Marca:</b> "+el.marca+"</p>"+
                    "<p><b>Data de Compra:</b> "+el.data_de_compra+"</p>"+
                    "<p><b>Quantidade:</b> "+el.quantidade+"</p>"+
                    "<p><b>Preço:</b> "+el.preco+"</p>"+
                    "</div>";
                    table_body.innerHTML += html_body;
                });

            });


        var mysql_query = "SELECT * FROM insumos WHERE id=2";

        mysqlQuery(mysql_query, function(result){
                // mostra o resultado da query
                var obj = JSON.parse(result);
                var table_body =  document.getElementById("conteudo");

                obj.forEach(function(el){
                    var html_body = "<div class='col-md-3'><h4>Dados do Insumo</h4>"+
                    "<p><b>Descrição:</b> "+el.descricao+"</p>"+
                    "<p><b>Quantidade:</b> "+el.quantidade+"</p>"+
                    "<p><b>Preço:</b> "+el.preco+"</p>"+
                    "</div>";
                    table_body.innerHTML += html_body;
                });

            });

      
      var mysql_query = "SELECT * FROM solicitantes WHERE id=2";

        mysqlQuery(mysql_query, function(result){
                // mostra o resultado da query
                var obj = JSON.parse(result);
                var table_body =  document.getElementById("conteudo");

                obj.forEach(function(el){
                    var html_body = "<div class='col-md-3'><h4>Dados do Solicitante</h4>"+
                    "<p><b>Nome:</b> "+el.nome+"</p>"+
                    "<p><b>Telefone:</b> "+el.telefone+"</p>"+
                    "<p><b>CPF:</b> "+el.cpf+"</p>"+
                    "<p><b>CEP:</b> "+el.cep+"</p>"+
                    "<p><b>Endereço:</b> "+el.rua+", " +el.numero+"</p>"+
                    "<p><b>Bairro:</b> "+el.bairro+"</p>"+
                    "<p><b>Cidade:</b> "+el.cidade+"</p>"+
                    "<p><b>Estado:</b> "+el.estado+"</p>"+
                    "</div>";
                    table_body.innerHTML += html_body;
                });

            });

        var mysql_query = "SELECT * FROM pedidos WHERE id=2";

        mysqlQuery(mysql_query, function(result){
                // mostra o resultado da query
                var obj = JSON.parse(result);
                var table_body =  document.getElementById("conteudo");

                obj.forEach(function(el){
                    var html_body = "<div class='col-md-3'><h4>Dados de Entrega</h4>"+
                    "<p><b>CEP:</b> "+el.cep+"</p>"+
                    "<p><b>Endereço:</b> "+el.rua+", " +el.numero+"</p>"+
                    "<p><b>Bairro:</b> "+el.bairro+"</p>"+
                    "<p><b>Cidade:</b> "+el.cidade+"</p>"+
                    "<p><b>Estado:</b> "+el.estado+"</p>"+
                    "<p><b>País:</b> "+el.pais+"</p>"+
                    "</div>";
                    table_body.innerHTML += html_body;
                });

            });
                         
    });//buscar


}); //ready


