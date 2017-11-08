<template>
<div>
  <div class="grid-x grid-margin-x formulario">
    <div class="small-4 cell">
      <fieldset class="fieldset small-12 cell">
        <legend>Solicitante</legend>
        <div class="button-group small row align-center">
          <a v-on:click="showModal('carregarSolictante')" class="button small">Carregar Solicitante</a>
          <a v-on:click="showModal('cadastrarSolicitante')" class="button secondary small">Cadastrar Solicitante</a>
        </div>
        <div v-if="solicitanteSelecionado !== null" class="solicitante grid-container">
          <p><strong>Nome Completo:</strong> {{ solicitanteSelecionado.nome }}</p>
          <p><strong>Telefone:</strong> {{ solicitanteSelecionado.telefone }}</p>
          <p><strong>CPF:</strong> {{ solicitanteSelecionado.cpf }}</p>
          <p><strong>CEP:</strong> {{ solicitanteSelecionado.cep }}</p>
          <p><strong>Rua:</strong> {{ solicitanteSelecionado.rua }}</p>
          <p><strong>Numero:</strong> {{ solicitanteSelecionado.numero }}</p>
          <p><strong>Bairro:</strong> {{ solicitanteSelecionado.bairro }}</p>
          <p><strong>Cidade:</strong> {{ solicitanteSelecionado.cidade }}</p>
          <p><strong>Estado:</strong> {{ solicitanteSelecionado.estado }}</p>
        </div>
      </fieldset>
    </div>
    <div class="small-4 cell">
      <fieldset class="fieldset small-12 cell">
        <legend>Materiais</legend>
        <div class="button-group small row align-center">
          <a v-on:click="showModal('inserirMaterial')" class="button small">Inserir Material</a>
        </div>
        <table class="tabelas">
          <thead>
          <tr>
            <th class="text-center" width="50">Qt</th>
            <th class="text-center" width="200">Nome</th>
            <th class="text-center" width="100">Preço</th>
            <th class="text-center" width="20"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(material, key) in materiais">
            <td class="text-center">{{ material.qt }}</td>
            <td class="text-center">{{ material.nome }}</td>
            <td class="text-center">{{ material.price }}</td>
            <td class="text-center"><i class="fa fa-trash btn-remove" v-on:click="removeMaterial(material.price, material.qt, key)" aria-hidden="true"></i></td>
          </tr>
          </tbody>
        </table>
      </fieldset>
      <fieldset class="fieldset small-12 cell">
        <legend>Insumos</legend>
        <div class="button-group small row align-center">
          <button @click="showModal('inserirInsumo')" class="button small" :disabled="materiais.length <= 0">Inserir Insumo</button>
        </div>
        <table class="tabelas">
          <thead>
          <tr>
            <th class="text-center" width="50">Qt</th>
            <th class="text-center" width="200">Descrição</th>
            <th class="text-center" width="100">Preço</th>
            <th class="text-center" width="20"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(insumo, key) in insumos">
            <td class="text-center">{{ insumo.qt }}</td>
            <td class="text-center">{{ insumo.nome }}</td>
            <td class="text-center">{{ insumo.price }}</td>
            <td class="text-center"><i class="fa fa-trash btn-remove" v-on:click="removeInsumo(insumo.price, insumo.qt, key)" aria-hidden="true"></i></td>
          </tr>
          </tbody>
        </table>
      </fieldset>
    </div>
    <div class="small-4 cell">
      <fieldset class="fieldset">
        <legend>Dados do Pedido</legend>
        <p class="numeroPedido">Número do Pedido: {{numeroPedido}}</p>
        <p>Total de Materiais: {{totalMateriais | currency}}</p>
        <p>Total de Insumos: {{totalInsumos | currency}}</p>
        <p>Total Geral: {{totalMateriais + totalInsumos | currency}}</p>
        <div class="button-group large row align-center finalizar">
          <router-link v-if="materiais.length > 0 && solicitanteSelecionado !== null" to="Dashboard"><button class="button success medium" >Finalizar</button></router-link>
        </div>
      </fieldset>
    </div>
    <!-- Modal Carregar Solicitante -->
    <modal name="carregarSolictante" height="auto">
      <table>
        <thead>
        <tr>
          <th class="text-center" width="200">Nome</th>
          <th class="text-center">Telefone</th>
          <th class="text-center">CPF</th>
          <th class="text-center">Selecionar</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(solicitante, key) in solicitantes">
          <td class="text-center">{{ solicitante.nome }}</td>
          <td class="text-center">{{ solicitante.telefone }}</td>
          <td class="text-center">{{ solicitante.cpf }}</td>
          <td class="text-center"><input type="radio" name="selecao" :value="solicitante" v-on:click="selectSolictante(solicitante)"></td>
        </tr>
        </tbody>
      </table>
      <div class="button-group small row align-center">
        <button v-on:click.prevent="carregaSolicitante" class="button" :disabled="! solicitantePreSel">Carregar</button>
        <button v-on:click.prevent="hideModal('carregarSolictante')"  class="alert button">Fechar</button>
      </div>
    </modal>
    <!-- Fim - Modal Carregar Solicitante -->
    <!-- Modal Cadastrar Solicitante -->
    <modal name="cadastrarSolicitante" height="auto">
      <form>
        <div class="grid-container modal">
          <div class="grid-x grid-padding-x" v-on:change="validate">
            <div class="small-12 cell">
              <label>Nome Completo
                <input type="text" v-model="cadastroSolicitante.nome">
              </label>
            </div>
            <div class="small-6 cell">
              <label>Telefone
                <input type="text" v-mask="['(##) #####-####', '(##) ####-####']"  v-model="cadastroSolicitante.telefone">
              </label>
            </div>
            <div class="small-6 cell">
              <label>CPF
                <input class="cpf" type="text" v-mask="'###.###.###-##'" v-on:blur="validateCPF"  v-model="cadastroSolicitante.cpf">
                <span v-if="isCpfValid === false" class="cpfError">CPF inválido.</span>
              </label>
            </div>
            <div class="small-6 cell">
              <label>CEP
                <input v-mask="'#####-###'" type="text" v-on:change="buscaCep" v-model="cadastroSolicitante.cep">
              </label>
            </div>
            <div class="small-12 cell">
              <label>Rua
                <input type="text" v-model="cadastroSolicitante.rua">
              </label>
            </div>
            <div class="small-6 cell">
              <label>Número - Complemento
                <input type="text" v-model="cadastroSolicitante.numero">
              </label>
            </div>
            <div class="small-6 cell">
              <label>Bairro
                <input type="text" v-model="cadastroSolicitante.bairro">
              </label>
            </div>
            <div class="small-6 cell">
              <label>Cidade
                <input type="text" v-model="cadastroSolicitante.cidade">
              </label>
            </div>
            <div class="small-3 cell">
              <label>Estado
                <input type="text" v-model="cadastroSolicitante.estado">
              </label>
            </div>
          </div>
          <div class="button-group small row align-center">
            <button v-on:click.prevent="cadastraSolicitante" class="button" :disabled="!isValid">Salvar</button>
            <button v-on:click.prevent="hideModal('cadastrarSolicitante')"  class="alert button">Fechar</button>
          </div>
        </div>
      </form>
    </modal>
    <!-- Fim - Modal Cadastrar Solicitante -->
    <!-- Modal Inserir Material -->
    <modal name="inserirMaterial" height="auto">
      <form>
        <div class="grid-container modal">
          <div class="grid-x grid-padding-x" v-on:change="validate">
            <div class="small-6 cell">
              <label>Quantidade
                <input type="number" v-model="novoMaterial.qt">
              </label>
            </div>
            <div class="small-6 cell">
              <label>Marca
                <input type="Text" v-model="novoMaterial.marca">
              </label>
            </div>
            <div class="small-6 cell">
              <label>Nome
                <input type="Text" v-model="novoMaterial.nome">
              </label>
            </div>
            <div class="small-6 cell">
              <label>Preço
                <input type="Text" v-money="money" v-model.lazy="novoMaterial.price">
              </label>
            </div>
          </div>
          <div class="button-group small row align-center">
            <button v-on:click.prevent="insereMaterial" class="button" :disabled="false">Inserir</button>
            <button v-on:click.prevent="hideModal('inserirMaterial')"  class="alert button">Fechar</button>
          </div>
        </div>
      </form>
    </modal>
    <!-- Fim - Modal Inserir Material -->
    <!-- Modal Inserir Insumo -->
    <modal name="inserirInsumo" height="auto">
      <form>
        <div class="grid-container modal">
          <div class="grid-x grid-padding-x" v-on:change="validate">
            <div class="small-12 cell">
              <label>Material Relacionado
                <select>
                  <option v-for="(material, key) in materiais">{{ material.nome }}</option>
                </select>
              </label>
            </div>
            <div class="small-6 cell">
              <label>Quantidade
                <input type="number" v-model="novoInsumo.qt">
              </label>
            </div>
            <div class="small-6 cell">
              <label>Marca
                <input type="Text" v-model="novoInsumo.marca">
              </label>
            </div>
            <div class="small-6 cell">
              <label>Nome
                <input type="Text" v-model="novoInsumo.nome">
              </label>
            </div>
            <div class="small-6 cell">
              <label>Preço
                <input type="Text" v-money="money" v-model.lazy="novoInsumo.price">
              </label>
            </div>
          </div>
          <div class="button-group small row align-center">
            <button v-on:click.prevent="insereInsumo" class="button" :disabled="false">Inserir</button>
            <button v-on:click.prevent="hideModal('inserirInsumo')"  class="alert button">Fechar</button>
          </div>
        </div>
      </form>
    </modal>
    <!-- Fim - Modal Inserir Material -->
  </div>
