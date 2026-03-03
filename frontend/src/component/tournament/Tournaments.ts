import { TournamentMapper } from "@/dto/mapper/tournament.mapper"
import { TournamentDto } from "@/dto/tournament.dto"
import { inject, onMounted, ref } from "vue"
import { useRouter } from "vue-router"

export function tournamentsScript() {
      const router = useRouter()
      const tournamentMapper = inject('tournamentMapper') as TournamentMapper
      const tournaments = ref([])
      const tabHeader = [
            { title: "Nom", key: "name" },
            { title: "Date", key: "date" },
            { title: "Description", key: "description" },
            { title: "details", key: "details" },
      ]


      async function fetchTournament() {
            const response = await fetch("http://localhost:8081/api/tournaments", {
                  method: "GET",
                  headers: { 
                        "Content-Type": "application/json",
                        "Authorization" : "Basic " + sessionStorage.getItem("basicAuth") 
                  },
            })

            const tournamentsFetched = await response.json() as TournamentDto[]

            tournaments.value = tournamentsFetched.map(tournament => tournamentMapper.toTournament(tournament))
      }

      function goToCreateTournament() {
            router.push("/tournaments/create")
      }

      function formatDate(date: string) {
            return new Date(date).toLocaleDateString("fr-FR")
      }

      // onMonted permet charger les données au montage
      onMounted(fetchTournament);

      return {
            tabHeader,
            tournaments,
            goToCreateTournament,
            formatDate
      }
}