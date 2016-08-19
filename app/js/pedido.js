//"use strict";
var material = {
    init: function(){
      $material = this;
      $typeInsurance      = document.querySelector('#typeInsurance');
      $divAutoComplete    = document.querySelector('.divAutoComplete');
      $temple = ''
      this.events();
    },
    events: function(){
      $(document).on('click','.btn-toggle-insumo',this.toggleInsumo);
      $(document).on('click','.btn-insert-insumo',this.insertInsumo);
      $(document).on('change','#typeShipment',this.infoCarriers);
      $(document).on('change','#typeInsurance',this.checkInsurance);
      $(document).on('keyup','#nameMaterial',this.searchMaterial);
      $(document).on('click','.divAutoComplete > .list-group-item',this.fillMaterial);
    },
    infoCarriers: function(event){
      var el        = $(event.currentTarget),
      typeInsurance = $('#typeInsurance'),
      value         = el.val()
      elCarriers    = $(".carriers");

      if(value === 'especial'){
        elCarriers.removeClass('hide');
        typeInsurance.prop('checked',false);
        typeInsurance.prop('disabled',true);
        $material.hideInsurance();
      }
      else if( value === 'normal') {
        typeInsurance.prop('disabled',false);
        elCarriers.addClass('hide');
      }
    },
    toggleInsumo : function(event){
      $('.container-add-insumo').toggle(100);
    },
    insertInsumo : function(event){
      var el           = $(event.currentTarget),
          row          = el.closest('.row'),
          insumeParent = row.find('#elementInsume')[0],
          tplInsume    = document.querySelector('#tplInsume');
          insumeParent.insertAdjacentHTML('afterend', tplInsume.innerHTML);
    },
    checkInsurance: function(event){
      var el = $(event.currentTarget);
      value  = el.val();
      if(el.is(':checked')){
        $material.showInsurance();
      } else if( el.is(':not(:checked)') ) {
        $material.hideInsurance();
      }
    },
    hideInsurance: function(){
      $('.container-insurance').addClass('hide');
    },
    showInsurance: function(){
      $('.container-insurance').removeClass('hide');
    },
    searchMaterial: function(event){
      var el = $(event.currentTarget);
      var query = " SELECT * FROM materiais";
      mysqlQuery(query,function(response){
        var data = JSON.parse(response);
        var htmlMaterial = "";
        data.forEach(function(el){
            htmlMaterial += ''+
              '<a href="javascript:void(0)"'+
                'data-marca="'+el.marca+'"'+
                'data-preco="'+el.preco+'"'+
                'data-quantidade="'+el.quantidade+'"'+
                'class="list-group-item">'+el.nome+'</a>';
        });
        $(".divAutoComplete").html(htmlMaterial);

      });
    },
    fillMaterial: function(event){
      var el = $(event.currentTarget);
      var marcaMaterial = el.attr('data-marca');
      var precoMaterial = el.attr('data-preco');
      var quantidadeMaterial = el.attr('data-quantidade');
      var nomeMaterial  = el.text();

      $("#nameMaterial").val(nomeMaterial);
      $("#marcaMaterial").val(marcaMaterial);
      $("#precoMaterial").val(precoMaterial);
      $("#quantidadeMaterial").val(quantidadeMaterial);
      $('.divAutoComplete').html("");
    }

  }; material.init();

var clientRequest = {
    init: function(){
      $clientRequest = this;
      this.events();
    },
    events: function(){
      $(document).on('blur','#cep',this.fetchCEP);
    },
    fetchCEP: function(event){
      var self = this,
          el   = $(event.currentTarget),
          cep  = el.val();

      if(!!cep){
        $clientRequest.fieldsWaitingCEP();
        var api = 'https://viacep.com.br/ws/' + cep + '/json';
        $.getJSON(api, function(data) {
          console.log( "success" );
        })
        .done(function(data) {
          console.log(data);
          $clientRequest.fieldsDoneCEP(data);
        })
        .fail(function() {
            console.log( "error" );
            $clientRequest.fieldsResetCEP();
        }).always(function() {
          console.log("always");
        });
      }

    },
    fieldsWaitingCEP: function(){
      var waitingText = 'Aguardando...';
      $("#client_rua").val(waitingText),
      $("#client_complemento").val(waitingText),
      $("#client_cidade").val(waitingText),
      $("#client_estado").val(waitingText);
    },
    fieldsResetCEP: function(){
      $("#client_rua").val(""),
      $("#client_complemento").val(""),
      $("#client_cidade").val(""),
      $("#client_estado").val("");
    },
    fieldsDoneCEP: function(dataCEP){
      $("#client_rua").val(dataCEP.logradouro),
      $("#client_complemento").val(dataCEP.complemento),
      $("#client_cidade").val(dataCEP.localidade),
      $("#client_estado").val(dataCEP.uf);
    }

  }; clientRequest.init();