</div>

</template>

<script>
import HTTP from '../http-common'
import Axios from 'axios'
import {mask} from 'vue-the-mask'
import cpf from 'gerador-validador-cpf'

export default {
  name: 'Task',
  directives: {mask},
  data () {
    return {
      solicitantes: [],
      materiais: [],
      insumos: [],
      totalMateriais: 0,
      totalM: 0,
      totalInsumos: 0,
      numeroPedido: 0,
      solicitantePreSel: null,
      solicitanteSelecionado: null,
      cadastroSolicitante: {
        nome: null,
        telefone: null,
        cpf: null,
        cep: null,
        rua: null,
        numero: null,
        bairro: null,
        cidade: null,
        estado: null
      },
      novoMaterial: {
        qt: 1,
        nome: null,
        marca: null,
        price: 0.00
      },
      novoInsumo: {
        qt: 1,
        nome: null,
        marca: null,
        price: 0.00
      },
      isValid: false,
      isCpfValid: null,
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2
      }
    }
  },
  methods: {
    showModal (name) {
      this.$modal.show(name)
    },
    hideModal (name) {
      this.$modal.hide(name)
    },
    selectSolictante (solicitante) {
      this.solicitantePreSel = solicitante
    },
    carregaSolicitante () {
      this.solicitanteSelecionado = this.solicitantePreSel
      this.$modal.hide('carregarSolictante')
    },
    buscaCep () {
      Axios.get(`https://webmaniabr.com/api/1/cep/${this.cadastroSolicitante.cep}/?app_key=wPfEWZ5DtyvGhoo1OSz7r0qvGHpUNWgn&app_secret=oJ992p0gfoPL70mELVZk2mrnqTd51IS12pdXvofVgcIjdKWg`)
        .then(res => {
          console.log(res)
          this.cadastroSolicitante.rua = res.data.endereco
          this.cadastroSolicitante.bairro = res.data.bairro
          this.cadastroSolicitante.cidade = res.data.cidade
          this.cadastroSolicitante.estado = res.data.uf
        })
        .catch(err => console.log(err))
    },
    validate () {
      if (
        this.cadastroSolicitante.nome &&
        this.cadastroSolicitante.telefone &&
        this.cadastroSolicitante.cpf &&
        this.cadastroSolicitante.cep &&
        this.cadastroSolicitante.rua &&
        this.cadastroSolicitante.numero &&
        this.cadastroSolicitante.bairro &&
        this.cadastroSolicitante.cidade &&
        this.cadastroSolicitante.estado &&
        this.isCpfValid
      ) this.isValid = true
    },
    validateCPF () {
      this.isCpfValid = cpf.validate(this.cadastroSolicitante.cpf)
    },
    cadastraSolicitante () {
      this.solicitantes.push(this.cadastroSolicitante)
      this.solicitanteSelecionado = this.cadastroSolicitante
      this.$modal.hide('cadastrarSolicitante')
    },
    insereMaterial () {
      let price = this.novoMaterial.price.replace('R$', '').replace(',', '.')
      this.materiais.push(this.novoMaterial)
      this.totalMateriais += parseInt(price) * this.novoMaterial.qt
      this.novoMaterial = {}
      this.novoMaterial.qt = 1
      this.novoMaterial.price = 0.00
      this.$modal.hide('inserirMaterial')
    },
    removeMaterial (e, qt, index) {
      let price = e.replace('R$', '').replace(',', '.')
      this.totalMateriais -= parseInt(price) * qt
      this.materiais.splice(index, 1)
    },
    insereInsumo () {
      let price = this.novoInsumo.price.replace('R$', '').replace(',', '.')
      this.insumos.push(this.novoInsumo)
      this.totalInsumos += parseInt(price) * this.novoInsumo.qt
      this.novoInsumo = {}
      this.novoInsumo.qt = 1
      this.novoInsumo.price = 0.00
      this.$modal.hide('inserirInsumo')
    },
    removeInsumo (e, qt, index) {
      let price = e.replace('R$', '').replace(',', '.')
      this.totalInsumos -= parseInt(price) * qt
      this.insumos.splice(index, 1)
    },
    finalizar () {
      if (this.solicitanteSelecionado !== null && this.materiais.length > 0) return true
    }
  },
  created () {
    HTTP.get(`SELECT * FROM solicitantes`)
      .then(response => {
        this.solicitantes = response.data
      })
      .catch(err => console.log(err))
    HTTP.get(`Select Max(id) as id from pedidos`)
      .then(response => {
        this.numeroPedido = response.data[0].id + 1
      })
      .catch(err => console.log(err))
  }
}
</script>

<style scoped>
  .formulario {
    margin-left: 5px;
    margin-right: 5px;
  }
  table {
    font-size: 14px;
  }
  .solicitante p{
    font-size: 16px;
    line-height: 100%;
  }
  .cpfError {
    color: red;
    font-size: 80%;
    margin-left: 25px;
  }
  .cpf {
    margin-bottom: 0;
  }
  .modal {
    margin-top: 20px;
  }
  .tabelas {
    font-size: 13px;
  }
  .btn-remove {
    cursor: pointer;
  }
  .btn-remove:hover {
    color: red;
  }
  .numeroPedido {
    font-size: 150%;
  }
  .finalizar {
    margin-top: 40px;
  }
  .topo {
    background-color: #f9f9f9;
    margin: 0 !important;
  }
</style>
