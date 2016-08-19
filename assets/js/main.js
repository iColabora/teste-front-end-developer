/* Main JS
   ========================================================================== */

(function($) {


	iSystem = {};

	// Valida se existe o pedido
	iSystem.validPedido = function(idPedido) {
			iQueryPedidos = "SELECT * FROM pedidos WHERE id =" + idPedido;
			mysqlQuery(iQueryPedidos, function(result) {
				var obj = JSON.parse(result);
				if (obj == "") {
					console.log("VAZIO");
				} else {
					iSystem.getPedido(obj);
					iSystem.controlForm();
				}
			});
		}
		// Dados principais do pedido
	iSystem.getPedido = function(result) {
			result.forEach(function(el) {
				jQuery("[name='pedidoID']").val(el.id);
				jQuery("[name='pedidoCEP']").val(el.cep);
				jQuery("[name='pedidoEndereco']").val(el.rua);
				jQuery("[name='pedidoComplemento']").val(el.bairro);
				jQuery("[name='pedidoCidade']").val(el.cidade);
				jQuery("[name='pedidoEstado']").val(el.estado);
				iSystem.solicitantePedido(el.id_solicitante);
				iSystem.insumosPedido(el.id_solicitante);
				iSystem.materiaisPedido(el.id_solicitante);
			});
		}
		// Dados do Solicitante do Pedido
	iSystem.solicitantePedido = function(id_solicitante) {
			var iQuerySolicitante = "SELECT * FROM solicitantes WHERE id =" + id_solicitante;
			mysqlQuery(iQuerySolicitante, function(result) {
				var obj = JSON.parse(result);
				obj.forEach(function(el) {
					jQuery("[name='solicitanteNome']").val(el.nome);
					jQuery("[name='solicitanteTelefone']").val(el.telefone);
					jQuery("[name='solicitanteCPF']").val(el.cpf);
					jQuery("[name='solicitanteCEP']").val(el.cep);
					jQuery("[name='solicitanteEndereco']").val(el.rua);
					jQuery("[name='solicitanteComplemento']").val(el.bairro);
					jQuery("[name='solicitanteCidade']").val(el.cidade);
					jQuery("[name='solicitanteEstado']").val(el.estado);
				});
			});
		}
		// Insumos do Pedido
	iSystem.insumosPedido = function(idPedido) {
			iSystem.clearContainer("#insumos");
			var iQueryInsumos = "SELECT * FROM insumos WHERE id_pedido =" + idPedido;
			mysqlQuery(iQueryInsumos, function(result) {
				var obj = JSON.parse(result);
				obj.forEach(function(el) {
					var output_insumos = "" +
						"<div class='grupo-4'><fieldset><label>descricao</label><input type='text' name='insumosDescricao[]' value='" + el.descricao + "'></fieldset></div>" +
						"<div class='grupo-4'><fieldset><label>preço</label><input type='text' name='insumosPreco[]' value='" + el.preco + "'></fieldset></div>" +
						"<div class='grupo-4'><fieldset><label>quantidade</label><input type='text' name='insumosQuantidade[]' value='" + el.quantidade + "'></fieldset></div>";
					jQuery("#insumos").append(output_insumos);
				});
			});
		}
		// Meteriais do Pedido
	iSystem.materiaisPedido = function(idPedido) {
			iSystem.clearContainer("#materiais");
			var iQueryMeteriais = "SELECT * FROM materiais WHERE id_pedido =" + idPedido;
			mysqlQuery(iQueryMeteriais, function(result) {
				var obj = JSON.parse(result);
				obj.forEach(function(el) {
					var output_meteriais = "" +
						"<div class='grupo-3'><fieldset><label>material</label><input type='text' name='materialNome[]' value='" + el.nome + "'></fieldset></div>" +
						"<div class='grupo-3'><fieldset><label>marca</label><input type='text' name='materialMarca[]' value='" + el.marca + "'></fieldset></div>" +
						"<div class='grupo-3'><fieldset><label>preço</label><input type='text' name='materialPreco[]' value='" + el.preco + "'></fieldset></div>" +
						"<div class='grupo-3'><fieldset><label>quantidade</label><input type='text' name='materialQuantidade[]' value='" + el.quantidade + "'></fieldset></div>";
					jQuery("#materiais").append(output_meteriais);
				});
			});
	}
		// Calculo Total
	iSystem.calculaTotal = function() {
			jQuery('.total__prize').text("R$ " + valorTotal);
	}
		// Aviso
		// tipo: error, sucess, wating
	iSystem.avisoDisplay = function(text, tipo) {
			iSystem.clearContainer("#message");
			var message = "<div class='message message--" + tipo + "'>" + text + "</div>";
			jQuery("#message").append(message);
			setTimeout(function() {
				iSystem.clearContainer("#message");
			}, 2000);
		}
		// Limpa contianer
	iSystem.clearContainer = function(container) {
			jQuery(container).empty();
		}
		// Mostra o formulário
	iSystem.controlForm = function() {
			form = jQuery(".form");
			if (form.hasClass('form--hide')) {
				form.removeClass('form--hide');
			}
		}
		// Limpar o formulário
	iSystem.clearForm = function() {
			form = jQuery(".form");
			form.closest('form').find("input[type=text], textarea").val("");
		}
	// Pegar o ultimo id do pedido e incrementa
	iSystem.showPedido = function() {
		var iQueryLast = "SELECT max(id) FROM pedidos";
		mysqlQuery(iQueryLast, function(result) {
			var obj = JSON.parse(result);
			obj.forEach(function(el) {
				console.log(el);
				iSystem.clearForm();
				jQuery("[name='pedidoID']").val('10');
				iSystem.controlForm();
			});
		});
	}

	// CEP Pedido
		iSystem.getCep = function() {
			if (this.value.length == 8) {
				console.log("BUSCANDO CEP");
				jQuery.ajax({
					url: "https://viacep.com.br/ws/" + this.value + "/json",
					dataType: "JSON",
					error: iSystem.getCepError,
					success: iSystem.getCepSucess
				});
			}
		}

		iSystem.getCepError = function() {
			console.log("erro");
		}

		iSystem.getCepSucess = function(response) {
			if (response.erro == true) {
				console.log("error");
			} else {
				iSystem.getCepType(response);
			}
		}

		iSystem.getCepType = function(response){
			console.log(response);
			jQuery("[name='solicitanteEndereco']").val(response.logradouro);
			jQuery("[name='solicitanteComplemento']").val(response.complemento);
			jQuery("[name='solicitanteCidade']").val(response.localidade);
			jQuery("[name='solicitanteEstado']").val(response.uf);		
		}

	// CEP Entrega
		iSystem.getEntregaCep = function() {
			if (this.value.length == 8) {
				console.log("BUSCANDO CEP");
				jQuery.ajax({
					url: "https://viacep.com.br/ws/" + this.value + "/json",
					dataType: "JSON",
					error: iSystem.getCepEntregaError,
					success: iSystem.getCepEntregaSucess
				});
			}
		}

		iSystem.getCepEntregaError = function() {
			console.log("erro");
		}

		iSystem.getCepEntregaSucess = function(response) {
			if (response.erro == true) {
				console.log("error");
			} else {
				iSystem.getCepEntregaType(response);
			}
		}

		iSystem.getCepEntregaType = function(response){
			console.log(response);
			jQuery("[name='pedidoEndereco']").val(response.logradouro);
			jQuery("[name='pedidoComplemento']").val(response.complemento);
			jQuery("[name='pedidoCidade']").val(response.localidade);
			jQuery("[name='pedidoEstado']").val(response.uf);		
		}
	// Duplicar Campos Materiais
	iSystem.duplicaMateriais = function(){
		if (jQuery("[name='materialNome[]']").length < 4){
			var output_meteriais = "" +
			"<div class='grupo-3'><fieldset><label>material</label><input type='text' name='materialNome[]' value=''></fieldset></div>" +
			"<div class='grupo-3'><fieldset><label>marca</label><input type='text' name='materialMarca[]' value=''></fieldset></div>" +
			"<div class='grupo-3'><fieldset><label>preço</label><input type='text' name='materialPreco[]' value=''></fieldset></div>" +
			"<div class='grupo-3'><fieldset><label>quantidade</label><input type='text' name='materialQuantidade[]' value=''></fieldset></div>";
			jQuery("#materiais").append(output_meteriais);
		} else {
			iSystem.avisoDisplay('Numero máximo de materias atingido', 'error');
		}
	}
	// Duplicar Campos Insumos
	iSystem.duplicaInsumo = function(){
		if (jQuery("[name='insumosDescricao[]']").length < 2){
			var output_insumos = "" +
				"<div class='grupo-4'><fieldset><label>descricao</label><input type='text' name='insumosDescricao[]' value=''></fieldset></div>" +
				"<div class='grupo-4'><fieldset><label>preço</label><input type='text' name='insumosPreco[]' value=''></fieldset></div>" +
				"<div class='grupo-4'><fieldset><label>quantidade</label><input type='text' name='insumosQuantidade[]' value=''></fieldset></div>";
			jQuery("#insumos").append(output_insumos);
		} else {
			iSystem.avisoDisplay('Numero máximo de insumos atingido', 'error');
		}
	}
	iSystem.init = function() {
		jQuery("#addPedido").on('click', function(event) {
			iSystem.showPedido();
		});
		jQuery("#getPedido").on('click', function(event) {
			var pedidoID = jQuery("#numPedido").val(),
				pedidoAtual = jQuery("[name='pedidoID']").val();
			if (pedidoID == pedidoAtual) {
				iSystem.avisoDisplay("Pedido já está carregado", "error");
			} else {
				iSystem.validPedido(pedidoID);
			}
		});
		jQuery("#insumosAdd").on('click', function(event) {
			event.preventDefault();
			iSystem.duplicaInsumo();
		});
		jQuery("#materiaisAdd").on('click', function(event) {
			event.preventDefault();
			iSystem.duplicaMateriais();
		});
		jQuery("[name='solicitanteCEP']")
			.on("input", iSystem.getCep);
		jQuery("[name='pedidoCEP']")
			.on("input", iSystem.getEntregaCep);
		
	}();

})(jQuery);