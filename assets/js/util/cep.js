export default function consultaCep(cep, done, fail) {
    if(!/(^[0-9]{5}-[0-9]{3}$)|(^[0-9]{8}$)/.test(cep))
        return null;
    $.ajax({
        url: 'http://viacep.com.br/ws/'+ cep.replace(/^[^0-9]$/, '') +'/json/',
        dataType: 'json',
        type: 'GET'
    })
    .done(done)
    .fail(fail)
}