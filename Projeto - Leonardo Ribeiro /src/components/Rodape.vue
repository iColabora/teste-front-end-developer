<template>
<footer id="rodape">
  <span class="copyright">&copy; {{ year }} iColabora</span>
</footer>
</template>

<script>
export default {
  name: 'Rodape',
  data () {
    return {
      year: ''
    }
  },
  mounted () {
    this.year = new Date().getFullYear()
  }
}
</script>

<style>
  footer {
    background-color: #565351;
    padding: 5px;
  }
  .copyright {
    color: #999999;
    font-size: 13px;
    font-weight: 500;
    margin-left: 10px;
  }
</style>
