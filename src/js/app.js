//inicializa a API de gráficos do google
google.charts.load('current', {'packages':['line', 'corechart', 'bar']});

$(function () {
    //inicializa os eventos de navegação das páginas
    loadContent("#orders-per-day-link", "orders-per-day.html");
    loadContent("#orders-per-requester-link", "orders-per-requester.html");
    loadContent("#pending-orders-link", "pending-orders.html");
    loadContent("#start-process-button", "task.html");
    loadContent("#brand", "home.html");
});

/**
 * Carrega o conteúdo de uma página html
 *
 * @param selector Seletor do link que será clicado
 * @param html_file Arquivo HTML que será chumbado na página
 */
var loadContent = function (selector, html_file) {
    $(selector).on('click', function (e) {
        loadModal();
        $.get(html_file, function (data) {
            $("#content").html(data);

            if ($(".navbar-collapse").is(":visible") && $(".navbar-toggle").is(":visible")) {
                $('.navbar-collapse').collapse('toggle');
            }
        });
        closeModal();
    });
};

/**
 * Abre o modal de carregamento
 */
var loadModal = function () {
  $("#modal-loading").modal('show');
};

/**
 * Fecha o modal de carregamento
 */
var closeModal = function () {
    $("#modal-loading").modal('hide');
};

/**
 * Cria um elemento HTML de forma simples
 *
 * @param element Nome do elemento
 * @param value Valor do elemento
 *
 * @returns {string}
 */
function createElement(element, value) {
    return "<" + element + ">" + value + "</" + element + ">";
}

/**
 * Cria um elemento input hidden
 *
 * @param name Nome do campo
 * @param value Valor do campo
 * @param extra Dados extras do campo
 *
 * @returns {string}
 */
function createHiddenInput(name, value, extra) {
    return "<input type='hidden' name='" + name + "' value='" + value + "'" + extra + "/>";
}

/**
 * Array completo com todas as UFs do Brasil
 *
 * @returns {string[]}
 */
var getUfArray = function () {
    return [
        "AC",
        "AL",
        "AP",
        "AM",
        "BA",
        "CE",
        "DF",
        "ES",
        "GO",
        "MA",
        "MT",
        "MS",
        "MG",
        "PA",
        "PB",
        "PR",
        "PE",
        "PI",
        "RJ",
        "RN",
        "RS",
        "RO",
        "RR",
        "SC",
        "SP",
        "SE",
        "TO"
    ];
};

/**
 * Valida um CPF
 *
 * @param cpf
 * @returns {boolean}
 */
var validateCpf = function (cpf) {
    cpf = cpf.replace(/[^\d]+/g,'');
    var numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;
    if (cpf.length < 11) {
        return false;
    }
    for (i = 0; i < cpf.length - 1; i++) {
        if (cpf.charAt(i) != cpf.charAt(i + 1)){
            digitos_iguais = 0;
            break;
        }
    }
    if (! digitos_iguais) {
        numeros = cpf.substring(0,9);
        digitos = cpf.substring(9);
        soma = 0;
        for (i = 10; i > 1; i--)
            soma += numeros.charAt(10 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0)) {
            return false;
        }
        numeros = cpf.substring(0,10);
        soma = 0;
        for (i = 11; i > 1; i--) {
            soma += numeros.charAt(11 - i) * i;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1)) {
            return false;
        }
        return true;
    } else {
        return false;
    }
};

/**
 * Valida um telefone
 *
 * @param tel
 */
var validateTelephone = function (tel) {
  tel = tel.replace(/[^\d]+/g,'');
  return validateLength(tel, 10, 11);
};

/**
 * Valida um CEP
 *
 * @param zip
 */
var validateZipcode = function (zip) {
  zip = zip.replace(/[^\d]+/g,'');
  return validateLength(zip, 8, 8);
};

/**
 * Valida uma UF
 *
 * @param uf
 * @returns {boolean}
 */
var validateUf = function (uf) {
  var ufs = getUfArray();
  for (var i = 0; i < ufs.length; i++) {
      if (ufs[i] == uf) {
          return true
      }
  }
  return false;
};

/**
 * Valida o tamanho de uma string
 *
 * @param str
 * @param min Quantidade minima de caracteres
 * @param max Quantidade maxima de caracters
 *
 * @returns {boolean}
 */
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

/**
 * Valida um numero do tipo inteiro
 *
 * @param int
 * @returns {boolean}
 */
var validateInt = function (int) {
    int = Number(int);
    return (int > 0 && int === parseInt(int, 10));
};


/**
 * Valida um numero do tipo decimal
 *
 * @param number
 * @returns {boolean}
 */
var validateNumber = function (number) {
    number = Number(number);
    return (number > 0 && !isNaN(parseFloat(number)) && isFinite(number));
};
