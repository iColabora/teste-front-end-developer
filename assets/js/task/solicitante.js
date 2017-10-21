import consultaCep from './../util/cep.js';
import {alertError} from './../util/alerts.js';

export default function formSolicitante() {
    $('[name="solicitante-cep"]').on('keyup',function() {
        var $this = $(this);
        if($this.cleanVal().length == 8) {
            consultaCep($this.cleanVal(), function(json) {
                $('[name="solicitante-endereco"]').val(json.logradouro);
                $('[name="solicitante-cidade"]').val(json.localidade);
                $('[name="solicitante-estado"]').val(json.uf);
                $('[name="solicitante-complemento"]').val(json.complemento);
            }, function(error) {
                console.log(error);
                alertError('Falha ao consultar endereço pelo cep');
            })
        }
    });
}