var selMateriais = '';
var selInsumos = '';
var selEstados = '';

//Buscar os dados da base de dados
var materiais = [
                 {'id':1,'id_pedido':1,'nome':'Caneta','marca':'bic','preco':5.00,'quantidade':3},
                 {'id':2,'id_pedido':1,'nome':'Lapis','marca':'faber','preco':3.00,'quantidade':4}            
                 ];
var insumos = [
               {'id':1,'id_pedido':1,'id_material':1,'descricao':'Tinta','preco':10,'quantidade':200},
               {'id':2,'id_pedido':2,'id_material':1,'descricao':'Grafite','preco':15,'quantidade':250},
               ];

var estados = ['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA','PB','PE','PI','PR',
               'RJ','RN','RO','RR','RS','SP','SC','SE','TO'];

function inicializar(){
	for(var i in materiais){
		selMateriais += '<option value="'+ materiais[i].id +'">'+ materiais[i].nome + '</option>';
	}
	
	for(var i in insumos){
		selInsumos += '<option value="'+ insumos[i].id +'">'+ insumos[i].descricao + '</option>';
	}
	
	for(var i in estados){
		selEstados += '<option value="'+ estados[i] +'">'+ estados[i] +'</option>';
	}
		
	document.getElementById("material_opcao").innerHTML = selMateriais;
	document.getElementById("insumo_opcao").innerHTML = selInsumos;
	document.getElementById("solicitante_uf").innerHTML = selEstados;
	document.getElementById("entrega_uf").innerHTML = selEstados;
	
	document.getElementById("material_preco_total").value = 0;
	document.getElementById("insumo_preco_total").value = 0;
}

//Materiais
function buscarObjetoMat(id){
	for(var i in materiais){
		if(materiais[i].id == id){
			return materiais[i];
		}
	}
}

function escolherMaterial(id){
	for(var i in materiais){		
		if(materiais[i].id == id){
			document.getElementById("material_marca").value = materiais[i].marca;
			document.getElementById("material_quantidade").value = 1;
			calcularPrecoTotalMat(1,id);
		}		
	}
}

function calcularPrecoTotalMat(quantidade,id){	
	var material = buscarObjetoMat(id);
	var total = quantidade * material.preco;
	document.getElementById("material_preco_total").value = total;
	
	calcularPrecoTotalGeral();
}

// Insumos
function buscarObjetoIns(id){
	for(var i in insumos){
		if(insumos[i].id == id){
			return insumos[i];
		}
	}
}

function escolherInsumo(id){
	
	for(var i in insumos){		
		if(insumos[i].id == id){
			//document.getElementById("insumo_marca").value = insumos[i].marca;
			document.getElementById("insumo_quantidade").value = 1;
			calcularPrecoTotalIns(1,id);
		}		
	}
}

function calcularPrecoTotalIns(quantidade,id){	
	var insumo = buscarObjetoIns(id);
	var total = quantidade * insumo.preco;
	document.getElementById("insumo_preco_total").value = total;
	
	calcularPrecoTotalGeral();
}
//


function calcularPrecoTotalGeral(){
	var totalMateriais = document.getElementById("material_preco_total").value;
	var totalInsumos = document.getElementById("insumo_preco_total").value;	
	var totalGeral = parseFloat(totalMateriais) + parseFloat(totalInsumos);	
	document.getElementById("total_geral").innerHTML = '<h4>Total do Pedido: R$ '+ totalGeral +'</h4>';
}

inicializar();