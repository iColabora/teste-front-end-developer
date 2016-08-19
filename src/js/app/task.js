$(function () {
  //preenchimento automático dos campos a partir do CEP para o endereço de entrega
  searchZipcode("#cep_entrega", "#endereco_entrega", "#cidade_entrega", "#estado_entrega", "#complemento_entrega", "#complemento_entrega");

  //preenchimento automático dos campos a partir do CEP para o endereço do solicitante
  searchZipcode("#cep_solicitante", "#endereco_solicitante", "#cidade_solicitante", "#estado_solicitante", "#complemento_solicitante", "#complemento_solicitante");

  //Inicializa as mascaras dos campos
  initMasks();

  //Inicializa o evento de clique para o formulário de adição de insumos
  initNewInsuranceFormEvent();

  //Inicializa o evento de submissão do formulário 'Check if extra insurance is necessary'
  initTaskFormSubmitEvent();

  //Inicializa o evento para a checagem de campos obrigatórios
  initRequiredValidationFields();

  //Inicializa o evento para o checkbox de confirmação do mesmo endereço para a entrega
  initCheckSameAddressCheckbox();

  //Inicializa o calculo do preço total dos materiais
  initOrderTotal();

  //Inicializa o calculo do preço total do pedido
  initTotal();

  //Busca do pedido
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
        loadModal();
        result = JSON.parse(result);
        fillRequesterAndShippingData(result);
        searchMaterialData(result);
      }
    });
  });
});

/**
 * Preenche os dados dos dados do solicitante, do pedido e do endereço de entrega
 *
 * @param Array result Resultado de uma consulta
 */
var fillRequesterAndShippingData = function (result) {
  //Gambiarra para o campo do tipo "date" aceitar o valor do Banco de Dados
  var data = result[0]['data_de_compra'].substr(0, 10);
  $("#data_compra_pedido").val(data);
  $("#nome_solicitante").val(result[0]['nome']);

  //Inserção de mascara no campo CPF
  var x = result[0]['cpf'].replace(/\D/g, '').match(/(\d{3})(\d{3})(\d{3})(\d{2})/);
  var cpf = x[1] + "." + x[2] + "." + x[3] + "-" + x[4];

  $("#cpf_solicitante").val(cpf);

  //Inserção de mascara no campo Telefone
  x = result[0]['telefone'].replace(/\D/g, '').match(/(\d{2})(\d{4})(\d{5})/);
  if (x == null) {
    x = result[0]['telefone'].replace(/\D/g, '').match(/(\d{2})(\d{4})(\d{4})/);
  }
  var tel = "(" + x[1] + ") " + x[2] + "-" + x[3];

  $("#telefone_solicitante").val(tel);

  //Inserção de mascara no campo CEP
  x = result[0]['cep_solicitante'].replace(/\D/g, '').match(/(\d{5})(\d{3})/);
  var cep = x[1] + "-" + x[2];

  $("#cep_solicitante").val(cep);
  $("#endereco_solicitante").val(result[0]['endereco_solicitante']);
  $("#cidade_solicitante").val(result[0]['cidade_solicitante']);
  $("#estado_solicitante").val(result[0]['estado_solicitante']);
  $("#endereco_entrega").val(result[0]['endereco_entrega']);
  $("#cidade_entrega").val(result[0]['cidade_entrega']);

  //Inserção de mascara no campo CEP
  x = result[0]['cep_entrega'].replace(/\D/g, '').match(/(\d{5})(\d{3})/);
  cep = x[1] + "-" + x[2];

  $("#cep_entrega").val(cep);
  $("#estado_entrega").val(result[0]['estado_entrega']);
};

/**
 * Consulta os dados dos materiais de um pedido
 *
 * @param result Resultado de uma consulta
 */
var searchMaterialData = function (result) {
  var id = result[0]['id'];

  var q = "SELECT m.id AS id, m.nome AS nome, m.marca AS marca, m.quantidade AS quantidade, m.preco AS preco " +
      "FROM materiais m " +
      "JOIN pedidos p ON m.id_pedido = p.id " +
      "WHERE p.id = " + id;
  mysqlQuery(q, function (result) {
      result = JSON.parse(result);
      //preenche os dados dos materiais
      fillMaterialValues(result);
      //consulta os dados dos insumos
      searchInsuranceData(result);
  });
};

