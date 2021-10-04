<template>
  <h3>Cadastrar Partida</h3>
  <div class="form">
    <label class="form-label">Time da Casa</label>
    <select id="time1" class="form-control" @change="onChange1($event)" v-model="partida.time_casa">
      <option v-for="(time, index) in times" :key="index">
        {{ time.nome }}
      </option>
    </select>
    <label class="form-label">Time Visitante</label>
    <select class="form-control" @change="onChange2($event)" v-model="partida.time_visitante" required>
      <option v-for="(time, index) in removeTimeRepetido" :key="index">
        {{ time.nome }}
      </option>
    </select>
    <br/>
  </div>
  <br/>

  <div>
  <h4>Placar</h4>
  <div class="placar">
    <span>{{ partida.gols_casa }}</span> x <span>{{ partida.gols_visitante }}</span>
  </div>
  <br/>

  <h4>Marcação de Gols</h4>
      <div class="form">
        <label class="form-label">Time</label>
          <select class="form-control" v-model="gol.time_gol" @change="onChange3($event)">
            <option v-for="(time, index) in lista_disputa" :key="index" :value="time.nome">
              {{ time.nome }}
            </option>
          </select>
        <label class="form-label">Jogador:</label>
          <select class="form-control" v-model="gol.jogador">
            <option v-for="(jogador, index) in jogadores_filtrados" :key="index">
              {{ jogador.nome }}
            </option>
          </select>
        </div>

  <div class="form-buttons">
    <span v-if="carregando">Carregando...</span>
    <button v-else @click="listarGol" type="button" class="btn btn-success">Marcar Gol</button>
    <div class="divider"/>
    <span v-if="carregando">Carregando...</span>
    <button v-else @click="salvarPartida" type="button" class="btn btn-warning">Finalizar Partida</button>
    <div class="divider"/>
    <router-link to="/partidas"><button type="button" class="btn btn-primary">Painel de Partidas</button></router-link>
  </div>
  <br/>


  <h4>Tabela de Gols</h4>

    <table class="table tabela-jogadores">
      <thead>
      <tr>
        <th>Time</th>
        <th>Jogador</th>
        <th>Ações</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(gol,index) in listaGols" :key="index">
        <td>{{ gol.time_gol }}</td>
        <td>{{ gol.jogador }}</td>
        <td>
          <span v-if="carregando">Carregando...</span>
          <button v-else @click="apagarGol(gol,index)" type="button" class="btn btn-danger botao-apagar">Apagar</button>
        </td>
      </tr>
      </tbody>
    </table>
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
        'gols_casa': 0,
        'gols_visitante': 0,
      }
}

let golNovo = (partida_id, max) => {
  let max_id = max || 0
  return{
        'id': max_id + 1,
        'time_gol': "",
        'jogador': "",
        'partida_id': partida_id,
      }
}
const URL_partidas = 'http://localhost:3000/partidas';
const URL_gols = 'http://localhost:3000/gols';
const URL_times = 'http://localhost:3000/times';
const URL_jogadores = 'http://localhost:3000/jogadores';

export default {
  name: 'CadastrarPartida',
  components: {
    },
  data(){
    return{
      partida: partidaNova(),
      gol: golNovo(),
      partidas: [],
      gols: [],
      carregando: true,
      editando: false,
      times: [],
      jogadores: [],
      primeiroTime: '',
      segundoTime: '',
      time_selecionado: '',
      time_gol: '',
      jogador: '',
      listaGols: [],
    }
  },
  computed: {
    removeTimeRepetido(){
      let sem_repeticao = this.times.filter(t => t.nome !== this.primeiroTime)
      return sem_repeticao
    },
    lista_disputa(){
      let times_escolhidos = this.times.filter(t => t.nome === this.primeiroTime || t.nome === this.segundoTime)
      return times_escolhidos
    },
    jogadores_filtrados(){
          let info_time = this.times.filter(t => t.nome === this.time_selecionado)
          let jogador = this.jogadores.filter(j => j.time_id === (info_time[0]['id']).toString())
          return jogador
      }  
  },
  methods: {
    onChange1(e) {
      this.primeiroTime = e.target.value;
    },
    onChange2(e) {
      this.segundoTime = e.target.value;
    },
    onChange3(e) {
      this.time_selecionado = e.target.value;  
    },
    listarGol(){
      let novoGol = {
        time_gol: this.gol.time_gol,
        jogador: this.gol.jogador,
        partida_id: '',
      }
      this.listaGols.push(novoGol)  
      if(this.gol.time_gol === this.partida.time_casa){
        this.partida.gols_casa++
      } else {
        this.partida.gols_visitante++
      }
    },
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
          this.gol.time_gol = '';
          this.gol.jogador = '';
          this.listaGols = [];
          this.carregando = false;
      });

      this.listaGols.forEach((novoGol) => {

        if(Math.max(...this.partidas.map(p => p.id)) == -Infinity){
          novoGol.partida_id = '1'
        } 
        else {
          novoGol.partida_id = Math.max(...this.partidas.map(p => p.id + 1)).toString()
        }

        axios.post(URL_gols,{...novoGol})
        .then(() => {
          this.novoGol = golNovo();
          this.carregando = false;
      });
        
      });

      }
    },
    apagarGol(gol,index){
      this.carregando = true;
      if(gol.time_gol === this.partida.time_casa){
        this.partida.gols_casa--
      } else {
          this.partida.gols_visitante--
      }
      this.listaGols.splice(index, 1)
      this.carregando = false;
    },
  },
  mounted() {
    this.carregando = true
    axios.get(URL_gols).then(() => {
      this.carregando = false
      this.gol = golNovo(Math.max(...this.gols.map(g => g.id)))
    })
    axios.get(URL_times).then(({data}) => {
      this.times = data
      this.carregando = false
      this.time = timeNovo(Math.max(...this.times.map(t => t.id)))
    })
    axios.get(URL_jogadores).then(({data}) => {
      this.jogadores = data
      this.jogador = jogadorNovo(this.$route.params.time_id, Math.max(...this.jogadores.map(j => j.id)));
      this.carregando = false
    })
    axios.get(URL_partidas).then(({data}) => {
      this.partidas = data
      this.partida = partidaNova(Math.max(...this.partidas.map(p => p.id)));
      this.carregando = false
    })

  }
  
}
</script>

<style>

</style>