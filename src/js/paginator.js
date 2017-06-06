var Paginator = function(links, el) {

    var $this = this,
        $links = $(links),
        $el = $(el),
        selectedPage = null;

    var _createEvents = function() {
        $links.click(function() {
            $this.setSelectedPage($(this).attr('href').replace('#', ''));
        });
    }

    this.init = function() {
        _createEvents();
    };

    this.setSelectedPage = function(page) {
        $el.find('.page').removeClass('show-page').addClass('hide-page');
        this.selectedPage = $el.find('div[data-page='+page+']');
        this.selectedPage.addClass('show-page').removeClass('hide-page');
    }

}