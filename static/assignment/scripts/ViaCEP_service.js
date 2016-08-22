angular.module('app').service('ViaCEPService', ['$rootScope',
    function($rootScope) {

        const __validation_CEP = function (bool, form, dados) {
            if(bool){
                $(form + ' input[name=rua]').val(dados.logradouro)
                $(form + ' input[name=bairro]').val(dados.bairro)
                $(form + ' input[name=cidade]').val(dados.localidade)
                $(form + ' input[name=estado]').val(dados.uf)
                $(form + ' input[name=pais]').val('Brasil')
                $(form + ' input[name=rua], ' + form + ' input[name=pais], ' + form + ' input[name=bairro], '
                    + form + ' input[name=estado], ' + form + ' input[name=cidade]').change()
            } else {
                $(form + ' input[name=pais]').val('').change()
                $.alert({ title: 'CEP não encontrado.', content: 'você inseri-lo corretamente?' })
                console.log('CEP não encontrado.')
            }
        }
        var tested =  {}
        var testing = {}

        return {
            test_CEP: function(self, form) {
                console.log('ViaCEP validation requested')
                //Nova variável "cep" somente com dígitos.
                var cep = $(self).val().replace(/\D/g, '')

                //Valida o formato do CEP.
                if ((cep != "") && (/^[0-9]{8}$/.test(cep))) {
                    if(cep in tested) {
                        __validation_CEP(tested[cep].result, form, tested[cep].dados)
                    } else {
                        if(cep in testing) { // multiple triggers from jQuery
                            return
                        }
                        console.log('sending CEP validation request')
                        testing[cep] = true
                        $.getJSON('//viacep.com.br/ws/'+ cep +'/json/?callback=?', function(dados) {
                            console.log('receiving CEP validation response')
                            delete testing[cep]

                            if (!('erro' in dados)) {
                                tested[cep] = {result: true, dados: dados}
                                __validation_CEP(true, form, dados)
                            } else {
                                tested[cep] = {result: false}
                                __validation_CEP(false, form, dados)
                            }
                        })
                    }
                } else {
                    $.alert({ title: 'CEP mal conformado.', content: 'mudança-a para melhor' })
                    console.log('CEP mal conformado.')
                }
            }
        }
    }
])