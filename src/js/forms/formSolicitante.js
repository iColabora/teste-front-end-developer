var FormSolicitante = function(core, pedido, showContentFn) {

    var formSolicitante = null,
        timeoutCpf = null;

    this.init = function() {
        var $this = this;

        formSolicitante = new FormWizard('.form-solicitante', {
            id: {

            },
            nome: {
                rules: 'required|min:3|max:100'
            },
            telefone: {
                rules: 'required',
                mask: '(00) 00000-0000',
            },
            cpf: {
                rules: 'required',
                mask: '000.000.000-00',
                onCompleteMask: function() {
                    $this.searchSolicitante();
                },
                hasLoading: true
            },
            cep: {
                rules: 'required',
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
                
            },
            estado: {
                rules: 'required',
                select: true
            },
            cidade: {
                rules: 'required|min:3'
            }
        }, function() {
            $this.submit();
        });
        
        this.load();
    };

    this.submit = function() {
        var values = formSolicitante.getAll();
        values.cpf = formSolicitante.getCleanValue('cpf');
        values.cep = values.cep.replace('-', '');
        values.telefone = values.telefone.replace(' ', '');

        pedido.setSolicitante(values);
        core.paginatorForms.setSelectedPage('formMaterial');
    }

    this.load = function() {
        var $this = this;
        
        if (pedido.get('id') == 0) {
            showContentFn();
        } else {
            Database.findSolicitanteById(pedido.get('idSolicitante'), function(result) {
                if (result.length == 0) {
                    formSolicitante.setEnabled(['cep', 'nome', 'telefone']);
                } else {
                    var solicitante = result[0];
                    $this.setValueForm(solicitante);
                    formSolicitante.validateAllFields();
                    formSolicitante.verifySubmitEnabled();
                }
                showContentFn();
            });
        }
    }

    this.setValueForm = function(solicitante) {
        solicitante.cpf = maskCpf(solicitante.cpf);
        solicitante.cep = maskCep(solicitante.cep);
        solicitante.telefone = maskTelefone(solicitante.telefone);

        formSolicitante.setValue(solicitante);
        formSolicitante.setAllEnabled();
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

        var fieldsAddress = ['cep', 'rua', 'numero', 'complemento', 'cidade', 'uf'];

        formSolicitante.setDisabled(fieldsAddress);
        CEP.getInfo(cep, function(address) {
            formSolicitante.setValue(address);
            formSolicitante.setEnabled(fieldsAddress);
        });
    };

    this.searchSolicitante = function() {
        var $this = this;

        clearTimeout(timeoutCpf);
        timeoutCpf = setTimeout(function() {
            formSolicitante.setDisabled(['cpf']);
            var cpf = formSolicitante.getCleanValue('cpf');
            formSolicitante.showLoading('cpf');

            Database.findSolicitanteByCpf(cpf, function(result) {
                if (result.length == 0) {
                    formSolicitante.setEnabled(['cep', 'nome', 'telefone']);
                } else {
                    $this.setValueForm(result[0]);
                    formSolicitante.validateAllFields();
                    formSolicitante.verifySubmitEnabled();
                }
                formSolicitante.hideLoading('cpf');
            });
        }, 1000);
    }

    this.init();
    
}