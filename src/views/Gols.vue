<template>
    <h3>Lista de Gols</h3>

    <div>
    <table class="table tabela-jogadores">
        <thead>
            <tr>
                <th>Jogador</th>
                <th>Time</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="gol in gols_filtrados" :key="gol.id">
                <td>{{ gol.jogador }}</td>
                <td>{{ gol.time_gol }}</td>
            </tr>
        </tbody>
    </table>
    <div class="form-buttons">
    <router-link to="/partidas"><button type="button" class="btn btn-primary">Voltar à Lista de Partidas</button></router-link>
    </div>

  </div>

</template>

<script>
import axios from "axios";

let golNovo = (partida_id, max) => {
  let max_id = max || 0
  return{
        'id': max_id + 1,
        'time_gol': "",
        'jogador': "",
        'partida_id': partida_id,
      }
}

const URL = 'http://localhost:3000/gols';

export default {
  name: 'Gols',
  components: {
    },
  data(){
    return{
      gol: golNovo(),
      gols: [],
      carregando: true,
    }
  },
  computed: {
      gols_filtrados(){
          return this.gols.filter(g => g.partida_id === this.$route.params.partida_id)
      }
  },
  methods: {
  },
  mounted() {
    this.carregando = true
    axios.get(URL).then(({data}) => {
        this.gols = data
        this.gol = golNovo();
        this.carregando = false
    })
  }
}
</script>

<style>

</style>