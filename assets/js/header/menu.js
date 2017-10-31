export default function toggleProfile() {
    $('.profile').on('click', function(e) {
        e.stopPropagation();
        var element = $('.profile-info');
        if(element.hasClass('hide'))
            element.removeClass('hide');
        else 
            element.addClass('hide');
    });

    $('.profile-info, .profile-info *').on('click', function(e) {
        e.stopPropagation();
    });

    $(window).on('click', function() {
        var element = $('.profile-info');
        if(!element.hasClass('hide'))
            element.addClass('hide');
    });
}