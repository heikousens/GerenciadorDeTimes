import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Times from "../views/Times.vue";
import CadastraTime from "../views/CadastraTime.vue";
import GerenciarTimes from "../views/GerenciarTimes.vue";
import Jogadores from "../views/Jogadores.vue";

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
    path: "/times/gerenciartimes/:time_id",
    name: "Jogadores",
    component: Jogadores,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;