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
        <th scope="col">Nome</th>
        <th scope="col">Fundação</th>
        <th scope="col">Estado</th>
        <th scope="col">Cidade</th>
        <th scope="col">Técnico</th>
        <th scope="col">Detalhes</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(time,index) in times" :key="index">
        <td>{{ time.nome }}</td>
        <td>{{ time.ano_fundacao }}</td>
        <td>{{ time.estado }}</td>
        <td>{{ time.cidade }}</td>
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

let timeNovo = () => {
  return{
        'id': "INCREMENT",
        nome: "",
        ano_fundacao: "",
        estado: "",
        cidade: "",
        tecnico: "",
        info: "",
      }
}

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
    axios.get('https://sheetdb.io/api/v1/2bcn7bgyeiivy').then(({data}) => {
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