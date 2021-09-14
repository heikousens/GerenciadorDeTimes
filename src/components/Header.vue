<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">TP03 - Vue.js</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link" aria-current="page">Home</router-link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Times
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <router-link to="/times" class="dropdown-item">Lista de Times</router-link>
            <router-link to="/times/cadastratime" class="dropdown-item">Cadastrar Time</router-link>
            <router-link to="/times/gerenciartimes" class="dropdown-item">Gerenciar Times</router-link>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>

</template>

<script>

export default {
  name: 'Header',
  components: {
    },
}
</script>

<style>

</style>