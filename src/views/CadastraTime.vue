<template>
    <h3>Cadastrar Novo Time</h3>

  <div class="form">

    <Campo nome="Nome" v-model="time.nome"></Campo>
    <Campo tipo="number" nome="Ano de Fundação" v-model="time.ano_fundacao"></Campo>
    <CampoDropdown nome="Estado" v-model="time.estado" :itens="estados"></CampoDropdown>
    <Campo nome="Cidade" v-model="time.cidade"></Campo>
    <Campo nome="Técnico" v-model="time.tecnico"></Campo>
    <CampoText tipo="texto" nome="Informações" v-model="time.info"></CampoText>
    <br/>
    <p v-if="timeCriado">Time cadastrado com sucesso!</p>

    <div class="form-buttons">
        <span v-if="carregando">Carregando...</span>
        <button v-else @click="salvar" type="button" class="btn btn-primary">Cadastrar Time</button>
        <div class="divider"/>
        <router-link to="/times"><button type="button" class="btn btn-primary">Lista de Times</button></router-link>
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
        'tecnico': "",
        'info': "",
      }
}

const URL = 'http://localhost:3000/times';

export default {
  name: 'CadastraTimes',
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
      timeCriado: false,
      estados: [
        'AC', 'AL',  'AP', 'AM',
        'BA', 'CE', 'DF', 'ES', 'GO',
        'MA',  'MT', 'MS', 'MG',
        'PA', 'PB',  'PR', 'PE', 'PI',
        'RJ', 'RN', 'RS', 'RO', 'RR',
        'SC', 'SE',  'SP',
        'TO'
      ]
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
          this.timeCriado = true;
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
      this.time = timeNovo(Math.max(...this.times.map(t => t.id)))
    })
  }
}
</script>