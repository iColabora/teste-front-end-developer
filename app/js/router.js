// Application Router
// =============

// Includes file dependencies
define([ "jquery","backbone"
        , "views/dashboard/dashboardView", "views/task/taskView"
    ],
    function( $, Backbone
        , dashboardView, taskView) {

        var AppRouter = Backbone.Router.extend({

            // Backbone.js Routes
            routes: {
                // When there is no hash bang on the url, the default method is called
                '':  'dashboard',
                "dashboard" : "dashboard",
                "task": "task",
            },
            dashboard : function(){
                if (this.currentDashboardView) this.currentDashboardView.close();
                var dashboard = new dashboardView();
                this.currentDashboardView=dashboard;
                dashboard.render();
            },
            task : function(){
                if (this.currentTaskView) this.currentTaskView.close();
                var task = new taskView();
                this.currentTaskView=task;
                task.render();

            },
        });

        return AppRouter;


    });