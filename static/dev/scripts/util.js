const clone = function (o) {
    return JSON.parse(JSON.stringify(o))
}

const getFirstWord = function (text) {
    return (text.indexOf(' ') > -1)? text.substring(0, text.indexOf(' ')): text
}

const Contract = {
    GET_MATERIAL: function (id) {
        return 'SELECT * FROM materiais WHERE id = ' + id
    },
    GET_PEDIDOS_FOR_SOLICITANTE: function (id) {
        return 'SELECT * FROM pedidos WHERE id_solicitante = ' + id
    }
}