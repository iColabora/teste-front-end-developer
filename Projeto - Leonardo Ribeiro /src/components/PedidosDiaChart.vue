<script>
  import HTTP from '../http-common'
  import { Bar } from 'vue-chartjs'
  import moment from 'moment'

  export default {
    extends: Bar,
    props: ['options'],
    data () {
      return {
        chartData: {
          labels: [],
          datasets: [
            {
              label: 'Pedidos Por Dia',
              backgroundColor: '#f87979',
              data: []
            }
          ]
        }
      }
    },
    created () {
      HTTP.get(`SELECT DATE(data_de_compra) as data, count(id) as total FROM pedidos GROUP BY  DATE(data_de_compra) ORDER BY DATE(data_de_compra) ASC`)
        .then(resp => {
          resp.data.forEach(ped => {
            this.chartData.labels.push(moment(ped.data).format('l'))
            this.chartData.datasets[0].data.push(parseInt(ped.total))
          })
        })
        .then(() => {
          this.renderChart(this.chartData, this.options)
        })
    }
  }
</script>
