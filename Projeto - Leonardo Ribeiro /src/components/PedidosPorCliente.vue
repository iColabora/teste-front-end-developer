<script>
  import HTTP from '../http-common'
  import { Pie } from 'vue-chartjs'

  export default {
    extends: Pie,
    props: ['options'],
    data () {
      return {
        chartData: {
          labels: [],
          datasets: [
            {
              backgroundColor: '#39bb9d',
              data: []
            }
          ]
        }
      }
    },
    created () {
      HTTP.get(`SELECT s.nome, count(s.id) total FROM pedidos p INNER JOIN solicitantes s ON s.id = p.id_solicitante GROUP BY s.id`)
        .then(resp => {
          resp.data.forEach(ped => {
            this.chartData.labels.push(ped.nome)
            this.chartData.datasets[0].data.push(parseInt(ped.total))
          })
        })
        .then(() => {
          this.renderChart(this.chartData, this.options)
        })
    }
  }
</script>
