import { TournamentMapper } from "@/dto/mapper/tournament.mapper"
import { TournamentDto } from "@/dto/tournament.dto"
import { Tournament } from "@/model/tournament.model"
import { router } from "@/router"
import { inject, ref } from "vue"

export function createTournamentScript() {
      const tournamentMapper = inject('tournamentMapper') as TournamentMapper
      
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
                  console.log("on essai de creer ");
                  
                  
                  const response = await fetch("http://localhost:8081/api/tournaments", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(tournamentMapper.toTournamentDto(tournament.value))
                  })

                  
                  if (!response.ok) {
                        alert("Erreur lors de la création du tournoi")
                        throw new Error("Erreur API")
                  } else {
                        const tournamentDto = await response.json() as TournamentDto;
                        tournament.value = tournamentMapper.toTournament(tournamentDto);

                        router.push("/tournaments/" + tournament.value.id) 
                  }

                  reset()
            } catch (e: any) {
                  error.value = e.message
            } finally {
                  loading.value = false
            }
      }

      function goToTournaments() {
            router.push("/tournaments")
      }

      function reset() {
            tournament.value = {
                  name: "",
                  date: new Date(),
                  description: "",
            }
      }

      return {
            tournament,
            loading,
            error,
            createTournament,
            goToTournaments
      }
}