const clone = function (o) {
    return JSON.parse(JSON.stringify(o))
}

const getFirstWord = function (text) {
    return (text.indexOf(' ') > -1)? text.substring(0, text.indexOf(' ')): text
}