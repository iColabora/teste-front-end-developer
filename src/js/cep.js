var CEP = {

    getInfo: function(cep, callback) {
        $.getJSON('https://viacep.com.br/ws/'+cep+'/json/', function(info) {
            if (info.erro) {
                callback(info);
                return;
            }

            var address = {
                rua: info.logradouro,
                cidade: info.localidade,
                bairro: info.bairro,
                uf: info.uf,
                pais: 'Brasil'
            };

            callback(address);
        });
    }

};