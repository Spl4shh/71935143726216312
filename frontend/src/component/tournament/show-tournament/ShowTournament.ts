import { Team } from "@/model/team.model";
import { Tournament } from "@/model/tournament.model";
import { MatchRequest } from "@/request/match.request";
import { TournamentRequest } from "@/request/tournament.request";
import { router } from "@/router/router"
import { inject, onMounted, ref } from "vue";

export function showTournamentScript() {
      const tournamentId = Number(router.currentRoute.value.params.id)
      const tournament = ref<Tournament>();
      const newTeam = ref<Team>({ name: "" });
      const teamsRanking = ref<{ team: Team, points: number }[]>([]);
      const tournamentRequest = inject("tournamentRequest") as TournamentRequest;
      const matchRequest = inject("matchRequest") as MatchRequest

      function goToTournaments() {
            router.push("/tournaments")
      }

      async function fetchTournament() {
            tournament.value = await tournamentRequest.getTournament(tournamentId);
      }

      async function generateMatches() {
            let responseOk = await tournamentRequest.generateMatches(tournament.value)

            if (responseOk) {
                  await fetchTournament();
                  fetchTeamsRanking();
            }
      }

      async function fetchTeamsRanking() {
            teamsRanking.value = await tournamentRequest.getRanking(tournament.value)
      }

      async function updateMatches() {
            for (const match of tournament.value.matches) {
                  if (match.scoreA !== null && match.scoreB !== null) {
                        await matchRequest.updateMatch(match)
                  }
            }

            fetchTeamsRanking();
      }

      async function addTeam() {
            let responseOk = await tournamentRequest.addTeam(tournament.value, newTeam.value);

            if (responseOk) {
                  newTeam.value.name = "";
                  await fetchTournament();
                  fetchTeamsRanking();
            }
      }

      onMounted(async () => {
            await fetchTournament();
            await fetchTeamsRanking();
      })

      return {
            newTeam,
            teamsRanking,
            tournament,
            addTeam,
            goToTournaments,
            generateMatches,
            updateMatches,
      }
}
