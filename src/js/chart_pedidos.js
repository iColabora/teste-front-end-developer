var ChartPedidos = {

    type: 'line',
    labels: [],
    data: [],
    chart: null,
    el: null,
    label: '',

    init: function(el, label, labels, data) {
        this.label = label;
        this.el = el;
        this.labels = labels;
        this.data = data;
        this.constructElement();
    },

    constructElement: function() {
        var ctx = document.getElementById(this.el);
        ctx.height = 100;
        this.chart = new Chart(ctx, {
            type: this.type,
            data: {
                labels: this.labels,
                datasets: [{
                    label: this.label,
                    data: this.data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    }

};