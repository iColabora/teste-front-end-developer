$(function () {
    google.charts.load('current', {'packages':['line', 'corechart', 'bar']});
    loadContent("#orders-per-day-link", "orders-per-day.html");
    loadContent("#orders-per-requester-link", "orders-per-requester.html");
    loadContent("#pending-orders-link", "pending-orders.html");
});

var loadContent = function (selector, html_file) {
    $(selector).on('click', function (e) {
        e.preventDefault();

        $.get(html_file, function (data) {
            $("#content").html(data);

            if ($(".navbar-collapse").is(":visible") && $(".navbar-toggle").is(":visible")) {
                $('.navbar-collapse').collapse('toggle');
            }
        });
    });
};