var FormAddress = function(core, pedido, showContentFn) {

    var formAddress = null,
        address = null;

    this.init = function() {
        var $this = this;
        var solicitante = pedido.getSolicitante();

        formAddress = new FormWizard('.form-address', {
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
        
        this.setValueForm(solicitante);
    }

    this.submit = function( ) {
        address = {};
        address.cep = formAddress.get('cep').replace('-', '');
        address.rua = formAddress.get('rua');
        address.complemento = formAddress.get('complemento');
        address.numero = formAddress.get('numero');
        address.estado = formAddress.get('estado');
        address.cidade = formAddress.get('cidade');
        pedido.setAddress(address);
        core.paginatorForms.setSelectedPage('formInsurance');
    }

    var maskCep = function(cep) {
        var div = $('<div>'+cep+'</div>').mask('00000-000');
        return div.text();
    }

    this.setValueForm = function(solicitante) {
        address = {};
        address.cep = maskCep(solicitante.cep);
        address.rua = solicitante.rua;
        address.complemento = solicitante.complemento;
        address.numero = solicitante.numero;
        address.estado = solicitante.estado;
        address.cidade = solicitante.cidade;

        formAddress.setValue(address);
        formAddress.setAllEnabled();
        formAddress.validateAllFields();
        formAddress.verifySubmitEnabled();

        showContentFn();
    }

    this.searchCep = function(cep) {
        var $this = this;

        var fieldsAddress = ['cep', 'rua', 'numero', 'complemento', 'cidade', 'uf'];

        formAddress.setDisabled(fieldsAddress);
        CEP.getInfo(cep, function(address) {
            formAddress.setValue(address);
            formAddress.setEnabled(fieldsAddress);
        });
    };

    this.init();

}