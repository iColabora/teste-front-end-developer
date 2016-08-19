$(function () {
  searchZipcode("#cep_entrega", "#endereco_entrega", "#cidade_entrega", "#estado_entrega", "#complemento_entrega", "#complemento_entrega");
  searchZipcode("#cep_solicitante", "#endereco_solicitante", "#cidade_solicitante", "#estado_solicitante", "#complemento_solicitante", "#complemento_solicitante");
  initMasks();
  initNewInsuranceFormEvent();
  initTaskFormSubmitEvent();
  initRequiredValidationFields();
  initCheckSameAddressCheckbox();
  initTotal();
});

var initTotal = function () {
  $("#can-add-insurance tr").each(function () {
    var self = $(this);
    var index = self.data('index');
    var qtd = $("#insumo_quantidade_" + index).val();
    var valor = $("#insumo_valor_" + index).val();
    var result = Number(qtd) * Number(valor);
    calcTotal(result);
  });
};

var calcTotal = function (total) {
  var $input = $("#order-total-value input");
  var current = Number($input.val());
  total += current;
  $input.val(total);
};

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
      });
    }
  });
};

var validateRequesterInfo = function () {
  var $nome = $("#nome_solicitante");
  var $cpf = $("#cpf_solicitante");
  var $telefone = $("#telefone_solicitante");
  var $cep = $("#cep_solicitante");
  var $endereco = $("#endereco_solicitante");
  var $cidade = $("#cidade_solicitante");
  var $uf = $("#estado_solicitante");

  var errors = false;

  if (! validateLength($nome.val(), 3, 50)) {
    $nome.addClass('has-error');
    $("#nome_solicitante_invalido").html("Preencha o campo com no mínimo 3 caracteres e no máximo 50");
    errors = true;
  } else {
    $nome.removeClass('has-error');
    $("#nome_solicitante_invalido").html("");
  }

  if (! validateCpf($cpf.val())) {
    $cpf.addClass('has-error');
    $("#cpf_solicitante_invalido").html("CPF inválido");
    errors = true;
  } else {
    $cpf.removeClass('has-error');
    $("#cpf_solicitante_invalido").html("");
  }

  if (! validateTelephone($telefone.val())) {
    $telefone.addClass('has-error');
    $("#telefone_solicitante_invalido").html("Telefone inválido");
    errors = true;
  } else {
    $telefone.removeClass('has-error');
    $("#telefone_solicitante_invalido").html("");
  }

  if (! validateZipcode($cep.val())) {
    $cep.addClass('has-error');
    $("#cep_solicitante_invalido").html("CEP inválido");
    errors = true;
  } else {
    $cep.removeClass('has-error');
    $("#cep_solicitante_invalido").html("");
  }

  if (! validateLength($endereco.val(), 5)) {
    $endereco.addClass('has-error');
    $("#endereco_solicitante_invalido").html("Preencha o campo com no mínimo 5 caracteres");
    errors = true;
  } else {
    $endereco.removeClass('has-error');
    $("#endereco_solicitante_invalido").html("");
  }

  if (! validateLength($cidade.val(), 5)) {
    $cidade.addClass('has-error');
    $("#cidade_solicitante_invalido").html("Preencha o campo com no mínimo 5 caracteres");
    errors = true;
  } else {
    $cidade.removeClass('has-error');
    $("#cidade_solicitante_invalido").html("");
  }

  if (! validateUf($uf.val())) {
    $uf.addClass('has-error');
    $("#estado_solicitante_invalido").html("Selecione uma UF válida");
    errors = true;
  } else {
    $uf.removeClass('has-error');
    $("#estado_solicitante_invalido").html("");
  }

  return errors;
};

var validateShippingAddressInfo = function () {
  var $cep = $("#cep_entrega");
  var $endereco = $("#endereco_entrega");
  var $cidade = $("#cidade_entrega");
  var $uf = $("#estado_entrega");
  
  var errors = false;
  
  if (! validateZipcode($cep.val())) {
    $cep.addClass('has-error');
    $("#cep_entrega_invalido").html("CEP inválido");
    errors = true;
  } else {
    $cep.removeClass('has-error');
    $("#cep_entrega_invalido").html("");
  }

  if (! validateLength($endereco.val(), 5)) {
    $endereco.addClass('has-error');
    $("#endereco_entrega_invalido").html("Preencha o campo com no mínimo 5 caracteres");
    errors = true;
  } else {
    $endereco.removeClass('has-error');
    $("#endereco_entrega_invalido").html("");
  }

  if (! validateLength($cidade.val(), 5)) {
    $cidade.addClass('has-error');
    $("#cidade_entrega_invalido").html("Preencha o campo com no mínimo 5 caracteres");
    errors = true;
  } else {
    $cidade.removeClass('has-error');
    $("#cidade_entrega_invalido").html("");
  }

  if (! validateUf($uf.val())) {
    $uf.addClass('has-error');
    $("#estado_entrega_invalido").html("Selecione uma UF válida");
    errors = true;
  } else {
    $uf.removeClass('has-error');
    $("#estado_entrega_invalido").html("");
  }

  return errors;
};

var validateOrderInfo = function () {
  return true;
};

var initCheckSameAddressCheckbox = function () {
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
};

var initTaskFormSubmitEvent = function () {
  $("#task-form").on('submit', function (e) {
    e.preventDefault();

    $(".required").each(function (index, obj) {
      var id = $(this).attr('id');
      if (! $(this).attr('disabled') && $(this).val() == "") {
        $(this).addClass('has-error');
        $("#" + id + "_invalido").html('Campo Obrigatório');
      } else {
        $(this).removeClass('has-error');
        $("#" + id + "_invalido").html('');
      }
    });

    var errors = true;

    if (! validateRequesterInfo()) {
      errors = true;
    }
    if (! validateShippingAddressInfo()) {
      errors = true;
    }
    if (! validateOrderInfo()) {
      errors = true;
    }

    if (! errors) {
      $('.required').each(function (index, obj){
        var id = $(this).attr('id');
        $(this).removeClass('has-error');
        $("#" + id + "_invalido").html('');
      });
    }
  });
};

var initRequiredValidationFields = function () {
  $(".required").on('blur', function () {
    var self = $(this);
    if (self.val() == "") {
      self.addClass('has-error');
    } else {
      self.removeClass('has-error');
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

      var index = $("#can-add-insurance tr:last-child").data('index') + 1;

      tds += createElement('td', $marca.val() + createHiddenInput('insumo[' + index + '][marca]', $marca.val()));
      tds += createElement('td', $descricao.val() + createHiddenInput('insumo[' + index + '][descricao]', $descricao.val()));
      tds += createElement('td', $quantidade.val() + createHiddenInput('insumo[' + index + '][quantidade]', $quantidade.val(), "id='insumo_quantidade_" + index + "'"));
      tds += createElement('td', $preco.val() + createHiddenInput('insumo[' + index + '][preco]', $preco.val(), "id='insumo_preco_'" + index + "'"));

      var tr = "<tr data-index='" + index + "'>" + tds + "</tr>";

      $("#can-add-insurance").append(tr);
      $("#new-insurance-modal .close").click();

      var total = Number($quantidade.val()) * Number($preco.val());
      calcTotal(total);

      $marca.val("");
      $preco.val("");
      $quantidade.val("");
      $descricao.val("");

      return true;
    }

    return false;
  })
};