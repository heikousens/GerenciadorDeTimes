<template>
  <h3>Partidas</h3>
    <div v-if = "partidas.length === 0">
        <br/>
        <h4>Nenhuma partida cadastrada :(</h4>
        <br/>
        <router-link to="/partidas/cadastrarpartida"><button type="button" class="btn btn-primary botao-cadastro">Cadastrar Partida</button></router-link>
    </div>
    <div v-else>
    <table class="table tabela-jogadores">
    <thead>
      <tr>
        <th scope="col">Time da Casa</th>
        <th scope="col">Gols da Casa</th>
        <th scope="col"></th>
        <th scope="col">Gols do Visitante</th>
        <th scope="col">Time Visitante</th>
        <th scope="col"></th>
        <th scope="col">Ações</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(partida,index) in partidas" :key="index">
        <td>{{ partida.time_casa }}</td>
        <td>{{ partida.gols_casa }}</td>
        <td></td>
        <td>{{ partida.gols_visitante }}</td>
        <td>{{ partida.time_visitante }}</td>
        <td>
          <span v-if="carregando">Carregando...</span>
          <button v-else @click="apagarPartida(partida, index)" type="button" class="btn btn-danger botao-apagar">Apagar</button>
        </td>
        <td>
          <router-link :to="{name: 'Gols', params: {partida_id:partida.id}}">
            <button type="button" class="btn btn-info botao-jogadores">Ver Gols</button>
            </router-link>
        </td>
      </tr>
      </tbody>
    </table>

    <div v-if="editando" class="form">
        <label class="form-label">Time da Casa</label>
          <select class="form-control" v-model="partida.time_casa">
            <option v-for="(time, index) in times" :key="index">
              {{ time.nome }}
            </option>
          </select>
          <Campo nome="Gols do Time da Casa" v-model="partida.gols_casa"></Campo>
        <label class="form-label">Time Visitante</label>
          <select class="form-control" v-model="partida.time_visitante">
            <option v-for="(time, index) in times" :key="index">
              {{ time.nome }}
            </option>
          </select>
          <Campo nome="Gols do Time Visitante" v-model="partida.gols_visitante"></Campo>


      <div class="form-buttons">
        <span v-if="carregando">Carregando...</span>
          <button v-else @click="salvarPartida" type="button" class="btn btn-success">Salvar</button>
            <div class="divider"/>
          <button @click='editando = !editando' type="button" class="btn btn-danger">Cancelar</button>
      </div>

</div>
  <div v-if="!editando">
    <router-link to="/partidas/cadastrarpartida"><button type="button" class="btn btn-primary botao-cadastro">Cadastrar Nova Partida</button></router-link>
  </div>
  </div>

</template>

<script>
import axios from "axios";
import Campo from '../components/Campo.vue';

let timeNovo = (max) => {
  let max_id = max || 0
  return{
        'id': max_id + 1,
        'nome': "",
        'ano_fundacao': "",
        'estado': "",
        'cidade': "",
        'tecnico': "",
        'info': "",
      }
}

let jogadorNovo = (time_id,max) => {
  let max_id = max || 0
  return{
        'id': max_id + 1,
        'nome': "",
        'camisa': "",
        'salario': "",
        'posicao': "",
        'time_id': time_id,
      }
}

let partidaNova = (max) => {
  let max_id = max || 0
  return{
        'id': max_id + 1,
        'time_casa': "",
        'time_visitante': "",
        'gols_casa': "",
        'gols_visitante': "",
      }
}

const URL_partidas = 'http://localhost:3000/partidas';
const URL_times = 'http://localhost:3000/times';
const URL_jogadores = 'http://localhost:3000/jogadores';

export default {
  name: 'Partidas',
  components: {
    Campo
  },
  data(){
    return{
      partida: partidaNova(),
      partidas: [],
      carregando: true,
      editando: false,
      exibeForm: false,
      times: [],
      jogadores: [],
      time: '',
      jogador: '',
    }
  },
    methods: {
      salvarPartida(){
        this.carregando = true;
        if(this.editando){
          axios.put(`${URL_partidas}/${this.partida.id}`, 
          { ...this.partida })
          .then(() => {
            Object.assign(this.editando, this.partida)
            this.partida = partidaNova()
            this.carregando = false
            this.editando = false
          })

        } else {
          axios.post(URL_partidas, 
          {...this.partida})
          .then(() => {
          this.partidas.push(this.partida)
          this.partida = partidaNova(Math.max(...this.partidas.map(p => p.id)));
          this.carregando = false;
        })
      }
    },
    apagarPartida(partida,index){
      this.carregando = true;
      axios.delete(`${URL_partidas}/${partida.id}/`)
      .then(()=>{
        this.partidas.splice(index, 1)
        this.carregando = false;
      })
    },
    editarPartida(partida) {
      this.editando = partida
      this.partida = { ...partida }
    },
  },
  mounted() {
    this.carregando = true
    axios.get(URL_partidas).then(({data}) => {
      this.partidas = data
      this.carregando = false
    })
    axios.get(URL_times).then(({data}) => {
      this.times = data
      this.carregando = false
      this.time = timeNovo()
    })
    axios.get(URL_jogadores).then(({data}) => {
      this.jogadores = data
      this.jogador = jogadorNovo(this.$route.params.time_id, Math.max(...this.jogadores.map(j => j.id)));
      this.carregando = false
    })
  }
  
}
</script>

<style>

</style>