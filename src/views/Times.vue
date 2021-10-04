<template>
    <h3>Times</h3>
    <div v-if = "times.length === 0">
        <br/>
        <h4>Nenhum time cadastrado :(</h4>
        <br/>
        <router-link to="/times/cadastratime"><button type="button" class="btn btn-primary botao-cadastro">Cadastrar Time</button></router-link>
    </div>
    <div v-else>
    <table class="table tabela-times">
    <thead>
      <tr>
        <th>Nome</th>
        <th>Fundação</th>
        <th>Estado</th>
        <th>Cidade</th>
        <th>Gols</th>
        <th>Técnico</th>
        <th>Detalhes</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(time,index) in times" :key="index">
        <td>{{ time.nome }}</td>
        <td>{{ time.ano_fundacao }}</td>
        <td>{{ time.estado }}</td>
        <td>{{ time.cidade }}</td>
        <td>{{ time.qtd_gols }}</td>
        <td>{{ time.tecnico }}</td>
        <td>{{ time.info }}</td>
      </tr>
      </tbody>
    </table>
  </div>
  <div v-if = "times.length !== 0" class="col-md-3 buttons">
  <router-link to="/times/cadastratime"><button type="button" class="btn btn-primary">Cadastrar Time</button></router-link>
      <div class="divider"/>
      <router-link to="/times/gerenciartimes"><button type="button" class="btn btn-primary">Gerenciar Times</button></router-link>
  </div>

</template>

<script>
import axios from "axios";

let timeNovo = (max) => {
  let max_id = max || 0
  return{
        'id': max_id + 1,
        'nome': "",
        'ano_fundacao': "",
        'estado': "",
        'cidade': "",
        'qtd_gols': 0,
        'tecnico': "",
        'info': "",
      }
}

const URL = 'http://localhost:3000/times';

export default {
  name: 'Times',
  components: {},
  data(){
    return{
      time: timeNovo(),
      times: [],
      carregando: true,
      editando: false,
      estados: [
        'RJ',
        'SP',
        'MG'
      ]
    }
  },
  mounted() {
    this.carregando = true
    axios.get(URL).then(({data}) => {
      this.times = data
      this.carregando = false
    })
  }
  
}
</script>

<style>

.buttons{
    margin: auto;
}

</style>