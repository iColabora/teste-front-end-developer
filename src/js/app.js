$(function () {
    $("#brand").on('click', function (event) {
        event.preventDefault();
        var $menu = $("#brand-menu");
        $menu.toggle();
    })
})