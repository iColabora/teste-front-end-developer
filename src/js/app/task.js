$(function () {
  searchZipcode("#cep_entrega", "#endereco_entrega", "#cidade_entrega", "#estado_entrega", "#complemento_entrega", "#complemento_entrega");
  searchZipcode("#cep_solicitante", "#endereco_solicitante", "#cidade_solicitante", "#estado_solicitante", "#complemento_solicitante", "#complemento_solicitante");
  initMasks();

  $("#check_same_address").on('click', function () {
    var $div = $("#can-disable-by-checkbox");
    if ($div.hasClass('disabled')) {
      $div.removeClass('disabled');
      $("#cep_entrega, #endereco_entrega, #cidade_entrega, #estado_entrega, #complemento_entrega").removeAttr('disabled');
    } else {
      $div.addClass('disabled');
      $("#cep_entrega, #endereco_entrega, #cidade_entrega, #estado_entrega, #complemento_entrega").attr('disabled', 'disabled');
    }
  });

  initNewInsuranceFormEvent();
  
  $("#modal-form-show").on('click', function (e) {
    e.preventDefault();
  })
  
  $("#task-form").on('submit', function (e) {
    e.preventDefault();

    $(".required").each(function (index, obj) {
      $(this).addClass('has-error');
      var id = $(this).attr('id');
      var $span = $("#" + id + "_invalido").html('Campo Obrigatório');
    })
  });

  $(".required").on('blur', function () {
    var self = $(this);
    if (self.val() == "") {
      self.addClass('has-error');
    } else {
      self.removeClass('has-error');
    }
  })
});

var searchZipcode = function (field, address, city, district, complement, focus) {
  $(field).on('blur', function () {
    var $cep = $(field);
    if ($cep.val().length >= 8) {
      var url = 'https://viacep.com.br/ws/' + $cep.val() + '/json/';

      $.get(url, function (data) {
        $(address).val(data['logradouro']);
        $(city).val(data['localidade']);
        $(district).val(data['uf']);
        $(complement).val(data['complemento']);
        $(focus).focus();
        console.log(data);
      });
    }
  });
};

var initMasks = function () {
  $("#cep_entrega, #cep_solicitante").mask('00000-000', { clearIfNotMatch: true });
  $("#cpf_solicitante").mask('000.000.000-00', { clearIfNotMatch: true });
  $("#telefone_solicitante").mask("(00) 0000-00009", { clearIfNotMatch: true });
};

var initNewInsuranceFormEvent = function () {
  $("#add-new-insurance").on('click', function (e) {
    var $marca = $("#marca_insumo");
    var $preco = $("#preco_insumo");
    var $quantidade = $("#quantidade_insumo");
    var $descricao = $("#descricao_insumo");

    var errors = false;

    if (! validateLength($marca.val(), 2, 50)) {
      $marca.addClass('has-error');
      $("#marca_insumo_invalido").html("Preencha o campo com no mínimo 2 caracteres e no máximo 50");
      errors = true;
    }

    if (! validateNumber($preco.val())) {
      $preco.addClass('has-error');
      $("#preco_insumo_invalido").html("Número inválido");
      errors = true;
    }

    if (! validateInt($quantidade.val())) {
      $quantidade.addClass('has-error');
      $("#quantidade_insumo_invalido").html("Número inválido");
      errors = true;
    }

    if (! validateLength($descricao.val(), 3, 255)) {
      $descricao.addClass('has-error');
      $("#descricao_insumo_invalido").html("Preencha o campo com no mínimo 3 caracteres e no máximo 255");
      errors = true;
    }

    if (! errors) { //validacao
      var tds = "";

      tds += createElement('td', $marca.val());
      tds += createElement('td', $preco.val());
      tds += createElement('td', $quantidade.val());
      tds += createElement('td', $descricao.val());

      var tr = createElement('tr', tds);

      $("#can-add-insurance").append(tr);
      $("#new-insurance-modal .close").click();
      $marca.val("");
      $preco.val("");
      $quantidade.val("");
      $descricao.val("");
      return true;
    }

    return false;
  })
};

var validateLength = function (str, min, max) {
  var length = str.length;
  if (length >= min) {
    if (max && length > max) {
      return false;
    }
    return true;
  }
  return false;
};

var validateInt = function (int) {
  int = Number(int);
  return (int > 0 && int === parseInt(int, 10));
};


var validateNumber = function (number) {
  number = Number(number);
  return (number > 0 && !isNaN(parseFloat(number)) && isFinite(number));
};
