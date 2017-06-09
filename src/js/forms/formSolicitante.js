var FormSolicitante = function(core, pedido, showContentFn) {

    var formSolicitante = null,
        timeoutCpf = null;

    this.init = function() {
        var $this = this;

        formSolicitante = new FormWizard('.form-solicitante', {
            nome: {
                rules: 'required|min:3|max:10'
            },
            telefone: {
                mask: '(00) 00000-0000',
            },
            cpf: {
                mask: '000.000.000-00',
                onCompleteMask: function() {
                    $this.searchCpf();
                }
            },
            cep: {
                mask: '00000-000',
                onCompleteMask: function(cep) {
                    $this.searchCep(cep);
                },
                hasLoading: true
            },
            rua: {
                rules: 'required|min:3'
            },
            numero: {
                rules: 'required'
            },
            complemento: {
                rules: 'required'
            },
            uf: {
                rules: 'required',
                select: true
            },
            cidade: {
                rules: 'required|min:3'
            }
        }, function() {

        });
        
        this.load();
    };

    this.load = function() {
        if (pedido.get('id') == 0) {
            showContentFn();
        } else {
            Database.findSolicitanteById(pedido.get('idSolicitante'), function(result) {
                if (result.length == 0) {
                    formSolicitante.setEnabled(['cep', 'nome', 'telefone']);
                } else {
                    var solicitante = result[0];

                    solicitante.cpf = maskCpf(solicitante.cpf);
                    solicitante.cep = maskCep(solicitante.cep);
                    solicitante.telefone = maskTelefone(solicitante.telefone);

                    formSolicitante.setValue(solicitante);
                    showContentFn();
                }
            });
        }
    }

    var maskTelefone = function(telefone) {
        var div = $('<div>'+telefone.replace('(').replace(')')+'</div>').mask('(00) 00000-0000');
        return div.text();
    }

    var maskCpf = function(cpf) {
        var div = $('<div>'+cpf+'</div>').mask('000.000.000-00');
        return div.text();
    }

    var maskCep = function(cep) {
        var div = $('<div>'+cep+'</div>').mask('00000-000');
        return div.text();
    }

    this.searchCep = function(cep) {
        var $this = this;

        var fieldsAddress = ['rua', 'numero', 'complemento', 'cidade', 'uf'];

        formSolicitante.setDisabled(fieldsAddress);
        CEP.getInfo(cep, function(address) {
            formSolicitante.setValue(address);
            formSolicitante.setEnabled(fieldsAddress);
        });
    };

    this.searchSolicitante = function() {
        clearTimeout(timeoutCpf);
        timeoutCpf = setTimeout(function() {
            var cpf = formSolicitante.get('cpf');
            console.log('cpf ', cpf);

        }, 1000);
    }

    this.init();
    
}