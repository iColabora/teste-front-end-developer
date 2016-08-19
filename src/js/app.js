$(function () {
    google.charts.load('current', {'packages':['line', 'corechart', 'bar']});
    loadContent("#orders-per-day-link", "orders-per-day.html");
    loadContent("#orders-per-requester-link", "orders-per-requester.html");
    loadContent("#pending-orders-link", "pending-orders.html");
    loadContent("#start-process-button", "task.html");
});

var loadContent = function (selector, html_file) {
    $(selector).on('click', function (e) {
        $.get(html_file, function (data) {
            $("#content").html(data);

            if ($(".navbar-collapse").is(":visible") && $(".navbar-toggle").is(":visible")) {
                $('.navbar-collapse').collapse('toggle');
            }
        });
    });
};

function createElement(element, value) {
    return "<" + element + ">" + value + "</" + element + ">";
}

function createHiddenInput(name, value) {
    return "<input type='hidden' name='" + name + "' value='" + value + "' />";
}

var validateLength = function (str, min, max) {
    var length = str.length;
    if (length >= min) {
        if (max && length > max) {
            return false;
        }
        return true;
    }
    return false;
};

var validateInt = function (int) {
    int = Number(int);
    return (int > 0 && int === parseInt(int, 10));
};


var validateNumber = function (number) {
    number = Number(number);
    return (number > 0 && !isNaN(parseFloat(number)) && isFinite(number));
};
