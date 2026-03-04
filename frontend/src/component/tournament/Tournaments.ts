import { TournamentRequest } from "@/request/tournament.request"
import { inject, onMounted, ref } from "vue"
import { useRouter } from "vue-router"

export function tournamentsScript() {
      const router = useRouter()
      const tournamentRequest = inject('tournamentRequest') as TournamentRequest
      const tournaments = ref([])
      const tabHeader = [
            { title: "Nom", key: "name" },
            { title: "Date", key: "date" },
            { title: "Description", key: "description" },
            { title: "details", key: "details" },
      ]


      async function fetchTournament() {
            tournaments.value = await tournamentRequest.getTournaments();
      }

      function goToCreateTournament() {
            router.push("/tournaments/create")
      }

      function formatDate(date: string) {
            return new Date(date).toLocaleDateString("fr-FR")
      }

      onMounted(fetchTournament);

      return {
            tabHeader,
            tournaments,
            goToCreateTournament,
            formatDate
      }
}