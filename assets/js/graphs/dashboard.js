export default function dashboard() {
    $("[data-toggle=charts]").on('click', function() {
        var $this = $(this);
        var elements = $("[data-toggle=charts]");
        elements.removeClass('active');

        var target = $($this.attr('data-target'));

        console.log(target, $this.attr('data-target'));

        $('.chart').addClass('hide');
        $('.chart').removeClass('fadeIn');
        target.closest('.chart').removeClass('hide fadeIn');
        target.closest('.chart').addClass('fadeIn');
        $this.addClass('active');
    });

    $("[data-toggle=charts]:nth-of-type(1)").trigger('click');
}