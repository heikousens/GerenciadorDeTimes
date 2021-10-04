import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Times from "../views/Times.vue";
import CadastraTime from "../views/CadastraTime.vue";
import GerenciarTimes from "../views/GerenciarTimes.vue";
import Jogadores from "../views/Jogadores.vue";
import Partidas from "../views/Partidas.vue";
import CadastrarPartida from "../views/CadastrarPartida.vue";
import Gols from "../views/Gols.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/times",
    name: "Times",
    component: Times,
  },
  {
    path: "/times/cadastratime",
    name: "CadastraTime",
    component: CadastraTime,
  },
  {
    path: "/times/gerenciartimes",
    name: "GerenciarTimes",
    component: GerenciarTimes,
  },
  {
    path: "/jogadores/:time_id",
    name: "Jogadores",
    component: Jogadores,
  },
  {
    path: "/partidas",
    name: "Partidas",
    component: Partidas,
  },
  {
    path: "/partidas/cadastrarpartida",
    name: "CadastrarPartida",
    component: CadastrarPartida,
  },
  {
    path: "/partidas/:partida_id",
    name: "Gols",
    component: Gols,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;