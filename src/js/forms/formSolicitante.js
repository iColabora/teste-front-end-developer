var FormSolicitante = function(core, showContentFn) {

    var formSolicitante = null;

    this.init = function() {
        var $this = this;

        formSolicitante = new FormWizard('.form-wizard.form-solicitante', {
            nome: {
                rules: 'required|min:3|max:10'
            },
            telefone: {
                mask: '(00) 00000-0000',
            },
            cpf: {
                mask: '000.000.000-00',
            },
            cep: {
                mask: '00000-000',
                onCompleteMask: function(cep) {
                    $this.searchCep(cep);
                }
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
        showContentFn();
    };

    this.searchCep = function(cep) {
        var $this = this;

        var fieldsAddress = ['rua', 'numero', 'complemento', 'cidade', 'uf'];

        formSolicitante.setDisabled(fieldsAddress);
        CEP.getInfo(cep, function(address) {
            formSolicitante.setValue(address);
            formSolicitante.setEnabled(fieldsAddress);
        });
    };

    this.init();
    
}