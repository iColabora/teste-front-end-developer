function alertError(message) {
    $.alert({
        title: 'Encontramos algum(ns) erro(s):',
        content: message,
        type: 'red'
    });
}

function alertSuccess(message) {
    $.alert({
        title: 'Sucesso',
        content: message,
        type: 'green'
    });
}

export {alertError, alertSuccess};