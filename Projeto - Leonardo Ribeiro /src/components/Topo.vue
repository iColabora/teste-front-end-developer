<template>
  <header class="header">
    <a v-on:click.prevent=""><img class="logo" src="../assets/logo.png" alt="IColabora"></a>
    <div class="itens-menu">
      <ul>
        <li><router-link to="/"><a>DASHBOARD</a></router-link></li>
        <li><a v-on:click.prevent="">SOLUÇÕES</a></li>
        <li><a v-on:click.prevent="">ADMINISTRAÇÃO</a></li>
      </ul>
    </div>
    <router-link to="Task">
      <div class="processo">
        <div>
          <i class="fa fa-play" aria-hidden="true"></i>
          <span>INICIAR PROCESSO</span>
        </div>
      </div>
    </router-link>
    <div class="right-menu">
      <ul>
        <li><a v-on:click.prevent=""><i class="fa fa-search" aria-hidden="true"></i></a></li>
        <li><a v-on:click.prevent=""><i class="fa fa-wheelchair" aria-hidden="true"></i></a></li>
        <li class="profile"><img src="../assets/mike-dias.png" alt="profile" width="40px"> <i style="color: #818181; font-size: 80%;" class="fa fa-arrow-down" aria-hidden="true"></i></li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Topo'
}
</script>

<style scoped>
  .header {
    background-color: #102938;
    height: 60px;
  }
  .logo {
    margin: 10px;
    float: left;
    height: 40px;
    padding-left: 15px;
  }
  .itens-menu {
    float: left;
    margin-left: 2%;
    margin-top: 15px;
  }
  .itens-menu ul {
    list-style: none;
  }
  .itens-menu ul li {
    display: inline;
    margin: 10px;
    font-family: "Helvetica Neue", sans-serif;
    font-weight: bold;
    font-size: 13px;
    cursor: pointer;
  }
  .itens-menu ul li a {
    text-decoration: none;
    color: #ffffff;
  }
  .itens-menu ul li a:hover {
    color: #39bb9d;
  }
  .itens-menu ul li a:active {
    color: #39bb9d;
  }
  .processo {
    background-color: #29a48a;
    height: 60px;
    width: 200px;
    float: left;
    left: 50%;
    margin-left: -100px;
    position: absolute;
    cursor: pointer;
  }
  .processo div {
    margin: 9% 8%;
    color: #fff;
    font-family: "Helvetica Neue", sans-serif;
    font-size: 15px;
    font-weight: bold;
  }
  .processo div span {
    margin: 5px;
  }
  .right-menu {
    float: right;
    height: 60px;
  }
  .right-menu ul {
    margin-top: 10px;
    list-style: none;
  }
  .right-menu ul li {
    display: inline;
    margin-left: 30px;
  }
  .right-menu ul li a {
    color: #4a5c68;
    font-size: 25px;
    padding-top: 10%;
    cursor: pointer;
  }
  .right-menu ul li a:hover {
    color: #fff;
  }
  .profile {
    margin-right: 10px;
  }
</style>
