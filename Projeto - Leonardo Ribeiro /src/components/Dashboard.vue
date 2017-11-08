<template>
  <div class="pagina">
    <div class="grid-x">
      <div class="small-5 cell">
        <Chart1 :width="400" :height="200"></Chart1>
      </div>
      <div class="small-2 cell">
      </div>
      <div class="small-5 cell">
        <Chart2 :width="400" :height="200"></Chart2>
      </div>
    </div>
    <div class="grid-x">
      <div class="small-12 cell">
        <h3 class="text-center">Pedidos Pendentes</h3>
        <table>
          <thead>
          <tr>
            <th class="text-center">Número do Pedido</th>
            <th class="text-center">Data de Compra</th>
            <th class="text-center">Solicitante</th>
            <th class="text-center">CEP</th>
            <th class="text-center">Rua</th>
            <th class="text-center">Número</th>
            <th class="text-center">Bairro</th>
            <th class="text-center">Cidade</th>
            <th class="text-center">Estado</th>
            <th class="text-center">País</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(pedido, key) in pedidos">
            <td class="text-center">{{ pedido.id }}</td>
            <td class="text-center">{{ pedido.data_de_compra | dataBR}}</td>
            <td class="text-center">{{ pedido.nome }}</td>
            <td class="text-center">{{ pedido.cep }}</td>
            <td class="text-center">{{ pedido.rua }}</td>
            <td class="text-center">{{ pedido.numero }}</td>
            <td class="text-center">{{ pedido.bairro }}</td>
            <td class="text-center">{{ pedido.cidade }}</td>
            <td class="text-center">{{ pedido.estado }}</td>
            <td class="text-center">{{ pedido.pais }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>


</template>

<script>
  import HTTP from '../http-common'
  import Chart1 from '../components/PedidosDiaChart.vue'
  import Chart2 from '../components/PedidosPorCliente.vue'
  export default {
    components: {Chart1, Chart2},
    data () {
      return {
        pedidos: []
      }
    },
    created () {
      HTTP.get(`SELECT p.id, s.nome, p.data_de_compra, p.cep, p.rua, p.numero, p.bairro, p.cidade, p.estado, p.pais FROM pedidos p INNER JOIN solicitantes s ON s.id = p.id_solicitante ORDER BY p.data_de_compra ASC`)
        .then(resp => {
          this.pedidos = resp.data
        })
    }
  }
</script>

<style scoped>
.pagina {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 20px;
}
</style>
