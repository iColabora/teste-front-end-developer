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
        $('.nav-tabs a').click(function(e){
            e.preventDefault();
            $('.nav-tabs a').parent().removeClass('active');
            $(this).parent().addClass('active');
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

      /*Função que busca no webservice para o CEP*/
      helperSearchCep: function(){
        $('.sh-cep').on('click', function(){
          var cep = $(this).closest('.serch-cep').find('.mask-cep').val();
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

      helperCloneFields: function(){

        $('#insum').on('click', '.btn-clone', function(){

          $("div.form-group.clone")
            .last()
            .clone()
            .appendTo($("#insum"))
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

        getPedido: function(id){         

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
                    "WHERE pedido.id = "+id;
                     " GROUP BY pedido.id";

          mysqlQuery(sql, function(result){

                var obj = JSON.parse(result);

                var fields = '';

                if(obj.length !== 0){

                  $.each(obj, function(index, element){

                    fields += '<ul class="nav nav-tabs" role="tablist">';
                    fields += '<li role="presentation" class="active"><a href="#mater" aria-controls="mater" role="tab" data-toggle="tab">Dados do Pedido</a></li>';
                    fields += '<li role="presentation"><a href="#solic" aria-controls="solic" role="tab" data-toggle="tab">Dados do Solicitante</a></li>';
                    fields += '<li role="presentation"><a href="#entr" aria-controls="entr" role="tab" data-toggle="tab">Dados da Entrega</a></li>';
                    fields += '</ul>';
                    fields += '<div class="tab-content">';
                    fields += '<fieldset role="tabpanel" id="mater" class="mat tab-pane active"">';
                    fields += '<div class="form-group">';
                    fields += '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3"><label>Material</label><input type="text" class="form-control" value="'+element.nomeMat+'"></div>';
                    fields +=  '<div class="col-xs-12 col-sm-6 col-md-3 col-lg-2"><label>Marca</label><input type="text" class="form-control" value="'+element.marcaMat+'"></div>';
                    fields +=  '<div class="col-xs-12 col-sm-6 col-md-3 col-lg-2"><label>Data da Compra</label><input type="text" class="form-control mask-date" value="'+element.data+'"></div>';
                    fields +=  '<div class="col-xs-12 col-sm-6 col-md-3 col-lg-2"><label>Quantidade</label><input type="text" class="form-control" value="'+element.qtdMat+'"></div>';
                    fields +=  '<div class="col-xs-12 col-sm-6 col-md-3 col-lg-2"><label>Preço</label><input type="text" class="form-control .mask-money" value="R$ '+element.precoMat+',00"></div>';
                    fields += '</div>';
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

        pedidos: function(){

          var sql = "SELECT * FROM pedidos ORDER BY id DESC";

          
          mysqlQuery(sql, function(result){

                var obj = JSON.parse(result);                

                var table = '';
                
                $.each(obj, function(index, element){
                  table +='<tr>';
                  table += '<td>'+element.id+'</td>';
                  table += '<td>'+element.id_solicitante+'</td>';
                  table += '<td>'+element.data_de_compra+'</td>';
                  table += '</tr>';

                });

                $('#pedidos').html(table);

              });

        }

    }

    // Define as roda para views
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
        }); 
        
      });


      this.get('#/solucoes', function() {
        views.menuActive('solucoes');
        this.partial('views/solucoes.html', function(){
          views.pedidos();
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
          views.getPedido(id);
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