/**
 * Consulta os dados dos insumos dos materiais de um pedido
 *
 * @param result Resultado de uma consulta
 */
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

/**
 * Preenche os dados dos insumos
 *
 * @param result Resultado de uma consulta
 */
var fillInsuranceValues = function (result) {
  //limpa a tabela para receber os novos dados
  $("#can-add-insurance").empty();
  //Itera sobre o resultado da consulta
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
    closeModal();
  });
};

/**
 * Preenche os dados dos materiais
 *
 * @param result Resultado de uma consulta
 */
var fillMaterialValues = function (result) {
  //limpa a tabela para receber os novos dados
  $("#fill-material-values").empty();
  //Itera sobre o resultado da consulta
  $.each(result, function (index, obj) {
      var $tbody = $("#fill-material-values");

      var tds = "";

      //Cria as celulas das tabelas junto com o campo hidden (para armazenar os dados de submissão do form)
      tds += createElement('td', obj['nome'] + createHiddenInput('material[' + index + '][nome]', obj['nome']));
      tds += createElement('td', obj['marca'] + createHiddenInput('material[' + index + '][marca]', obj['marca']));
      tds += createElement('td', obj['quantidade'] + createHiddenInput('material[' + index + '][quantidade]', obj['quantidade'], "id='material_quantidade_" + index + "'"));
      tds += createElement('td', obj['preco'] + createHiddenInput('material[' + index + '][preco]', obj['preco'], "id='material_preco_" + index + "'"));

      var tr = "<tr data-index='" + index + "'>" + tds + "</tr>";

      //insere os dados na tabela
      $tbody.append(tr);
  });
};

/**
 * Recalcula o valor total do pedido
 */
var recalcTotal = function () {
  $("#order-total-value input").val(0);
  $("#preco_pedido").val(0);

  //calcula o valor total dos materiais
  initOrderTotal();

  //calcula o valor total do pedido
  initTotal();
};

/**
 * Calcula o valor total do pedido
 */
var initTotal = function () {
  //Itera sobre todas as linhas da tabela de insumos
  $("#can-add-insurance tr").each(function () {
    var self = $(this);
    //pega o indice atual da tabela para preencher no seletor
    var index = self.data('index');
    var qtd = $("#insumo_quantidade_" + index).val();
    var valor = $("#insumo_valor_" + index).val();

    //converte a string para números
    var result = Number(qtd) * Number(valor);

    //calcula o total do pedido com base no resultado da linha
    calcTotal(result);
  });
  //calcula o total do pedido com base no total calculado dos materiais
  calcTotal(Number($("#preco_pedido").val()));
};

/**
 * Calcula o valor total dos materiais
 */
var initOrderTotal = function () {
  //Itera sobre todas as linhas da tabela de materiais
  $("#fill-material-values tr").each(function () {
    var self = $(this);
    //pega o indice atual da tabela para preencher no seletor
    var index = self.data('index');
    var qtd = $("#material_quantidade_" + index).val();
    var valor = $("#material_preco_" + index).val();

    //converte a string para números
    var result = Number(qtd) * Number(valor);

    //calcula o total do material com base no resultado da linha
    calcOrderTotal(result);
  });
};

/**
 * Calcula o total dos materiais
 *
 * @param total resultado de uma conta
 */
var calcOrderTotal = function (total) {
  var $input = $("#preco_pedido");
  //verifica se está nulo e incializa com 0, no caso de atualizar os campos
  var current = isNaN(Number($input.val())) ? 0 : Number($input.val());
  total += current;
  $input.val(total);
};

/**
 * Calcula o total dos pedidos
 *
 * @param total resultado de uma conta
 */
var calcTotal = function (total) {
  var $input = $("#order-total-value input");
  //verifica se está nulo e incializa com 0, no caso de atualizar os campos
  var current = isNaN(Number($input.val())) ? 0 : Number($input.val());

  total += current;
  $input.val(total);
};

