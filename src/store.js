import {createStore} from 'vuex'
import axios from 'axios'

const store = createStore({
  state() { 
    return {
      times: [],
      gols_casa: 0,
      gols_visitante: 0,
      time1: 0,
      time2: 0,
    }
  },
  getters: {
    total_casa: state => state.gols_casa,
    total_visitante: state => state.gols_visitante
  },
  mutations: {
    time_carregado(state, times){
      state.times = times
    },
    conta_gols(state,time1,time2){
      state.time1 = time1 + 1
      state.time2 = time2
    },
    conta_gols_casa (state) {
      state.gols_casa++
    },
    conta_gols_visitante (state) {
      state.gols_visitante++
    },
    desconta_gols_casa(state) {
      state.gols_casa--;
    },
    desconta_gols_visitante(state) {
      state.gols_visitante--;
    },
  },
  actions: {
    carregar({commit}) {
      axios.get('http://localhost:3000/times').then(({data}) => {
        commit('time_carregado', data)
      })
    },
    conta_gols ({commit}) {
      axios.get('http://localhost:3000/gols').then(({data}) => {
        commit('conta_gols', data)
      })
    },
    conta_gols_casa ({commit}) {
      axios.get('http://localhost:3000/gols').then(({data}) => {
        commit('conta_gols_casa', data)
      })
    },
    conta_gols_visitante ({commit}) {
      axios.get('http://localhost:3000/gols').then(({data}) => {
        commit('conta_gols_visitante', data)
      })
    },
    desconta_gols_casa ({commit}) {
      axios.get('http://localhost:3000/gols').then(({data}) => {
        commit('desconta_gols_casa', data)
      })
    },
    desconta_gols_visitante ({commit}) {
      axios.get('http://localhost:3000/gols').then(({data}) => {
        commit('desconta_gols_visitante', data)
      })
    },
  }
})

export default store