<template>
  <div id="app">
    <Topo></Topo>
    <router-view/>
    <Rodape class="rodape"></Rodape>
  </div>
</template>

<script>
import Topo from './components/Topo.vue'
import Rodape from './components/Rodape.vue'
export default {
  name: 'app',
  components: {
    Topo,
    Rodape
  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  .rodape {
    width:100%;
    position: absolute;
    bottom: 0;
    left: 0;
  }
</style>
