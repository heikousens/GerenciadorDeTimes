<template>
    <h3>Gerenciar Times</h3>

    <div>
    <table class="table tabela-gerenciar">
      <thead>
      <tr>
        <th>Nome</th>
        <th>Fundação</th>
        <th>Estado</th>
        <th>Cidade</th>
        <th>Gols</th>
        <th>Técnico</th>
        <th>Detalhes</th>
        <th></th>
        <th>Ações</th>
        <th></th>
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
        <td>
          <button @click="editar(time)" type="button" class="btn btn-success botao-editar">Editar</button>
        </td>
        <td>
          <span v-if="carregando">Carregando...</span>
          <button v-else @click="apagar(time, index)" type="button" class="btn btn-danger botao-apagar">Apagar</button>
        </td>
        <td>
          <router-link :to="{name: 'Jogadores', params: {time_id:time.id}}"><button type="button" class="btn btn-info botao-jogadores">Jogadores</button></router-link>
        </td>
      </tr>
      </tbody>
    </table>
    <br/>
    <router-link to="/times"><button type="button" class="btn btn-primary botao-cadastro">Painel de Times</button></router-link>
  </div>

  <div v-if="editando" class="form">

    <Campo nome="Nome" v-model="time.nome"></Campo>
    <Campo tipo="number" nome="Ano de Fundação" v-model="time.ano_fundacao"></Campo>
    <CampoDropdown nome="Estado" v-model="time.estado" :itens="estados"></CampoDropdown>
    <Campo nome="Cidade" v-model="time.cidade"></Campo>
    <Campo tipo="number" nome="Quantidade de Gols" v-model="time.qtd_gols"></Campo>
    <Campo nome="Técnico" v-model="time.tecnico"></Campo>
    <CampoText tipo="texto" nome="Detalhes" v-model="time.info"></CampoText>

    <div class="form-buttons">
      <span v-if="carregando">Carregando...</span>
      <button v-else @click="salvar" class="btn btn-success">Salvar</button>
      <div class="divider"/>
      <button @click='editando = !editando' class="btn btn-danger">Cancelar</button>
    </div>

</div>

</template>

<script>
import axios from "axios";
import Campo from '../components/Campo.vue';
import CampoDropdown from '../components/CampoDropdown.vue';
import CampoText from '../components/CampoText.vue';

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
  name: 'GerenciarTimes',
  components: {
    CampoDropdown,
    CampoText,
    Campo
    },
  data(){
    return{
      time: timeNovo(),
      times: [],
      carregando: true,
      editando: false,
      estados: [
        'AC', 'AL',  'AP', 'AM',
        'BA', 'CE', 'DF', 'ES', 'GO',
        'MA',  'MT', 'MS', 'MG',
        'PA', 'PB',  'PR', 'PE', 'PI',
        'RJ', 'RN', 'RS', 'RO', 'RR',
        'SC', 'SE',  'SP',
        'TO'
      ],
    }
  },
  methods: {
    salvar(){
      this.carregando = true;
      if(this.editando){
        axios.put(`${URL}/${this.time.id}`, 
        { ...this.time })
          .then(() => {
            Object.assign(this.editando, this.time)
            this.time = timeNovo(Math.max(...this.times.map(t => t.id)))
            this.carregando = false
            this.editando = false
        })

      } else {
        axios.post(URL, 
        { ...this.time })
          .then(() => {
          this.times.push(this.time)
          this.time = timeNovo(Math.max(...this.times.map(t => t.id)));
          this.carregando = false;
      })
      }
    },
    apagar(time,index){
      this.carregando = true;
      axios.delete(`${URL}/${time.id}/`)
      .then(()=>{
        this.times.splice(index, 1)
        this.carregando = false;
      })
    },
    editar(time) {
      this.editando = time
      this.time = { ...time }
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

</style>