angular.module('app').service('MySQL', ['$rootScope',
    function($rootScope) {

        const __validation_CEP = function (bool, form) {
            if(bool){
                $(form + ' input[name=rua]').val(dados.logradouro).change()
                $(form + ' input[name=bairro]').val(dados.bairro).change()
                $(form + ' input[name=cidade]').val(dados.localidade).change()
                $(form + ' input[name=estado]').val(dados.uf).change()
                $(form + ' input[name=pais]').val('Brasil').change()
            } else {
                $(form + ' input[name=pais]').val('').change()
                $.alert({ title: 'CEP não encontrado.', content: 'você inseri-lo corretamente?' })
                console.log('CEP não encontrado.')
            }
        }
        var tested =  {}

        return {
            test_CEP: function(self, form) {
                //Nova variável "cep" somente com dígitos.
                var cep = $(self).val().replace(/\D/g, '')

                //Valida o formato do CEP.
                if ((cep != "") && (/^[0-9]{8}$/.test(cep))) {
                    if(cep in tested) {
                        console.log('skipping validation request')
                        __validation_CEP(tested[cep], form)
                    } else {
                        console.log('sending CEP validataion request')
                        $.getJSON('//viacep.com.br/ws/'+ cep +'/json/?callback=?', function(dados) {
                            console.log('receiving CEP validataion response')

                            if (!('erro' in dados)) {
                                tested[cep] = true
                                __validation_CEP(true, form)
                            } else {
                                tested[cep] = false
                                __validation_CEP(false, form)
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