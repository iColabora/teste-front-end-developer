var Paginator = function(links, el, onPageChange) {

    var $this = this,
        $links = $(links),
        $el = $(el),
        selectedPage = null,
        pagesLoaded = {};

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

    this.loadHtml = function(page, el, callback) {
        $.ajax({
            url: "views/"+page+".html"
        }).done(function(result) {
            el.find('.content').html(result);
            callback();
        });
    }

    this.setSelectedPage = function(page) {
        $this = this;

        $el.find('.page').removeClass('show-page').addClass('hide-page');
        $el.find('.page .loading').removeClass('hide');
        $el.find('.page .content').removeClass('show');
        this.selectedPage = $el.find('div[data-page='+page+']');
        this.selectedPage.addClass('show-page').removeClass('hide-page');

        var showContentFn = function() {
            $this.selectedPage.find('.loading').addClass('hide');
            $this.selectedPage.find('.content').addClass('show');
        }

        if (!pagesLoaded.page) {
            this.loadHtml(page, this.selectedPage, function() {
                onPageChange(page, showContentFn);
            });
        } else {
            onPageChange(page, showContentFn);
        }
    }

}