/**
 * Procura o CEP utilizando a API viacep
 *
 * @param field Seletor do campo do cep
 * @param address Seletor do campo do endereço
 * @param city Seletor do campo da cidade
 * @param district Seletor do campo do estado
 * @param complement Seletor do campo do complemento
 * @param focus Seletor do campo que vai receber o foco após a consulta
 */
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

/**
 * Valida os campos do solicitante
 *
 * @returns {boolean}
 */
var validateRequesterInfo = function () {
  var $nome = $("#nome_solicitante");
  var $cpf = $("#cpf_solicitante");
  var $telefone = $("#telefone_solicitante");
  var $cep = $("#cep_solicitante");
  var $endereco = $("#endereco_solicitante");
  var $cidade = $("#cidade_solicitante");
  var $uf = $("#estado_solicitante");

  var errors = false;

  //valida o nome
  if (! validateLength($nome.val(), 3, 50)) {
    $nome.addClass('has-error');
    $("#nome_solicitante_invalido").html("Preencha o campo com no mínimo 3 caracteres e no máximo 50");
    errors = true;
  } else {
    $nome.removeClass('has-error');
    $("#nome_solicitante_invalido").html("");
  }

  //valida o cpf
  if (! validateCpf($cpf.val())) {
    $cpf.addClass('has-error');
    $("#cpf_solicitante_invalido").html("CPF inválido");
    errors = true;
  } else {
    $cpf.removeClass('has-error');
    $("#cpf_solicitante_invalido").html("");
  }

  //valida o telefone
  if (! validateTelephone($telefone.val())) {
    $telefone.addClass('has-error');
    $("#telefone_solicitante_invalido").html("Telefone inválido");
    errors = true;
  } else {
    $telefone.removeClass('has-error');
    $("#telefone_solicitante_invalido").html("");
  }

  //valida o CP
  if (! validateZipcode($cep.val())) {
    $cep.addClass('has-error');
    $("#cep_solicitante_invalido").html("CEP inválido");
    errors = true;
  } else {
    $cep.removeClass('has-error');
    $("#cep_solicitante_invalido").html("");
  }

  //valida o endereço
  if (! validateLength($endereco.val(), 5)) {
    $endereco.addClass('has-error');
    $("#endereco_solicitante_invalido").html("Preencha o campo com no mínimo 5 caracteres");
    errors = true;
  } else {
    $endereco.removeClass('has-error');
    $("#endereco_solicitante_invalido").html("");
  }

  //valida a cidade
  if (! validateLength($cidade.val(), 5)) {
    $cidade.addClass('has-error');
    $("#cidade_solicitante_invalido").html("Preencha o campo com no mínimo 5 caracteres");
    errors = true;
  } else {
    $cidade.removeClass('has-error');
    $("#cidade_solicitante_invalido").html("");
  }

  //valida o estado
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

/**
 * Valida os campos do endereço de entrega
 *
 * @returns {boolean}
 */
var validateShippingAddressInfo = function () {
  var $cep = $("#cep_entrega");
  var $endereco = $("#endereco_entrega");
  var $cidade = $("#cidade_entrega");
  var $uf = $("#estado_entrega");
  
  var errors = false;

  //valida o CEP
  if (! validateZipcode($cep.val())) {
    $cep.addClass('has-error');
    $("#cep_entrega_invalido").html("CEP inválido");
    errors = true;
  } else {
    $cep.removeClass('has-error');
    $("#cep_entrega_invalido").html("");
  }

  //valida o endereço
  if (! validateLength($endereco.val(), 5)) {
    $endereco.addClass('has-error');
    $("#endereco_entrega_invalido").html("Preencha o campo com no mínimo 5 caracteres");
    errors = true;
  } else {
    $endereco.removeClass('has-error');
    $("#endereco_entrega_invalido").html("");
  }

  //valida a cidade
  if (! validateLength($cidade.val(), 5)) {
    $cidade.addClass('has-error');
    $("#cidade_entrega_invalido").html("Preencha o campo com no mínimo 5 caracteres");
    errors = true;
  } else {
    $cidade.removeClass('has-error');
    $("#cidade_entrega_invalido").html("");
  }

  //valida o estado
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

/**
 * Valida os campos do pedido
 *
 * @returns {boolean}
 */
var validateOrderInfo = function () {

};

/**
 * Inicializa o evento de clique para utilizar o mesmo endereço do solicitante
 * Desabilita todos os campos do endereço de entrega
 */
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

/**
 * Valida todos os campos do formulário de pedido
 */
var initTaskFormSubmitEvent = function () {
  $("#task-form").on('submit', function (e) {
    e.preventDefault();

    //check nos campos obrigatórios
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

    var errors = false;

    //valida os dados do solicitante
    if (! validateRequesterInfo()) {
      errors = true;
    }

    //valida os dados do endereço de entrega
    if (! validateShippingAddressInfo()) {
      errors = true;
    }

    //valida os dados do pedido
    if (! validateOrderInfo()) {
      errors = true;
    }

    //remove as mensagens de erro dos campos válidos
    if (! errors) {
      $('.required').each(function (index, obj){
        var id = $(this).attr('id');
        $(this).removeClass('has-error');
        $("#" + id + "_invalido").html('');
      });
    }
  });
};

/**
 * valida os campos obrigatórios
 */
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

/**
 * inicializa as mascaraas dos campos
 */
var initMasks = function () {
  $("#cep_entrega, #cep_solicitante").mask('00000-000', { clearIfNotMatch: true });
  $("#cpf_solicitante").mask('000.000.000-00', { clearIfNotMatch: true });
  $("#telefone_solicitante").mask("(00) 0000-00009", { clearIfNotMatch: true });
};

/**
 * Valida e adiciona os dados do formulário dos insumos
 */
var initNewInsuranceFormEvent = function () {
  $("#add-new-insurance").on('click', function (e) {
    var $marca = $("#marca_insumo");
    var $preco = $("#preco_insumo");
    var $quantidade = $("#quantidade_insumo");
    var $descricao = $("#descricao_insumo");

    var errors = false;

    //valida a marca
    if (! validateLength($marca.val(), 2, 50)) {
      $marca.addClass('has-error');
      $("#marca_insumo_invalido").html("Preencha o campo com no mínimo 2 caracteres e no máximo 50");
      errors = true;
    }

    //valida o preço
    if (! validateNumber($preco.val())) {
      $preco.addClass('has-error');
      $("#preco_insumo_invalido").html("Número inválido");
      errors = true;
    }

    //valida a quantidade
    if (! validateInt($quantidade.val())) {
      $quantidade.addClass('has-error');
      $("#quantidade_insumo_invalido").html("Número inválido");
      errors = true;
    }

    //valida a descrição
    if (! validateLength($descricao.val(), 3, 255)) {
      $descricao.addClass('has-error');
      $("#descricao_insumo_invalido").html("Preencha o campo com no mínimo 3 caracteres e no máximo 255");
      errors = true;
    }

    if (! errors) {
      var tds = "";

      //pega o indice do ultimo elemento na tabela e incrementa + 1
      var index = $("#can-add-insurance tr:last-child").data('index') + 1;

      tds += createElement('td', $marca.val() + createHiddenInput('insumo[' + index + '][marca]', $marca.val()));
      tds += createElement('td', $descricao.val() + createHiddenInput('insumo[' + index + '][descricao]', $descricao.val()));
      tds += createElement('td', $quantidade.val() + createHiddenInput('insumo[' + index + '][quantidade]', $quantidade.val(), "id='insumo_quantidade_" + index + "'"));
      tds += createElement('td', $preco.val() + createHiddenInput('insumo[' + index + '][preco]', $preco.val(), "id='insumo_preco_'" + index + "'"));

      var tr = "<tr data-index='" + index + "'>" + tds + "</tr>";

      $("#can-add-insurance").append(tr);
      //fecha o modal
      $("#new-insurance-modal .close").click();

      //calcula novamente o preço total do pedido
      var total = Number($quantidade.val()) * Number($preco.val());
      calcTotal(total);

      //reseta os valores dos campos
      $marca.val("");
      $preco.val("");
      $quantidade.val("");
      $descricao.val("");

      return true;
    }

    return false;
  })
};