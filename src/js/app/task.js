$(function () {
  searchZipcode("#cep_entrega", "#endereco_entrega", "#cidade_entrega", "#estado_entrega", "#complemento_entrega", "#complemento_entrega");
  searchZipcode("#cep_solicitante", "#endereco_solicitante", "#cidade_solicitante", "#estado_solicitante", "#complemento_solicitante", "#complemento_solicitante");
  initMasks();
  initNewInsuranceFormEvent();
  initTaskFormSubmitEvent();
  initRequiredValidationFields();
  initCheckSameAddressCheckbox();
  initOrderTotal();
  initTotal();

  $("#search-order").on('click', function () {
    var q = "SELECT p.id AS id, DATE(p.data_de_compra) AS data_de_compra, " +
        "p.cep AS cep_entrega, p.rua AS endereco_entrega, p.cidade AS cidade_entrega, p.estado AS estado_entrega, " +
        "s.nome AS nome, s.telefone AS telefone, s.cpf AS cpf, s.cep AS cep_solicitante, s.rua AS endereco_solicitante, s.cidade AS cidade_solicitante, s.estado AS estado_solicitante " +
        "FROM pedidos p " +
        "JOIN solicitantes s ON s.id = p.id_solicitante " +
        "WHERE p.id = " + $("#numero_pedido").val() + " " +
        "ORDER BY p.data_de_compra";
    mysqlQuery(q, function (result) {
      if (JSON.parse(result)) {
        result = JSON.parse(result);
        fillRequesterAndShippingData(result);
        searchMaterialData(result);
      }
    });
  });
});

var fillRequesterAndShippingData = function (result) {
  var data = new Date(result[0]['data_de_compra']);
  $("#data_compra_pedido").val(result[0]['data_de_compra'].substr(0, 10));
  $("#nome_solicitante").val(result[0]['nome']);

  var x = result[0]['cpf'].replace(/\D/g, '').match(/(\d{3})(\d{3})(\d{3})(\d{2})/);
  var cpf = x[1] + "." + x[2] + "." + x[3] + "-" + x[4];

  $("#cpf_solicitante").val(cpf);

  x = result[0]['telefone'].replace(/\D/g, '').match(/(\d{2})(\d{4})(\d{5})/);
  if (x == null) {
    x = result[0]['telefone'].replace(/\D/g, '').match(/(\d{2})(\d{4})(\d{4})/);
  }
  var tel = "(" + x[1] + ") " + x[2] + "-" + x[3];

  $("#telefone_solicitante").val(tel);

  x = result[0]['cep_solicitante'].replace(/\D/g, '').match(/(\d{5})(\d{3})/);
  var cep = x[1] + "-" + x[2];

  $("#cep_solicitante").val(cep);
  $("#endereco_solicitante").val(result[0]['endereco_solicitante']);
  $("#cidade_solicitante").val(result[0]['cidade_solicitante']);
  $("#estado_solicitante").val(result[0]['estado_solicitante']);
  $("#endereco_entrega").val(result[0]['endereco_entrega']);
  $("#cidade_entrega").val(result[0]['cidade_entrega']);

  x = result[0]['cep_entrega'].replace(/\D/g, '').match(/(\d{5})(\d{3})/);
  cep = x[1] + "-" + x[2];

  $("#cep_entrega").val(cep);
  $("#estado_entrega").val(result[0]['estado_entrega']);
};

var searchMaterialData = function (result) {
  var id = result[0]['id'];

  var q = "SELECT m.id AS id, m.nome AS nome, m.marca AS marca, m.quantidade AS quantidade, m.preco AS preco " +
      "FROM materiais m " +
      "JOIN pedidos p ON m.id_pedido = p.id " +
      "WHERE p.id = " + id;
  mysqlQuery(q, function (result) {
      result = JSON.parse(result);
      fillMaterialValues(result);
      searchInsuranceData(result);
  });
};

var searchInsuranceData = function (result) {
  var id = result[0]['id'];

  var q = "SELECT m.marca AS marca, i.quantidade AS quantidade, i.preco AS preco, i.descricao AS descricao " +
          "FROM insumos i " +
          "JOIN materiais m ON m.id = i.id_material " +
          "WHERE m.id = " + id;
  mysqlQuery(q, function (result) {
    result = JSON.parse(result);
    fillInsuranceValues(result);
  });
};

var fillInsuranceValues = function (result) {
  $("#can-add-insurance").empty();
  $.each(result, function (index, obj) {
    var $tbody = $("#can-add-insurance");

    var tds = "";

    tds += createElement('td', obj['marca'] + createHiddenInput('insumo[' + index + '][marca]', obj['marca']));
    tds += createElement('td', obj['descricao'] + createHiddenInput('insumo[' + index + '][descricao]', obj['descricao']));
    tds += createElement('td', obj['quantidade'] + createHiddenInput('insumo[' + index + '][quantidade]', obj['quantidade'], "id='insumo_quantidade_" + index + "'"));
    tds += createElement('td', obj['preco'] + createHiddenInput('insumo[' + index + '][preco]', obj['preco'], "id='insumo_valor_" + index + "'"));

    var tr = "<tr data-index='" + index + "'>" + tds + "</tr>";

    $tbody.append(tr);

    recalcTotal();
  });
};

var fillMaterialValues = function (result) {
  $("#fill-material-values").empty();
    $.each(result, function (index, obj) {
        var $tbody = $("#fill-material-values");

        var tds = "";

        tds += createElement('td', obj['nome'] + createHiddenInput('material[' + index + '][nome]', obj['nome']));
        tds += createElement('td', obj['marca'] + createHiddenInput('material[' + index + '][marca]', obj['marca']));
        tds += createElement('td', obj['quantidade'] + createHiddenInput('material[' + index + '][quantidade]', obj['quantidade'], "id='material_quantidade_" + index + "'"));
        tds += createElement('td', obj['preco'] + createHiddenInput('material[' + index + '][preco]', obj['preco'], "id='material_preco_" + index + "'"));

        var tr = "<tr data-index='" + index + "'>" + tds + "</tr>";

        $tbody.append(tr);
    });
};

var recalcTotal = function () {
  $("#order-total-value input").val(0);
  $("#preco_pedido").val(0);

  initOrderTotal();
  initTotal();
};

var initTotal = function () {
  $("#can-add-insurance tr").each(function () {
    var self = $(this);
    var index = self.data('index');
    var qtd = $("#insumo_quantidade_" + index).val();
    var valor = $("#insumo_valor_" + index).val();
    var result = Number(qtd) * Number(valor);
    calcTotal(result);
  });
  calcTotal(Number($("#preco_pedido").val()));
};

var initOrderTotal = function () {
  $("#fill-material-values tr").each(function () {
    var self = $(this);
    var index = self.data('index');
    var qtd = $("#material_quantidade_" + index).val();
    var valor = $("#material_preco_" + index).val();
    var result = Number(qtd) * Number(valor);
    calcOrderTotal(result);
  });
};

var calcOrderTotal = function (total) {
  var $input = $("#preco_pedido");
  var current = isNaN(Number($input.val())) ? 0 : Number($input.val());
  total += current;
  $input.val(total);
};

var calcTotal = function (total) {
  var $input = $("#order-total-value input");
  var current = isNaN(Number($input.val())) ? 0 : Number($input.val());

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