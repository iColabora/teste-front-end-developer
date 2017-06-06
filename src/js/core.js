var Core = {

    paginatorMenu: null,
    validator: null,

    init: function() {
        this.paginatorMenu = new Paginator('#menu ul a', '.paginator');
        this.paginatorMenu.init();

        Database.fetchAllPedidos(function(result) {
            console.log(result);
        });

        CEP.getInfo('08411462', function(result) {
            console.log(result);
        });
    }

}

Core.init();