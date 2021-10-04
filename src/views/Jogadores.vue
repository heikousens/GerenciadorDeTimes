<template>
    <h3>Lista de Jogadores</h3>

    <div v-if = "(this.jogadores.filter(j => j.time_id === this.$route.params.time_id)).length === 0">
      <br/>
        <h4>Nenhum jogador cadastrado :(</h4>
        <br/>

        <button type="button" class="btn btn-primary botao-cadastro" @click="exibeForm = !exibeForm">Cadastrar Jogador</button>

        <div class="form" v-show="exibeForm">
            
            <Campo nome="Nome" v-model="jogador.nome"></Campo>
            <Campo tipo="number" nome="Camisa" v-model="jogador.camisa"></Campo>
            <Campo tipo="number" nome="Salário" v-model="jogador.salario"></Campo>
            <CampoDropdown nome="Posição" v-model="jogador.posicao" :itens="posicoes"></CampoDropdown>

            <div class="form-buttons">
                <span v-if="carregando">Carregando...</span>
                <button v-else @click="salvar" type="button" class="btn btn-primary">Salvar</button>
                <div class="divider"/>
                <button @click="exibeForm = !exibeForm" type="button" class="btn btn-danger">Cancelar</button>
            </div>

        </div>
    </div>

    <div v-else>
    <table class="table tabela-jogadores">
        <thead>
            <tr>
                <th>Nome</th>
                <th>Camisa</th>
                <th>Salário</th>
                <th>Gols</th>
                <th>Posição</th>
                <th>Ações</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(jogador,index) in time_filtrado" :key="index">
                <td>{{ jogador.nome }}</td>
                <td>{{ jogador.camisa }}</td>
                <td>{{ jogador.salario }}</td>
                <td>{{ jogador.qtd_gols }}</td>
                <td>{{ jogador.posicao }}</td>
                <td>
                    <button @click="editar(jogador)" type="button" class="btn btn-success botao-editar">Editar</button>
                </td>
                <td>
                    <span v-if="carregando">Carregando...</span>
                    <button v-else @click="apagar(jogador)" type="button" class="btn btn-danger botao-apagar">Apagar</button>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="form-buttons">
    <button type="button" class="btn btn-primary" @click="exibeForm = !exibeForm">Cadastrar Novo Jogador</button>
    <div class="divider"/>
    <router-link to="/times/gerenciartimes"><button type="button" class="btn btn-primary">Voltar à Lista de Times</button></router-link>
    </div>
    <div class="form" v-show="exibeForm">
            
        <Campo nome="Nome" v-model="jogador.nome"></Campo>
        <Campo tipo="number" nome="Camisa" v-model="jogador.camisa"></Campo>
        <Campo tipo="number" nome="Salário" v-model="jogador.salario"></Campo>
        <CampoDropdown nome="Posição" v-model="jogador.posicao" :itens="posicoes"></CampoDropdown>

        <div class="form-buttons">
            <span v-if="carregando">Carregando...</span>
            <button v-else @click="salvar" type="button" class="btn btn-primary">Salvar</button>
            <div class="divider"/>
            <button @click="exibeForm = !exibeForm" type="button" class="btn btn-danger">Cancelar</button>
        </div>

    </div>

  </div>

  <div v-if="editando" class="form">

    <Campo nome="nome" v-model="jogador.nome"></Campo>
    <Campo tipo="number" nome="camisa" v-model="jogador.camisa"></Campo>
    <Campo tipo="number" nome="salario" v-model="jogador.salario"></Campo>
    <Campo tipo="number" nome="Quantidade de Gols" v-model="jogador.qtd_gols"></Campo>
    <CampoDropdown nome="posicao" v-model="jogador.posicao" :itens="posicoes"></CampoDropdown>

    <div class="form-buttons">
    <span v-if="carregando">Carregando...</span>
    <button v-else @click="salvar" type="button" class="btn btn-success">Salvar</button>
    <div class="divider"/>
    <button @click='editando = !editando' type="button" class="btn btn-danger">Cancelar</button>
    </div>

</div>

</template>

<script>
import axios from "axios";
import Campo from '../components/Campo.vue';
import CampoDropdown from '../components/CampoDropdown.vue';

let jogadorNovo = (time_id,max) => {
  let max_id = max || 0
  return{
        'id': max_id + 1,
        'nome': "",
        'camisa': "",
        'salario': "",
        'qtd_gols': 0,
        'posicao': "",
        'time_id': time_id,
      }
}

const URL = 'http://localhost:3000/jogadores';

export default {
  name: 'Jogadores',
  components: {
    CampoDropdown,
    Campo
    },
  data(){
    return{
      jogador: jogadorNovo(),
      jogadores: [],
      carregando: true,
      editando: false,
      exibeForm: false,
      posicoes: [
          'Goleiro',
          'Lateral esquerda',
          'Lateral direita',
          'Zagueiro',
          'Meio-campista',
          'Atacante'
      ]
    }
  },
  computed: {
      time_filtrado(){
          return this.jogadores.filter(j => j.time_id === this.$route.params.time_id)
      }
  },
  methods: {
    salvar(){
      this.carregando = true;
      if(this.editando){
        axios.put(`${URL}/${this.jogador.id}`, 
        { ...this.jogador })
          .then(() => {
            Object.assign(this.editando, this.jogador)
            this.jogador = jogadorNovo()
            this.carregando = false
            this.editando = false
        })

      } else {
        axios.post(URL, 
        {...this.jogador})
          .then(() => {
          this.jogadores.push(this.jogador)
          this.jogador = jogadorNovo(this.$route.params.time_id, Math.max(...this.jogadores.map(j => j.id)));
          this.carregando = false;
          this.exibeForm = false;
      })
      }
    },
    apagar(jogador){
      this.carregando = true;
      axios.delete(`${URL}/${jogador.id}`)
      .then(()=>{
        let filtro = this.jogadores.filter(j => j.time_id === this.$route.params.time_id)
        let sai = filtro[0]
        let index = this.jogadores.indexOf(sai)
        this.jogadores.splice(index, 1)
        this.carregando = false;
      })
    },
    editar(jogador) {
      this.editando = jogador
      this.jogador = { ...jogador }
    }
  },
  mounted() {
    this.carregando = true
    axios.get(URL).then(({data}) => {
        this.jogadores = data
        this.jogador = jogadorNovo(this.$route.params.time_id, Math.max(...this.jogadores.map(j => j.id)));
        this.carregando = false
    })
  }
}
</script>

<style>

</style>