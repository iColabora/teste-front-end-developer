var CEP = {

    getInfo: function(cep, callback) {
        $.getJSON('https://viacep.com.br/ws/'+cep+'/json/', callback);
    }

};