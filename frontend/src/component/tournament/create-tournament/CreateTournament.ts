import { Tournament } from "@/model/tournament.model"
import { TournamentRequest } from "@/request/tournament.request"
import { router } from "@/router/router"
import { inject, ref } from "vue"

export function createTournamentScript() {
      const tournamentRequest = inject('tournamentRequest') as TournamentRequest

      const tournament = ref<Tournament>({
            name: "",
            date: new Date(),
            description: "",
      })

      const loading = ref(false)
      const error = ref<string | null>(null)

      async function createTournament() {
            loading.value = true
            error.value = null

            try { 
                  tournament.value = await tournamentRequest.createTournament(tournament.value);;
                  router.push("/tournaments/" + tournament.value.id) 
            } catch (e: any) {
                  error.value = e.message
            } finally {
                  loading.value = false
            }
      }

      function goToTournaments() {
            router.push("/tournaments")
      }

      return {
            tournament,
            loading,
            error,
            createTournament,
            goToTournaments
      }
}