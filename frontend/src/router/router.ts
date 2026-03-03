import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import CreateTournament from "@/component/tournament/create-tournament/CreateTournament.vue"
import Tournaments from "@/component/tournament/Tournaments.vue"
import ShowTournament from "@/component/tournament/show-tournament/ShowTournament.vue"
import Login from "@/component/login/Login.vue"

const routes: RouteRecordRaw[] = [
      {
            path: "/tournaments",
            component: Tournaments,
      },
      {
            path: "/tournaments/:id",
            component: ShowTournament,
      },
      {
            path: "/tournaments/create",
            component: CreateTournament
      },
      {
            path: "/login",
            component: Login
      },
      {
            path: '/:pathMatch(.*)*',
            redirect: '/tournaments'
      }
]

export const router = createRouter({
      history: createWebHistory(),
      routes
})

router.beforeEach((to, from) => {
      const isAuthenticated = !!sessionStorage.getItem("basicAuth");

      if (to.path !== "/login" && !isAuthenticated) {
            return "/login";
      } else {
            return true;
      }
});