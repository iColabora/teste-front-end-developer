$(function () {
    google.charts.load('current', {'packages':['line', 'corechart', 'bar']});
    loadContent("#orders-per-day-link", "orders-per-day.html");
    loadContent("#orders-per-requester-link", "orders-per-requester.html");
    loadContent("#pending-orders-link", "pending-orders.html");
    loadContent("#start-process-button", "task.html");
});

/*var routes = function () {
  return {
      home : 'home.html',
      task : 'task.html',
      pedidos : {
          dia : 'orders-per-day.html',
          solicitante : 'orders-per-requester.html',
          pendentes : 'pending-orders.html'
      }
  };
};

var loadRoute = function () {
    var location = window.location.hash.replace('#/', '');
    if (routes()[location]) {
        var hue = location.split('/');
        loadContentByRoute(routes()[location][hue[1]]);
    }
    loadContentByRoute(routes()[location]);
};

var loadContentByRoute = function (html_file) {
    $.get(html_file, function (data) {
        $("#content").html(data);

        if ($(".navbar-collapse").is(":visible") && $(".navbar-toggle").is(":visible")) {
            $('.navbar-collapse').collapse('toggle');
        }
    });
};*/

var loadContent = function (selector, html_file) {
    $(selector).on('click', function (e) {
        $.get(html_file, function (data) {
            $("#content").html(data);

            if ($(".navbar-collapse").is(":visible") && $(".navbar-toggle").is(":visible")) {
                $('.navbar-collapse').collapse('toggle');
            }
        });
    });
};

function createElement(element, value) {
    return "<" + element + ">" + value + "</" + element + ">";
}

function createHiddenInput(name, value, extra) {
    return "<input type='hidden' name='" + name + "' value='" + value + "'" + extra + "/>";
}

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

var validateTelephone = function (tel) {
  tel = tel.replace(/[^\d]+/g,'');
  return validateLength(tel, 10, 11);
};

var validateZipcode = function (zip) {
  zip = zip.replace(/[^\d]+/g,'');
  return validateLength(zip, 8, 8);
};

var validateUf = function (uf) {
  var ufs = getUfArray();
  for (var i = 0; i < ufs.length; i++) {
      if (ufs[i] == uf) {
          return true
      }
  }
  return false;
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
