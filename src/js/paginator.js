var Paginator = function(links, el, onPageChange) {

    var $this = this,
        $links = $(links),
        $el = $(el),
        selectedPage = null;

    var _createEvents = function() {
        $links.click(function() {
            if ($(this).hasClass('enabled')) {
                $this.setSelectedPage($(this).attr('href').replace('#', ''));
            }
        });
    }

    this.init = function() {
        _createEvents();
    };

    this.setSelectedPage = function(page) {
        $this = this;
        $el.find('.page').removeClass('show-page').addClass('hide-page');
        this.selectedPage = $el.find('div[data-page='+page+']');
        this.selectedPage.addClass('show-page').removeClass('hide-page');

        var showContentFn = function() {
            $this.selectedPage.find('.loading').addClass('hide');
            $this.selectedPage.find('.content').addClass('show');
        }
        
        onPageChange(page, showContentFn);
    }

}