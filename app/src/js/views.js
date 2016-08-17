;(function($) {

    var views = {

      /*Função que ativa a página no menu*/
      menuActive: function(view){
        var ul = $('.menu ul');
        ul.find('li').removeClass('active');
        ul.find('a[href="#/'+view+'"]').parent().addClass('active');
      },

      /*Função que customisa as tabs*/
      helperTabs: function(){
        $('a[data-toggle="tab"]').click(function(e){
            e.preventDefault();
            $('.nav-tabs a').parent().removeClass('active');
            $('.nav-tabs a[aria-controls='+$(this).attr('aria-controls')+']').parent().addClass('active');
            $('.tab-content .tab-pane').removeClass('active');
            $('.tab-content .tab-pane[id='+$(this).attr('aria-controls')+']').addClass('active');
          });
      },

      /*Função que inseri mascara nos campos*/
      helperMaskInput: function(){                
        $(".mask-tel").mask("(99) 9999-9999?9");
        $(".mask-cep").mask("99999-999");
        $(".mask-cpf").mask("999.999.999-99");
        $(".mask-uf").mask("**");
        $(".mask-num").mask("9?999999999");
      },

      /*Função que cria uma alerta customizado*/
      helperAlert: function(msg, back, color, btn){
      	$(btn).addClass("disabled").attr("disabled", "disabled");
        $("body").append("<div id='alert' style='width: 100%; height: 100px; position: fixed; top: -100%; left: 0; background: " + back + "; z-index: 99999;'><h1>" + msg + "</h1></div>");
        $("#alert h1").css({
            color: color,
            display: 'none'
        });
        $("#alert").animate({
            top: '0'
        }, 500, function () {
            $("#alert h1").fadeIn(800);
            setTimeout(function () {
                $("#alert h1").hide();
                $("#alert").animate({
                    top: '-100%'
                }, 600, function () {
                    $(this).remove();
                });
                $(btn).removeClass("disabled").removeAttr("disabled");
            }, 5000);
        });
      },

      /*Função que busca no webservice para o CEP*/
      helperSearchCep: function(){
        $('.sh-cep').on('click', function(){
          var cep = $(this).closest('.serch-cep').find('.mask-cep').val();

          if(cep === ""){
          	$(this).closest('.serch-cep').find('.mask-cep').focus();
          	views.helperAlert("Informe o número do CEP", "#FCA464", "#FFFFFF", '.sh-cep');
          	return false;
          }

          var form = $(this).closest('fieldset');

          $.getJSON('http://viacep.com.br/ws/'+cep.replace(/[\(\)\.\s-]+/g,'')+'/json/ ', function(data) {
                console.log(data);    
                form.find('.rs').val(data.logradouro);
                form.find('.bs').val(data.bairro);
                form.find('.cs').val(data.localidade);
                form.find('.us').val(data.uf);

                 form.find('.auto').removeAttr('disabled');
          });

        });
      },

      /*Função que clona os campos do formulário*/
      helperCloneFields: function(){

        $('#insum').on('click', '.btn-clone', function(){

          $("div.form-group.clone")
            .last()
            .clone()
            .appendTo($("#insum .group"))
            .find("input").attr("name",function(i,oldVal) {
                return oldVal.replace(/\[(\d+)\]/,function(_,m){
                    return "[" + (+m + 1) + "]";
                });
            });          
        });

        $('#insum').on('click', '.btn-remove', function(){
          $(this).closest('div.form-group.clone').remove();                  
        });

      },

      /*Função que trata a moeda*/
      helperRoundMoney: function(v){
      	v = parseFloat(v) * 100;
    	return Math.floor(v) / 100;
      },

      /*Função que formada a data*/
      helperDateFormat: function(data){

		function addZero(n){
			return n < 10 ? '0' + n : '' + n;
		}

      	var d = new Date(data);

      	return addZero(d.getDate()) + "/"
      		   + addZero(d.getMonth()+1) + "/"
      		   + d.getFullYear() + " "
      		   + addZero(d.getHours()) + ":"
      		   + addZero(d.getMinutes()) + ":"
      		   + addZero(d.getSeconds());

      },

       admin: function(){

          var sql = "SELECT * FROM solicitantes ORDER BY nome DESC";

          mysqlQuery(sql, function(result){

                var obj = JSON.parse(result);

                var table = '';
                
                $.each(obj, function(index, element){
                  table +='<tr>';
                  table += '<td>'+element.id+'</td>';
                  table += '<td>'+element.nome+'</td>';
                  table += '<td>'+element.telefone+'</td>';
                  table += '<td>'+element.cidade+'</td>';
                  table += '</tr>';

                });

                $('#solicitantes').html(table);

              });
        },

        /*Função que busca a quatidade de pedidos por dia*/
        getOrdersDay: function(){

        	var sql = "SELECT COUNT(*) AS total "+
        			  "FROM pedidos WHERE data_de_compra = CURDATE()";

        	mysqlQuery(sql, function(result){
        		console.log(result);
        	});

        },

        /*Função que retorna os pedidos*/
        getOrder: function(id){         

            var sql = "SELECT " +
                    "pedido.id AS id, "+
                    "pedido.id_solicitante AS idSoli, "+
                    //"DATE_FORMAT(STR_TO_DATE(pedido.data_de_compra, '%Y-%m-%d'), '%d/%m/%Y') AS data, "+
                    "pedido.data_de_compra AS data, "+
                    "pedido.cep AS cepPed, "+
                    "pedido.rua AS ruaPed, "+
                    "pedido.numero AS numeroPed, "+
                    "pedido.bairro AS bairroPed, "+
                    "pedido.cidade AS cidadePed, "+
                    "pedido.estado AS estadoPed, "+
                    "pedido.pais AS paisPed, "+
                    "material.nome AS nomeMat, "+
                    "material.marca AS marcaMat, "+
                    "material.preco AS precoMat, "+
                    "material.quantidade AS qtdMat, "+
                    "solicitante.nome AS nomeSol, "+
                    "solicitante.cpf AS cpfSol, "+
                    "solicitante.cep AS cepSol, "+
                    "solicitante.rua AS ruaSol, "+
                    "solicitante.numero AS numeroSol, "+
                    "solicitante.bairro AS bairroSol, "+
                    "solicitante.cidade AS cidadeSol, "+
                    "solicitante.estado AS estadoSol, "+
                    "solicitante.pais AS paisSol, "+
                    "solicitante.telefone AS telSol "+                    
                    "FROM pedidos AS pedido "+
                    "INNER JOIN materiais AS material ON material.id_pedido = pedido.id "+
                    "INNER JOIN solicitantes AS solicitante ON solicitante.id = pedido.id_solicitante "+                    
                    "WHERE pedido.id = "+id+
                     " GROUP BY pedido.id";

            var sql2 = "SELECT "+
            		   "insumo.descricao AS descIns, "+
            		   "insumo.quantidade AS qtdIns, "+
            		   "insumo.preco AS precoIns, "+
            		   "material.marca AS marcaIns "+            		  
            		   "FROM insumos AS insumo "+
            		   "INNER JOIN materiais AS material ON material.id = insumo.id_material "+
            		   "WHERE insumo.id_pedido = "+id;

           	var sql3 = "SELECT "+
           			   "(material.preco * material.quantidade) AS precoMaterial, "+
           			   "SUM(insumo.preco * insumo.quantidade) AS precoInsumo "+
           			   "FROM materiais AS material "+
           			   "INNER JOIN insumos AS insumo ON insumo.id_pedido = "+id+
           			   " WHERE material.id_pedido = "+id+
           			   " GROUP BY material.id_pedido";

        var insumosFields = '';
        var precoTotal = '';
       
        mysqlQuery(sql2, function(result){
        	
        	 var obj = JSON.parse(result);

        	 if(obj.length !== 0){

        	 	$.each(obj, function(index, element){
        	 		insumosFields += '<div class="form-group">';
        	 		insumosFields += '<div class="col-xs-12 col-sm-6 col-md-3 col-lg-2"><label>Marca</label><input type="text" class="form-control" value="'+element.marcaIns+'"></div>';
        	 		insumosFields += '<div class="col-xs-12 col-sm-6 col-md-5 col-lg-4"><label>Descrição</label><input type="text" class="form-control" value="'+element.descIns+'"></div>'; 
        	 		insumosFields += '<div class="col-xs-12 col-sm-6 col-md-3 col-lg-2"><label>Quantidade</label><input type="text" class="form-control" value="'+element.qtdIns+'"></div>';
        	 		insumosFields += '<div class="col-xs-12 col-sm-6 col-md-3 col-lg-2"><label>Preço</label><input type="text" class="form-control mask-money" value="R$ '+element.precoIns+'"></div>';
        	 		insumosFields += '</div>';
        	 	});

        	 }

        });


        mysqlQuery(sql3, function(result){

        	console.log(result);

        	var obj = JSON.parse(result);

        	 if(obj.length !== 0){

        	 	$.each(obj, function(index, element){

        	 		precoTotal = (element.precoMaterial + element.precoInsumo);

        	 	});

        	 }

        	
        });

          mysqlQuery(sql, function(result){

                var obj = JSON.parse(result);

                var fields = '';

                if(obj.length !== 0){

                  $.each(obj, function(index, element){

                    fields += '<ul class="nav nav-tabs" role="tablist">';
                    fields += '<li role="presentation" class="active"><a href="#mater" aria-controls="mater" role="tab" data-toggle="tab">Dados do Pedido</a></li>';
                    fields += '<li role="presentation"><a href="#insum" aria-controls="insum" role="tab" data-toggle="tab">Dados do Insumo</a></li>';
                    fields += '<li role="presentation"><a href="#solic" aria-controls="solic" role="tab" data-toggle="tab">Dados do Solicitante</a></li>';
                    fields += '<li role="presentation"><a href="#entr" aria-controls="entr" role="tab" data-toggle="tab">Dados da Entrega</a></li>';
                    fields += '</ul>';

                    fields += '<div class="form-group">';
                    fields += '<h3 class="priceTotal">Preço Total: R$ '+ views.helperRoundMoney(precoTotal) +'</h3>';
                    fields += '</div>';

                    fields += '<div class="tab-content">';
                    fields += '<fieldset role="tabpanel" id="mater" class="mat tab-pane active"">';
                    fields += '<div class="form-group">';
                    fields += '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3"><label>Material</label><input type="text" class="form-control" value="'+element.nomeMat+'"></div>';
                    fields += '<div class="col-xs-12 col-sm-6 col-md-3 col-lg-2"><label>Marca</label><input type="text" class="form-control" value="'+element.marcaMat+'"></div>';
                    fields += '<div class="col-xs-12 col-sm-6 col-md-3 col-lg-2"><label>Data da Compra</label><input type="text" class="form-control mask-date" value="'+views.helperDateFormat(element.data)+'"></div>';
                    fields += '<div class="col-xs-12 col-sm-6 col-md-3 col-lg-2"><label>Quantidade</label><input type="text" class="form-control" value="'+element.qtdMat+'"></div>';
                    fields += '<div class="col-xs-12 col-sm-6 col-md-3 col-lg-2"><label>Preço '+element.nomeMat+'</label><input type="text" class="form-control mask-money" value="R$ '+element.precoMat+'"></div>';
                    fields += '</div>';
                    fields += '</fieldset>';

                    fields += '<fieldset role="tabpanel" id="insum" class="mat tab-pane"">';
                    fields += insumosFields;
                    fields += '</fieldset>';

                    fields += '<fieldset role="tabpanel" id="solic" class="mat tab-pane">';
                    fields += '<div class="form-group">';
                    fields += '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3"><label>Nome</label><input type="text" class="form-control" value="'+element.nomeSol+'"></div>';
                    fields += '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3"><label>CPF</label><input type="text" class="form-control mask-cpf" value="'+element.cpfSol+'"></div>';
                    fields += '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3"><label>Telefone</label><input type="text" class="form-control mask-tel" value="'+element.telSol+'"></div>';
                    fields += '<div class="col-xs-12 col-sm-6 col-md-3 col-lg-2"><label>CEP</label><input type="text" class="form-control mask-cep" value="'+element.cepSol+'"></div>';
                    fields += '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3"><label>Rua</label><input type="text" class="form-control" value="'+element.ruaSol+'"></div>';
                    fields += '<div class="col-xs-12 col-sm-6 col-md-2 col-lg-1"><label>Número</label><input type="text" class="form-control" value="'+element.numeroSol+'"></div>';
                    fields += '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3"><label>Bairro</label><input type="text" class="form-control" value="'+element.bairroSol+'"></div>';
                    fields += '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3"><label>Cidade</label><input type="text" class="form-control" value="'+element.cidadeSol+'"></div>';
                    fields += '<div class="col-xs-12 col-sm-6 col-md-2 col-lg-1"><label>Estado</label><input type="text" class="form-control mask-uf" value="'+element.estadoSol+'"></div>';
                    fields += '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3"><label>País</label><input type="text" class="form-control" value="'+element.paisSol+'"></div>';
                    fields += '</div>';
                    fields += '</fieldset>';
                    fields += '<fieldset  role="tabpanel" id="entr"  class="mat tab-pane">';
                    fields += '<div class="form-group">';
                    fields += '<div class="col-xs-12 col-sm-6 col-md-3 col-lg-2"><label>CEP</label><input type="text" class="form-control mask-cep" value="'+element.cepPed+'"></div>';
                    fields += '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3"><label>Rua</label><input type="text" class="form-control" value="'+element.ruaPed+'"></div>';
                    fields += '<div class="col-xs-12 col-sm-6 col-md-2 col-lg-1"><label>Número</label><input type="text" class="form-control" value="'+element.numeroPed+'"></div>';
                    fields += '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3"><label>Bairro</label><input type="text" class="form-control" value="'+element.bairroPed+'"></div>';
                    fields += '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3"><label>Cidade</label><input type="text" class="form-control" value="'+element.cidadePed+'"></div>';
                    fields += '<div class="col-xs-12 col-sm-6 col-md-2 col-lg-1"><label>Estado</label><input type="text" class="form-control mask-uf" value="'+element.estadoPed+'"></div>';
                    fields += '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3"><label>País</label><input type="text" class="form-control" value="'+element.paisPed+'"></div>';
                    fields += '</div>';
                    fields += '</fieldset>';
                    fields += '</div>';

                  });

                  $('.results').html(fields);                  

                }
                else{
                  fields += '<h3 class="text-center">Não exite pedido para o código informado.</h3>';
                  fields += '<form method="post" action="#/pedido" class="seach-order"><fieldset>';
                  fields += '<div class="form-group">';
                  fields += '<div class="col-xs-6 col-md-8">';
                  fields += '<input type="text" name="id" id="id" class="form-control mask-num" placeholder="Número do Pedido">';
                  fields += '</div>';
                  fields += '<div class="col-xs-6 col-md-4">';
                  fields += '<button type="submit" id="ped" class="btn btn-green c">Buscar</button>';
                  fields += '</div>';
                  fields += '</div></fieldset></form>';

                  $('#content').html(fields);
                }


          });

        },

    }

    /* Define as roda para views*/
    var app = $.sammy('#wrap', function() {       

      this.helpers({

        animated: function(obj, classes){

           this.swap = function(content){

             this.$element().html(content).find(obj).addClass(classes);

           }
        }

      });
     
      this.get('#/', function() {
        views.menuActive('');        
        this.partial('views/index.html', function(){
          $('.mask-num').mask('9?999999999');
          views.getOrdersDay();
        }); 
        
      });


      this.get('#/admin', function() {
         views.menuActive('admin');
        this.partial('views/admin.html', function(){
          views.admin();
        });        
      });

      this.post('#/pedido', function(){
        var id = this.params['id'];
        this.redirect('#/pedido/id', id);
      });

      this.get('#/pedido/id/:id', function(){
         views.menuActive('');
         app.clearTemplateCache();
        var id = this.params['id'];
        this.partial('views/pedido.html', function(){
          views.getOrder(id);
          $('.cod').html(id);
          views.helperMaskInput(); 
          views.helperTabs();
        });       

      });

      this.get('#/novo/pedido', function(){
        views.menuActive('');
        this.partial('views/novo-pedido.html', function(){
          views.helperTabs();
          views.helperMaskInput();
          views.helperSearchCep();
          views.helperCloneFields();

        });
      });

      this.get("", function () {
        views.menuActive('404');
        this.partial('views/404.html');
      });

    });

    $(function() {
      app.run('#/');
    });

})(jQuery);